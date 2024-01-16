import {fromResource, Resource, useRepository} from "@apibrew/react";
import React, {useEffect, useState} from "react";
import {Box, Popover, Stack, TablePagination} from "@mui/material";
import Button from "@mui/material/Button";
import {Add, Api, Code, Domain, EditOff, FilterList, Refresh, Remove, Schema} from "@mui/icons-material";
import {DataTableTable} from "./Table";
import {LoadingOverlay} from "../LoadingOverlay";
import './DataTable.scss'
import {Filters} from "./Filters";
import {useQueryListParams} from "../../hooks/use-query-list-params";

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

    const [records, setRecords] = useState<any[]>()
    const [total, setTotal] = useState<number>(0)

    function refresh() {
        setRefreshIndex(refreshIndex + 1)
    }

    useEffect(() => {
        setRecords(undefined)
        repository.list(listParams).then(resp => {
            setRecords(resp.content)
            setTotal(resp.total)
        })
    }, [props.resource, listParams, refreshIndex]);

    const filterCount = listParams.query ? listParams.query.and ? listParams.query.and.length : 1 : 0

    return <>
        <Box display='flex' p={1}>
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
                <Button color='success' size='small'>
                    <Add fontSize='small'/>
                    <span style={{marginLeft: '3px'}}>Insert</span>
                </Button>
                <Button color='warning' size='small'>
                    <Domain fontSize='small'/>
                    <span style={{marginLeft: '3px'}}>Yaml</span>
                </Button>
                <Button color='error' size='small'>
                    <Remove fontSize='small'/>
                    <span style={{marginLeft: '3px'}}>Delete</span>
                </Button>
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
                    <Schema fontSize='small'/>
                    <span style={{marginLeft: '3px'}}>Schema</span>
                </Button>
                <Button color='secondary'
                        size='small'>
                    <Api fontSize='small'/>
                    <span style={{marginLeft: '3px'}}>Api Doc</span>
                </Button>
                <Button color='secondary'
                        size='small'>
                    <EditOff fontSize='small'/>
                    <span style={{marginLeft: '3px'}}>Inline edit</span>
                </Button>
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
            {records && <DataTableTable offset={listParams.offset ?? 0} resource={props.resource} records={records}/>}
            {!records && <LoadingOverlay/>}
        </Box>
        <Box flexGrow={1}/>
        <TablePagination component="div"
                         count={total}
                         page={listParams.offset! / listParams.limit!}
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