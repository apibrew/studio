import {fromResource, Resource, useRepository} from "@apibrew/react";
import React, {useEffect, useState} from "react";
import {Box, Stack, TablePagination} from "@mui/material";
import Button from "@mui/material/Button";
import {Add, Api, Code, Domain, EditOff, FilterList, Refresh, Remove, Schema} from "@mui/icons-material";
import {DataTableTable} from "./Table";
import {LoadingOverlay} from "../LoadingOverlay";
import './DataTable.scss'

export interface DataTableProps {
    resource: Resource
}

export function DataTable(props: DataTableProps) {
    const repository = useRepository(fromResource(props.resource))

    const [records, setRecords] = useState<any[]>()
    const [total, setTotal] = useState<number>(0)
    const [limit, setLimit] = useState<number>(100)
    const [offset, setOffset] = useState<number>(0)

    function refresh() {
        setRecords(undefined)
        repository.list({
            limit: limit,
            offset: offset
        }).then(resp => {
            setRecords(resp.content)
            setTotal(resp.total)
        })
    }

    useEffect(() => {
        setRecords(undefined)
        repository.list({
            limit: limit,
            offset: offset
        }).then(resp => {
            setRecords(resp.content)
            setTotal(resp.total)
        })
    }, [props.resource, limit, offset]);


    return <>
        <Box display='flex' p={1}>
            <Stack direction='row' spacing={1}>
                <Button size='small' onClick={() => {
                    refresh()
                }}>
                    <Refresh fontSize='small'/>
                    <span style={{marginLeft: '3px'}}>Refresh</span>
                </Button>
                <Button size='small'>
                    <FilterList fontSize='small'/>
                    <span style={{marginLeft: '3px'}}>Filter</span>
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
        <Box className='data-table'>
            {records && <DataTableTable offset={offset} resource={props.resource} records={records}/>}
            {!records && <LoadingOverlay/>}
        </Box>
        <Box flexGrow={1}/>
        <TablePagination component="div"
                         count={total}
                         page={offset / limit}
                         rowsPerPage={limit}
                         onRowsPerPageChange={(event) => {
                             setLimit(parseInt(event.target.value))
                         }}
                         onPageChange={(event, page) => {
                             setOffset(page * limit)
                         }}/>
    </>
}