import {Box, Stack, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import React from "react";
import Container from "@mui/material/Container";
import {useRecords} from "@apibrew/react";
import {Code, CodeEntityInfo} from "@apibrew/client/nano/model/code";
import {LoadingOverlay} from "../../../components/LoadingOverlay";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

export default function NanoList() {
    const list = useRecords<Code>(CodeEntityInfo)
    const navigate = useNavigate()

    if (!list) {
        return <LoadingOverlay/>
    }

    return <>
        <Container>
            <Stack marginTop={3} direction='row' spacing={3}>
                <Button
                    onClick={() => {
                        navigate('new')
                    }}
                    color='success'>New</Button>
                <Box flexGrow={1}/>
                <Button
                    onClick={() => {
                        navigate('playground')
                    }}
                    color='info'>PlayGround</Button>
            </Stack>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Version</TableCell>
                        <TableCell>Language</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {list.map(item => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.version}</TableCell>
                            <TableCell>{item.language}</TableCell>
                            <TableCell>
                                <Stack direction='row' spacing={1}>
                                    <Button onClick={() => {
                                        navigate(item.id)
                                    }} color='primary' size='small'>
                                        Edit
                                    </Button>
                                    <Button color='error' size='small'>
                                        Delete
                                    </Button>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    </>
}