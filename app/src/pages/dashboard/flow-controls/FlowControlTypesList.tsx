import {Box, Stack, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";

import {LoadingOverlay} from "common";
import Button from "@mui/material/Button";
import {useDataProvider} from "../../../components/data-provider/use-data-provider";
import {PageLayout} from "../../../layout/PageLayout";
import {useConfirmation} from "../../../components/modal/use-confirmation";
import {useRepository} from "@apibrew/react";
import toast from "react-hot-toast";
import {useDrawer} from "../../../hooks/use-drawer";
import {ValueDrawerComponent} from "../../../components/common/ValueDrawerComponent";
import {FlowControlType, FlowControlTypeEntityInfo, Kind, Parameter} from "../../../model/flow-control-type";
import {FlowControlForm} from "./FlowControlForm";

export function FlowControlTypesList() {
    const drawer = useDrawer()
    const data = useDataProvider<FlowControlType>(FlowControlTypeEntityInfo)
    const confirmation = useConfirmation()
    const repository = useRepository<FlowControlType>(FlowControlTypeEntityInfo)

    if (data.loading) {
        return <LoadingOverlay/>
    }

    function handleDelete(item: FlowControlType) {
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
        {drawer.render()}
        {confirmation.render()}
        <PageLayout>
            <Stack direction='row' spacing={1}>
                <Button
                    onClick={() => {
                        drawer.open(<ValueDrawerComponent
                            title={'New Flow Control'}
                            value={{
                                kind: Kind.STATEMENT,
                                parameters: [] as Parameter[],
                                code: `function execute(args) {\n\n\n}\n`
                            } as FlowControlType}
                            onChange={async updated => {
                                await toast.promise(repository.create(updated), {
                                    loading: 'Creating...',
                                    success: 'Flow Control created successfully',
                                    error: (err) => err.message
                                });
                                data.refresh()
                                drawer.close()
                            }}
                            onClose={drawer.close}
                            component={FlowControlForm}/>)
                    }}
                    color='success'>New</Button>
                <Box flexGrow={1}/>
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
                                    <Button
                                        onClick={() => {
                                            drawer.open(<ValueDrawerComponent
                                                title={'New Flow Control'}
                                                value={{
                                                    ...item,
                                                    name: 'flow-control-' + data.records.length,
                                                } as FlowControlType}
                                                onChange={async updated => {
                                                    await toast.promise(repository.create(updated), {
                                                        loading: 'Creating...',
                                                        success: 'Flow Control created successfully',
                                                        error: (err) => err.message
                                                    });
                                                    data.refresh()
                                                    drawer.close()
                                                }}
                                                onClose={drawer.close}
                                                component={FlowControlForm}/>)
                                        }}
                                        color='secondary'>Duplicate</Button>
                                    <Button onClick={() => {
                                        drawer.open(<ValueDrawerComponent
                                            title={'New Flow Control'}
                                            value={item}
                                            onChange={async updated => {
                                                await toast.promise(repository.update(updated), {
                                                    loading: 'Updating...',
                                                    success: 'Flow Control updated successfully',
                                                    error: (err) => err.message
                                                });
                                                data.refresh()
                                                drawer.close()
                                            }}
                                            onClose={drawer.close}
                                            component={FlowControlForm}/>)
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
