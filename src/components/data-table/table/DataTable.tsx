import {fromResource, Resource, useQueryListParams, useRepository} from "@apibrew/react";
import React, {useEffect, useState} from "react";
import {Box, Popover, Stack, TablePagination} from "@mui/material";
import Button from "@mui/material/Button";
import {Add, Api, Code, Domain, FilterList, Refresh, Remove, Sort} from "@mui/icons-material";
import {DataTableTable} from "./Table";
import {Filters} from "./Filters";
import {useConfirmation} from "../../modal/use-confirmation";
import toast from "react-hot-toast";
import {useDrawer} from "../../../hooks/use-drawer";
import {ColumnDrawer} from "../column-drawer/ColumnDrawer";
import {ResourceEntityInfo, Type} from "@apibrew/client/model/resource";
import {Property} from "@apibrew/client/model";
import {Sorting} from "./Sorting";
import {useAnalytics} from "../../../hooks/use-analytics";
import {ResourceDrawer} from "../../resource-drawer/ResourceDrawer";
import {ResourceNanoDrawer} from "../../resource-nano-drawer/ResourceNanoDrawer";
import {ApiDocModal} from "../../api-doc/ApiDocModal";

export interface TableContainerProps {
    resource: Resource
    reloadResource?: () => void
}

const defaultListParams = {
    offset: 0,
    limit: 10
}

