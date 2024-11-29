import {fromResource, Resource, useQueryListParams, useRepository} from "@apibrew/react";
import {useEffect, useState} from "react";
import {Box, Popover, Stack, TablePagination} from "@mui/material";
import Button from "@mui/material/Button";
import {Domain, FilterList, Refresh, Remove, Search, Sort} from "@mui/icons-material";
import {DataTableTable} from "./Table";
import {Filters} from "./Filters";
import toast from "react-hot-toast";
import {ResourceEntityInfo, Type} from "@apibrew/client/model/resource";
import {Sorting} from "./Sorting";
import {useAnalytics} from "../../../hooks/use-analytics";
import {useDrawer} from "../../../../hooks/use-drawer.tsx";
import {handleErrorMessage} from "../../../../util/errors.ts";
import {useConfirmation} from "../../../../components/modal/use-confirmation.tsx";
import {QuickSearch} from "./QuickSearch.tsx";
import {HelpButton} from "../../help/HelpButton.tsx";

export interface TableContainerProps {
    resource: Resource
    reloadResource?: () => void
}

const defaultListParams = {
    offset: 0,
    limit: 100
}

export function DataTable(props: TableContainerProps) {
    const [resource, setResource] = useState<Resource>(props.resource)
    const resourceRepository = useRepository<Resource>(ResourceEntityInfo)
    const repository = useRepository(fromResource(resource))
    const [refreshIndex, setRefreshIndex] = useState<number>(0)
    const [listParams, setListParams] = useQueryListParams(defaultListParams)
    const [filtersAnchor, setFiltersAnchor] = useState<HTMLElement>()
    const [sortingAnchor, setSortingAnchor] = useState<HTMLElement>()
    const [quickSearchAnchor, setQuickSearchAnchor] = useState<HTMLElement>()
    const confirmation = useConfirmation()
    const [updates, setUpdates] = useState<{ [key: string]: any }>({})

    const [records, setRecords] = useState<any[]>([])
    const [total, setTotal] = useState<number>()
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const drawer = useDrawer()
    const analytics = useAnalytics()

    function reloadResource() {
        props.reloadResource?.()
        setRefreshIndex(refreshIndex + 1)
    }

    const loading = total === undefined

    function refresh() {
        analytics.click('action', 'refresh')
        setRecords([])
        setTotal(undefined)
        setRefreshIndex(refreshIndex + 1)
    }

    function handleDelete() {
        analytics.click('action', 'delete')
        const deleteFn = async function (): Promise<unknown> {
            const tid = toast.loading('Deleting records')
            let deleted = 0
            try {
                for (const id of selectedItems) {
                    await repository.delete(id)
                    deleted++
                }
            } catch (e: any) {
                toast.error(e.message)
            } finally {
                toast.dismiss(tid)

                setSelectedItems([])
                refresh()

                if (deleted > 0) {
                    toast.success(`${deleted} records deleted`)
                }
            }

            return
        }
        confirmation.open({
            kind: 'confirm',
            message: 'Are you sure you want to delete these records?',
            buttonMessage: 'Delete',
            onConfirm: () => {
                deleteFn()
            }
        })
    }

    async function handleSave() {
        analytics.click('action', 'save')
        let isSuccess = true
        let sc = 0
        const loadingId = toast.loading('Saving records...')
        for (const id of Object.keys(updates)) {
            try {
                if (id === 'new') {
                    await repository.create({
                        ...updates[id],
                        id: undefined
                    })
                } else {
                    await repository.update({
                        ...updates[id],
                        id: id
                    })
                }
                sc++;
                delete (updates[id])
                setUpdates({...updates})
            } catch (e: any) {
                isSuccess = false
                console.log(e)
                toast.error(e.message)
            }
        }
        toast.dismiss(loadingId)

        if (isSuccess) {
            toast.success('Records saved')
            setUpdates({})
            refresh()
        } else if (sc > 0) {
            toast.error('Records partially saved')
        }
    }

    useEffect(() => {
        if (Object.keys(updates).length > 0) {
            toast.error('Please save the new record first')
            return
        }
        setRecords([])
        setTotal(undefined)

        const resolveReferences: string[] = []

        for (const property of Object.keys(resource.properties)) {
            if (resource.properties[property].type === Type.REFERENCE) {
                resolveReferences.push(`$.${property}`)
            }
        }

        repository.list({
            ...listParams,
            resolveReferences: resolveReferences
        })
            .then(resp => {
                setRecords(resp.content ?? [])
                setTotal(resp.total)
            }, err => {
                toast.error('Failed to load records: ' + err.message)
            })
    }, [listParams, refreshIndex]);

    useEffect(() => {
        if (records?.some(item => item.id === 'new') && updates['new'] === undefined) {
            setRecords(records.filter(item => item.id !== 'new'))
        }
    }, [updates, refreshIndex]);

    return <>
        {drawer.render()}
        {confirmation.render()}
        <Box className='action-bar' display='flex'>
            <Stack direction='row' width='100%'>
                <Button size='medium'
                        variant='outlined'
                        onClick={() => {
                            refresh()
                        }}>
                    <Refresh fontSize='small'/>
                    <span style={{marginLeft: '3px'}}>Refresh</span>
                </Button>
                <Button size='medium'
                        variant='outlined'
                        color={listParams.query?.or ? 'info' : 'secondary'}
                        onClick={(event) => {
                            setQuickSearchAnchor(event.currentTarget);
                            analytics.click('action', 'quick-search-open')
                        }}>
                    <Search fontSize='small'/>
                    <span style={{marginLeft: '3px'}}>Search</span>
                </Button>
                <HelpButton/>
                {!resource.immutable && selectedItems.length > 0 && <>
                    <Button color='error'
                            size='medium'
                            variant='outlined'
                            onClick={() => {
                                handleDelete()
                            }}>
                        <Remove fontSize='small'/>
                        <span style={{marginLeft: '3px'}}>Delete</span>
                    </Button>
                </>}
                {Object.keys(updates).length > 0 && <>
                    <Button
                        style={{
                            marginLeft: '40px'
                        }}
                        onClick={() => {
                            handleSave()
                        }}
                        color='success'
                        variant='outlined'
                        size='medium'>
                        <Domain fontSize='small'/>
                        <span style={{marginLeft: '3px'}}>Save</span>
                        <span style={{marginLeft: '3px'}}>({Object.keys(updates).length})</span>
                    </Button>
                    <Button color='warning'
                            size='medium'
                            variant='outlined'
                            onClick={() => {
                                setUpdates({})
                            }}>
                        <Remove fontSize='small'/>
                        <span style={{marginLeft: '3px'}}>Revert</span>
                    </Button>
                </>}
                {listParams.query?.or && <Button
                    style={{
                        marginLeft: '40px'
                    }}
                    color='warning'
                    size='medium'
                    variant='outlined'
                    onClick={() => {
                        setListParams({
                            ...listParams,
                            query: undefined
                        })
                        refresh()
                    }}>
                    <Remove fontSize='small'/>
                    <span style={{marginLeft: '3px'}}>Reset Search</span>
                </Button>}
                {listParams.query?.and && <Button
                    style={{
                        marginLeft: '40px'
                    }}
                    color='warning'
                    size='medium'
                    variant='outlined'
                    onClick={() => {
                        setListParams({
                            ...listParams,
                            query: undefined
                        })
                        refresh()
                    }}>
                    <Remove fontSize='small'/>
                    <span style={{marginLeft: '3px'}}>Reset Filters</span>
                </Button>}
                <Box flexGrow={1}/>
                <Button size='medium'
                        variant='outlined'
                        color={listParams.query?.and ? 'info' : 'secondary'}
                        onClick={(event) => {
                            setFiltersAnchor(event.currentTarget);
                            analytics.click('action', 'filters-open')
                        }}>
                    <FilterList fontSize='small'/>
                    <span style={{marginLeft: '3px'}}>Filter</span>
                </Button>
                <Button size='medium'
                        variant='outlined'
                        color={listParams.sorting?.length ? 'info' : 'secondary'}
                        onClick={(event) => {
                            setSortingAnchor(event.currentTarget);
                            analytics.click('action', 'sorting-open')
                        }}>
                    <Sort fontSize='small'/>
                    <span style={{marginLeft: '3px'}}>Sorting</span>
                </Button>
            </Stack>
        </Box>
        <Popover
            open={Boolean(quickSearchAnchor)}
            anchorEl={quickSearchAnchor}
            onClose={() => setQuickSearchAnchor(undefined)}
            anchorPosition={{
                top: 200,
                left: 200
            }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <QuickSearch
                resource={resource}
                query={listParams.query}
                onApply={query => {
                    setListParams({
                        ...listParams,
                        query: query
                    })
                    setQuickSearchAnchor(undefined)
                    refresh()
                }}/>
        </Popover>
        <Popover
            open={Boolean(filtersAnchor)}
            anchorEl={filtersAnchor}
            onClose={() => setFiltersAnchor(undefined)}
            anchorPosition={{
                top: 200,
                left: 200
            }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <Filters resource={resource}
                     query={listParams.query}
                     onApply={query => {
                         setListParams({
                             ...listParams,
                             query: query
                         })
                         setFiltersAnchor(undefined)
                         refresh()
                     }}/>
        </Popover>
        <Popover
            open={Boolean(sortingAnchor)}
            anchorEl={sortingAnchor}
            onClose={() => setSortingAnchor(undefined)}
            anchorPosition={{
                top: 200,
                left: 200
            }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <Sorting resource={resource}
                     sorts={listParams.sorting}
                     onApply={sorting => {
                         setListParams({
                             ...listParams,
                             sorting
                         })
                         setSortingAnchor(undefined)
                         refresh()
                     }}/>
        </Popover>

        <Box display='flex' flexDirection='row' flexGrow={1} className='data-table'
             style={{overflow: 'auto'}}>

            <DataTableTable
                offset={listParams.offset ?? 0}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                resource={resource}
                schema={resource}
                updateSchema={resource => {
                    toast.promise(resourceRepository.update(resource as Resource), {
                        loading: 'Updating resource...',
                        success: 'Resource updated',
                        error: err => handleErrorMessage(err)
                    }).then(() => {
                        setResource(resource as Resource)
                        refresh()
                    })
                }}
                reload={reloadResource}
                loading={loading}
                updates={updates}
                setUpdates={setUpdates}
                records={records}
            />
        </Box>

        <TablePagination component="div"
                         count={total || 0}
                         showFirstButton={true}
                         showLastButton={true}
                         rowsPerPageOptions={[10, 25, 50, 100, 1000]}
                         page={Math.ceil((listParams.offset || 0) / (listParams.limit || defaultListParams.limit))}
                         rowsPerPage={listParams.limit || defaultListParams.limit}
                         onRowsPerPageChange={(event) => {
                             const rowsPerPage = parseInt(event.target.value)

                             setListParams({
                                 ...listParams,
                                 limit: rowsPerPage
                             })
                             analytics.click('action', 'change-page', rowsPerPage)
                         }}
                         onPageChange={(_, page) => {
                             setListParams({
                                 ...listParams,
                                 offset: (page * listParams.limit!)
                             })
                             analytics.click('action', 'change-page', page)
                         }}/>
    </>
}
