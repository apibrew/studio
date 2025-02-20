import {ComponentType, useState} from "react";
import {PageLayout} from "../../../layout/PageLayout.tsx";
import {Box, Stack, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import Button from "@mui/material/Button";
import {useRepository, useResourceByName} from "@apibrew/react";
import {LoadingOverlay} from "common";
import {Entity} from "@apibrew/client";
import {EntityInfo} from "@apibrew/client/entity-info";
import {useDataProvider} from "../data-provider/use-data-provider.tsx";
import toast from "react-hot-toast";
import {useDrawer} from "../../../hooks/use-drawer.tsx";
import {ValueDrawerComponent, ValueDrawerComponentFormProps} from "../common/ValueDrawerComponent.tsx";
import {label} from "../../../util/record.ts";
import {useConfirmation} from "../../../components/modal/use-confirmation.tsx";
import {Refresh, Search} from "@mui/icons-material";

export interface GridPageProps<T> {
    entityInfo: EntityInfo
    recordForm: ComponentType<ValueDrawerComponentFormProps<T>>
    gridColumns: string[]
}

export function GridPage<T>(props: GridPageProps<T>) {
    const confirmation = useConfirmation()
    const drawer = useDrawer()
    const [wi, setWi] = useState<number>(0)

    const resource = useResourceByName(props.entityInfo.resource, props.entityInfo.namespace)
    const data = useDataProvider<Entity>(props.entityInfo, undefined, wi)
    const repository = useRepository<Entity>(props.entityInfo)

    if (!resource) {
        return <LoadingOverlay/>
    }

    function handleDelete(item: Entity) {
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
                        console.log(err)
                        toast.error(err.message)
                    })
            }
        })
    }

    return <>
        {confirmation.render()}
        {drawer.render()}
        <PageLayout>
            <Stack direction='row' spacing={1}>
                <Button
                    onClick={() => {
                        drawer.open(<ValueDrawerComponent
                            title={`New ${resource.name}`}
                            value={{}}
                            onChange={async (created: Entity) => {
                                if (created.id) {
                                    toast.success('Saved')
                                    data.refresh()
                                    return
                                }
                                await toast.promise(repository.create(created), {
                                    loading: 'Saving...',
                                    success: 'Saved',
                                    error: err => err.message
                                }).then(() => {
                                    data.refresh()
                                })
                            }}
                            onClose={() => {
                                drawer.close()
                            }}
                            component={props.recordForm}/>)
                    }}
                    color='success'>New</Button>
                <Button
                    onClick={() => {
                        setWi(wi + 1)
                    }}
                    color='secondary'>
                    Refresh
                    {!data.loading && <Search/>}
                    {data.loading && <Refresh/>}
                </Button>
            </Stack>
            <Box mt={3}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            {props.gridColumns.map(column => <TableCell>{column}</TableCell>)}
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!data.loading && data.records.map(item => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                {props.gridColumns.map(column => <TableCell>
                                    {(item as any)[column]}
                                </TableCell>)}
                                <TableCell>
                                    <Stack direction='row' spacing={1}>
                                        <Button onClick={() => {
                                            drawer.open(<ValueDrawerComponent
                                                title={`Update ${resource.name} / ${label(item)}`}
                                                value={item}
                                                onChange={async (updated: Entity) => {
                                                    await toast.promise(repository.update(updated), {
                                                        loading: 'Saving...',
                                                        success: 'Saved',
                                                        error: err => err.message
                                                    }).then(() => {
                                                        data.refresh()
                                                    })
                                                }}
                                                onClose={() => {
                                                    drawer.close()
                                                }}
                                                component={props.recordForm}/>)
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
            </Box>
            {data.renderPagination()}
        </PageLayout>
    </>
}

export function PrepareGridPage<T>(props: GridPageProps<T>): ComponentType<unknown> {
    return () => GridPage(props)
}
