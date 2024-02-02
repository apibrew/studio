import Box from "@mui/material/Box";
import React from "react";
import {Stack, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {LoadingOverlay} from "../../../../components/LoadingOverlay";
import {useDataProvider} from "../../../../components/data-provider/use-data-provider";
import {UserEntityInfo} from "@apibrew/client/model/user";
import {User} from "@apibrew/react";

export interface List {

}

export function ListUser() {
    const data = useDataProvider<User>(UserEntityInfo)
    const navigate = useNavigate()

    if (data.loading) {
        return <LoadingOverlay/>
    }

    return (
        <Box>
            <Stack direction='row' spacing={3}>
                <Button
                    onClick={() => {
                        navigate('new')
                    }}
                    color='success'>New</Button>
                <Box flexGrow={1}/>
                <Button
                    onClick={() => {
                        navigate('../roles')
                    }}
                    color='info'>Roles</Button>
            </Stack>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Roles</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.records.map(item => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.username}</TableCell>
                            <TableCell>{item.roles?.join(', ')}</TableCell>
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
            {data.renderPagination()}
        </Box>
    )
}
