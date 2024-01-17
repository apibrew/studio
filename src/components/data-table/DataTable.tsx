import {fromResource, Resource, useRepository} from "@apibrew/react";
import React, {useEffect, useState} from "react";
import {Box, Popover, Stack, TablePagination, ToggleButton, ToggleButtonGroup} from "@mui/material";
import Button from "@mui/material/Button";
import {Add, Api, Code, DataArray, Domain, EditOff, FilterList, Refresh, Remove, Schema} from "@mui/icons-material";
import {DataTableTable} from "./Table";
import {LoadingOverlay} from "../LoadingOverlay";
import './DataTable.scss'
import {Filters} from "./Filters";
import {useQueryListParams} from "../../hooks/use-query-list-params";
import {useConfirmation} from "../modal/use-confirmation";
import toast from "react-hot-toast";

export interface DataTableProps {
    resource: Resource
}

const defaultListParams = {
    offset: 0,
    limit: 10
}

export function DataTable(props: DataTableProps) {
    const repository = useRepository(fromResource(props.resource))
    const [refreshIndex, setRefreshIndex] = useState<number>(0)
    const [listParams, setListParams] = useQueryListParams(defaultListParams)
    const [filtersAnchor, setFiltersAnchor] = useState<HTMLElement>()
    const [inlineMode, setInlineMode] = useState<boolean>(true)
    const confirmation = useConfirmation()
    const [updates, setUpdates] = useState<{ [key: string]: any }>({})

    const [records, setRecords] = useState<any[]>()
    const [total, setTotal] = useState<number>(0)
    const [selectedItems, setSelectedItems] = useState<string[]>([])

    function refresh() {
        setRefreshIndex(refreshIndex + 1)
    }

    function handleDelete() {
        const deleteFn = async function (): Promise<unknown> {
            for (const id of selectedItems) {
                await repository.delete(id)
            }

            return
        }
        confirmation.open({
            kind: 'confirm',
            message: 'Are you sure you want to delete these records?',
            buttonMessage: 'Delete',
            onConfirm: () => {
                toast.promise(
                    deleteFn(),
                    {
                        loading: 'Deleting records...',
                        success: 'Records deleted',
                        error: 'Failed to delete records'
                    })
                    .then(() => {
                        setSelectedItems([])
                        refresh()
                    })
            }
        })
    }

    async function handleSave() {
        let isSuccess = true
        let sc = 0
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
        setRecords(undefined)
        repository.list(listParams).then(resp => {
            setRecords(resp.content)
            setTotal(resp.total)
        })
    }, [props.resource, listParams, refreshIndex]);

    useEffect(() => {
        if (records?.some(item => item.id === 'new') && updates['new'] === undefined) {
            setRecords(records.filter(item => item.id !== 'new'))
        }
    }, [updates]);

    const filterCount = listParams.query ? listParams.query.and ? listParams.query.and.length : 1 : 0

    console.log('updates', updates)

    return <>
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
                }}>
                    <FilterList fontSize='small'/>
                    <span style={{marginLeft: '3px'}}>Filter</span>
                    {listParams.query && <span style={{marginLeft: '3px'}}>({filterCount})</span>}
                </Button>
                {selectedItems.length === 0 && <>
                    <Button color='success'
                            size='small'
                            onClick={() => {
                                if (updates['new']) {
                                    toast.error('Please save the new record first')
                                    return
                                }

                                setRecords([{
                                    id: 'new',
                                }, ...records!])
                                setUpdates({
                                    ...updates,
                                    new: {}
                                })
                            }}>
                        <Add fontSize='small'/>
                        <span style={{marginLeft: '3px'}}>Add</span>
                    </Button>
                </>}
                {selectedItems.length > 0 && <>
                    <Button color='warning' size='small'>
                        <Domain fontSize='small'/>
                        <span style={{marginLeft: '3px'}}>Yaml</span>
                    </Button>
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
            <Stack direction='row' spacing={1}>
                <Button color='secondary'
                        size='small'>
                    <Code fontSize='small'/>
                    <span style={{marginLeft: '3px'}}>Nano code</span>
                </Button>
                <Button color='secondary'
                        size='small'>
                    <Api fontSize='small'/>
                    <span style={{marginLeft: '3px'}}>Api Doc</span>
                </Button>
                <ToggleButtonGroup value={1}>
                    <ToggleButton color={inlineMode ? 'info' : 'error'}
                                  value={1}
                                  onClick={() => {
                                      setInlineMode(!inlineMode)
                                  }}
                                  size='small'>
                        <EditOff fontSize='small'/>
                        <span style={{marginLeft: '3px'}}>Inline [{inlineMode ? 'on' : 'off'}]</span>
                    </ToggleButton>
                </ToggleButtonGroup>
                <ToggleButtonGroup value={'data'}>
                    <ToggleButton color='secondary'
                                  value={'data'}
                                  size='small'>
                        <DataArray fontSize='small'/>
                        <span style={{marginLeft: '3px'}}>Data</span>
                    </ToggleButton>
                    <ToggleButton color='secondary'
                                  value={'schema'}
                                  size='small'>
                        <Schema fontSize='small'/>
                        <span style={{marginLeft: '3px'}}>Schema</span>
                    </ToggleButton>
                </ToggleButtonGroup>
            </Stack>
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
            <Filters resource={props.resource}
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
        <Box className='data-table'>
            {records && <DataTableTable offset={listParams.offset ?? 0}
                                        inlineMode={inlineMode}
                                        selectedItems={selectedItems}
                                        setSelectedItems={setSelectedItems}
                                        resource={props.resource}
                                        updates={updates}
                                        setUpdates={setUpdates}
                                        records={records}/>}
            {!records && <LoadingOverlay/>}
        </Box>
        <Box flexGrow={1}/>
        <TablePagination component="div"
                         count={total}
                         showFirstButton={true}
                         showLastButton={true}
                         page={Math.ceil(listParams.offset! / listParams.limit!)}
                         rowsPerPage={listParams.limit!}
                         onRowsPerPageChange={(event) => {
                             setListParams({
                                 ...listParams,
                                 limit: parseInt(event.target.value)
                             })
                         }}
                         onPageChange={(event, page) => {
                             setListParams({
                                 ...listParams,
                                 offset: (page * listParams.limit!)
                             })
                         }}/>
    </>
}