export function DataTable(props: TableContainerProps) {
    const [resource, setResource] = useState<Resource>(props.resource)
    const resourceRepository = useRepository(ResourceEntityInfo)
    const repository = useRepository(fromResource(resource))
    const [refreshIndex, setRefreshIndex] = useState<number>(0)
    const [listParams, setListParams] = useQueryListParams(defaultListParams)
    const [filtersAnchor, setFiltersAnchor] = useState<HTMLElement>()
    const [sortingAnchor, setSortingAnchor] = useState<HTMLElement>()
    const confirmation = useConfirmation()
    const [updates, setUpdates] = useState<{ [key: string]: any }>({})

    const [records, setRecords] = useState<any[]>([])
    const [total, setTotal] = useState<number>()
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const drawer = useDrawer()
    const analytics = useAnalytics()

    function reloadResource(resource: Resource) {
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
                toast.error('Failed to save record: ' + e.message)
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

    function handleAddColumnClick() {
        analytics.click('action', 'add-column-open')
        drawer.open(
            <ColumnDrawer new={true}
                          propertyName={'new'}
                          property={{
                              type: Type.STRING
                          } as Property}
                          onUpdateResource={reloadResource}
                          onClose={() => {
                              drawer.close()
                              refresh()
                          }}
                          resource={resource}/>
        )
    }

    function handleEditColumnClick(property: string) {
        analytics.click('action', 'edit-column-open')
        drawer.open(
            <ColumnDrawer new={false}
                          propertyName={property}
                          property={resource.properties[property]}
                          onUpdateResource={setResource}
                          onClose={() => {
                              drawer.close()
                              refresh()
                          }}
                          resource={resource}/>
        )
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

    const filterCount = listParams.query ? listParams.query.and ? listParams.query.and.length : 1 : 0
    const sortingCount = listParams.sorting ? listParams.sorting ? listParams.sorting.length : 1 : 0

    const commonButtons = (
        <Stack direction='row' spacing={1}>
            <Button color='secondary'
                    size='small'
                    onClick={() => {
                        drawer.open(<ResourceDrawer
                            new={false}
                            onClose={() => {
                                drawer.close()
                            }}
                            resource={props.resource}/>)

                        analytics.click('update-resource')
                    }}>
                <Api fontSize='small'/>
                <span style={{marginLeft: '3px'}}>Update Resource</span>
            </Button>
            <Button color='secondary'
                    size='small'
                    onClick={() => {
                        drawer.open(
                            <ResourceNanoDrawer
                                namespace={props.resource.namespace.name}
                                resource={props.resource.name}
                                onClose={drawer.close}/>
                        )

                        analytics.click('nano-code')
                    }}>
                <Code fontSize='small'/>
                <span style={{marginLeft: '3px'}}>Nano code</span>
            </Button>
            <Button color='secondary'
                    size='small'
                    onClick={() => {
                        drawer.open(<ApiDocModal
                            onClose={() => {
                                drawer.close()
                            }}
                            resource={props.resource}/>)

                        analytics.click('api-doc')
                    }}>
                <Api fontSize='small'/>
                <span style={{marginLeft: '3px'}}>Api Doc</span>
            </Button>
        </Stack>
    )

    return <>
        {drawer.render()}
        {confirmation.render()}
        <Box className='action-bar' display='flex' p={1}>
            <Stack direction='row' spacing={1}>
                <Button size='small' onClick={() => {
                    refresh()
                }}>
                    <Refresh fontSize='small'/>
                    <span style={{marginLeft: '3px'}}>Refresh</span>
                </Button>
                <Button size='small' onClick={(event) => {
                    setFiltersAnchor(event.currentTarget);
                    analytics.click('action', 'filters-open')
                }}>
                    <FilterList fontSize='small'/>
                    <span style={{marginLeft: '3px'}}>Filter</span>
                    {listParams.query && <span style={{marginLeft: '3px'}}>({filterCount})</span>}
                </Button>
                <Button size='small' onClick={(event) => {
                    setSortingAnchor(event.currentTarget);
                    analytics.click('action', 'sorting-open')
                }}>
                    <Sort fontSize='small'/>
                    <span style={{marginLeft: '3px'}}>Sorting</span>
                    {listParams.sorting && <span style={{marginLeft: '3px'}}>({sortingCount})</span>}
                </Button>
                {selectedItems.length === 0 && <>
                    <Button color='success'
                            size='small'
                            onClick={() => {
                                if (updates['new']) {
                                    toast.error('Please save the new record first')
                                    return
                                }

                                const newRecord: any = {
                                    id: 'new',
                                }

                                for (const propertyName of Object.keys(resource.properties)) {
                                    const property = resource.properties[propertyName]

                                    if (property.defaultValue) {
                                        newRecord[propertyName] = property.defaultValue
                                    }
                                }

                                setRecords([newRecord, ...records!])
                                setUpdates({
                                    ...updates,
                                    new: {}
                                })
                            }}>
                        <Add fontSize='small'/>
                        <span style={{marginLeft: '3px'}}>Add</span>
                    </Button>
                </>}
                {!resource.immutable && selectedItems.length > 0 && <>
                    <Button color='error' size='small' onClick={() => {
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
                        size='small'>
                        <Domain fontSize='small'/>
                        <span style={{marginLeft: '3px'}}>Save</span>
                        <span style={{marginLeft: '3px'}}>({Object.keys(updates).length})</span>
                    </Button>
                    <Button color='warning' size='small'
                            onClick={() => {
                                setUpdates({})
                            }}>
                        <Remove fontSize='small'/>
                        <span style={{marginLeft: '3px'}}>Revert</span>
                    </Button>
                </>}
            </Stack>
            <Box flexGrow={1}/>
            {commonButtons}
        </Box>
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
                         setFiltersAnchor(undefined)
                         refresh()
                     }}/>
        </Popover>
        <Box display='flex' flexDirection='row' flexGrow={1} className='data-table' marginLeft={2}
             style={{overflow: 'auto', height: '1px'}}>
            <DataTableTable
                offset={listParams.offset ?? 0}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                resource={resource}
                schema={resource}
                updateSchema={resource => {
                    setResource(resource as Resource)
                    resourceRepository.update(resource as Resource)
                    refresh()
                }}
                loading={loading}
                updates={updates}
                setUpdates={setUpdates}
                records={records}
                onAddColumnClick={handleAddColumnClick}
                onEditColumnClick={handleEditColumnClick}
            />
        </Box>
        <TablePagination component="div"
                         count={total || 0}
                         showFirstButton={true}
                         showLastButton={true}
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
                         onPageChange={(event, page) => {
                             setListParams({
                                 ...listParams,
                                 offset: (page * listParams.limit!)
                             })
                             analytics.click('action', 'change-page', page)
                         }}/>
    </>
}
