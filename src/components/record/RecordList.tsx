import {Resource} from "@apibrew/client/model";
import {Add, Delete, Description, Edit, Refresh, Search} from "@mui/icons-material";
import {useModal} from "../modal/use-modal";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import {Entity} from "@apibrew/client";
import {fromResource, useClient} from "@apibrew/react";
import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import {TableContainer, TablePagination} from "@mui/material";
import {ListRecordParams} from "@apibrew/client/list-record-params";
import {useConfirmation} from "../modal/use-confirmation";
import {toast} from "react-hot-toast";
import {useNavigate, useParams} from "react-router-dom";

export interface RecordListProps {
    resource: Resource
    columns: string[]
}

export function RecordList(props: RecordListProps) {
    const navigate = useNavigate()
    const {project} = useParams()
    const modal = useModal();
    const confirmation = useConfirmation()
    const client = useClient()

    const [records, setRecords] = useState<Entity[]>([])
    const [total, setTotal] = useState(-1);
    const [params, setParams] = useState<ListRecordParams>({
        limit: 10,
        offset: 0
    })

    async function load() {
        // NProgress.start()
        const resp = await client.repository(fromResource(props.resource)).list(params)
        // NProgress.done()
        if (!resp) {
            throw new Error('Failed to load resources')
        } else {
            console.log('resp', resp)
            setRecords(resp.content)
            setTotal(resp.total)
        }
    }

    useEffect(() => {
        load()
    }, [props.resource, props.columns, params])

    let title = props.resource.title

    if (!title) {
        title = props.resource.name
    }

    return <>
        {modal.render()}
        {confirmation.render()}
        <Grid xs={12}>
            <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
            >
                <div>
                    <Stack
                        direction="row"
                        spacing={4}
                    >
                        <IconButton onClick={() => {
                            // router.push(`${pathname}/new`)
                        }}>
                            <Add/>
                        </IconButton>
                        <IconButton onClick={() => {
                            load()
                        }}>
                            <Refresh/>
                        </IconButton>
                    </Stack>
                </div>
            </Stack>
        </Grid>
        <TableContainer sx={{
            m: 1
        }}>
            <Table
                sx={{
                    '& .MuiTableCell-sizeMedium': {
                        padding: '5px 6px',
                    },
                }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell width={30}>#</TableCell>
                        <TableCell width={320}>ID</TableCell>
                        <TableCell width={30}>Version</TableCell>
                        {props.columns.map(col => <TableCell key={col}>{col}</TableCell>)}
                        <TableCell width={200}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {records.map((item, index) => {
                        return <TableRow key={item.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{(item as any)['version']}</TableCell>
                            {props.columns.map(col => <TableCell key={col}>{(item as any)[col]}</TableCell>)}
                            <TableCell>
                                <Tooltip title='Edit'>
                                    <IconButton
                                        disabled={props.resource.immutable}
                                        onClick={() => navigate(`${item.id}/edit`)}>
                                        <Edit/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title='View'>
                                    <IconButton
                                        onClick={() => navigate(`${item.id}/view`)}>
                                        <Search/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title='Delete'>
                                    <IconButton
                                        onClick={() => {
                                            confirmation.open({
                                                kind: 'confirm',
                                                title: 'Delete record',
                                                message: 'Are you sure you want to delete this record?',
                                                onConfirm: async () => {
                                                    try {
                                                        await client.repository(fromResource(props.resource)).delete(item.id!)
                                                    } catch (e) {
                                                        // toast.error(e.message)
                                                    }
                                                    load()
                                                }
                                            })
                                        }}>
                                        <Delete/>
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
            <TablePagination
                component="div"
                count={total}
                page={params.offset! / params.limit!}
                onPageChange={(_, page) => {
                    setParams({
                        ...params,
                        offset: params.limit! * page
                    })
                }}
                rowsPerPage={params.limit!}
                onRowsPerPageChange={(e) => {
                    setParams({
                        ...params,
                        limit: parseInt(e.target.value, 10),
                        offset: 0
                    })
                }}/>
        </TableContainer>
    </>;
}
