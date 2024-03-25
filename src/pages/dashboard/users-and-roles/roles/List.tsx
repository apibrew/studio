import Box from "@mui/material/Box";
import React from "react";
import {Stack, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {LoadingOverlay} from "../../../../components/LoadingOverlay";
import {useDataProvider} from "../../../../components/data-provider/use-data-provider";
import {RoleEntityInfo} from "@apibrew/client/model/role";
import {Role, useRepository} from "@apibrew/react";
import {useConfirmation} from "../../../../components/modal/use-confirmation";
import toast from "react-hot-toast";
import {PermissionEntityInfo} from "@apibrew/client/model/permission";
import {Permission} from "@apibrew/client/model";

export interface List {

}

export function ListRole() {
    const data = useDataProvider<Role>(RoleEntityInfo, {
        resolveReferences: ['$.permissions[]']
    })
    const navigate = useNavigate()
    const confirmation = useConfirmation()
    const repository = useRepository<Role>(RoleEntityInfo)
    const permissionRepository = useRepository<Permission>(PermissionEntityInfo)

    if (data.loading) {
        return <LoadingOverlay/>
    }

    function handleDelete(item: Role) {
        confirmation.open({
            title: 'Delete',
            message: 'Are you sure you want to delete this item?',
            kind: 'danger',
            onConfirm: () => {
                const promises: Promise<unknown>[] = item.permissions?.map(permission => permissionRepository.delete(permission.id)) || []

                Promise.all(promises)
                    .then(() => {
                        repository.delete(item.id)
                            .then(() => {
                                data.refresh()
                                toast.success('Role deleted successfully')
                            }, err => {
                                toast.error(err.message)
                            })
                    }, err => {
                        toast.error(err.message)
                    })
            }
        })
    }

    return (
        <Box>
            {confirmation.render()}
            <Stack direction='row' spacing={3}>
                <Button
                    onClick={() => {
                        navigate('new')
                    }}
                    color='success'>New</Button>
                <Box flexGrow={1}/>
                <Button
                    onClick={() => {
                        navigate('../users')
                    }}
                    color='info'>Users</Button>
            </Stack>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.records.map(item => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>
                                <Stack direction='row' spacing={1}>
                                    <Button onClick={() => {
                                        navigate(item.id)
                                    }} color='primary' size='small'>
                                        Edit
                                    </Button>
                                    <Button onClick={() => {
                                        handleDelete(item)
                                    }} color='error' size='small'>
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
