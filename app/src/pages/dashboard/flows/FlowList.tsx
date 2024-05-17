import {Box, Stack, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";

import {LoadingOverlay} from "common";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {useDataProvider} from "../../../components/data-provider/use-data-provider";
import {PageLayout} from "../../../layout/PageLayout";
import {useConfirmation} from "../../../components/modal/use-confirmation";
import {useRepository} from "@apibrew/react";
import toast from "react-hot-toast";
import {Flow, FlowEntityInfo} from "../../../model/flow";

export function FlowList() {
    const data = useDataProvider<Flow>(FlowEntityInfo)
    const navigate = useNavigate()
    const confirmation = useConfirmation()
    const repository = useRepository<Flow>(FlowEntityInfo)

    if (data.loading) {
        return <LoadingOverlay/>
    }

    function handleDelete(item: Flow) {
        confirmation.open({
            title: 'Delete',
            message: 'Are you sure you want to delete this item?',
            kind: 'danger',
            onConfirm: () => {
                repository.delete(item.id)
                    .then(() => {
                        data.refresh()
                        toast.success('Code deleted successfully')
                    }, err => {
                        toast.error(err.message)
                    })
            }
        })
    }

    return <>
        {confirmation.render()}
        <PageLayout>
            <Stack direction='row' spacing={1}>
                <Button
                    onClick={() => {
                        navigate('new')
                    }}
                    color='success'>New</Button>
                <Box flexGrow={1}/>
                {/*<Button*/}
                {/*    onClick={() => {*/}
                {/*        navigate('playground')*/}
                {/*    }}*/}
                {/*    color='info'>PlayGround</Button>*/}
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
                    {data.records.map(item => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.version}</TableCell>
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
        </PageLayout>
    </>
}
