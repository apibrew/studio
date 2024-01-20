import {Resource, useRepository} from "@apibrew/react";
import {ResourceForm} from "../resource-form/ResourceForm";
import React from "react";
import {Box, Button, Card, CardActions, CardContent, CardHeader, Stack} from "@mui/material";
import toast from "react-hot-toast";
import {ResourceEntityInfo} from "@apibrew/client/model/resource";
import {useConfirmation} from "../modal/use-confirmation";

export interface ResourceDrawerProps {
    new: boolean
    resource: Resource
    onClose: () => void
}

export function ResourceDrawer(props: ResourceDrawerProps) {
    const repository = useRepository(ResourceEntityInfo)
    const confirmation = useConfirmation()

    function handleDelete() {
        confirmation.open({
            kind: 'confirm',
            message: 'Are you sure you want to delete these resource?',
            buttonMessage: 'Delete',
            onConfirm: () => {
                toast.promise(repository.delete(props.resource.id), {
                    loading: 'Deleting Resource...',
                    success: 'Resource deleted',
                    error: 'Failed to delete Resource'
                }).then(() => {
                    props.onClose()
                })
            }
        })
    }

    const [Resource, setResource] = React.useState<Resource>(props.resource)
    return (
        <>
            {confirmation.render()}
            <Box width='600px'>
                <Card>
                    <CardHeader title={props.new ? 'New resource' : 'Update resource: ' + props.resource.name}/>
                </Card>
                <CardContent>
                    <ResourceForm resource={Resource} onChange={setResource}/>
                </CardContent>
                <CardActions>
                    <Stack direction='row' spacing={1}>
                        <Button variant='contained'
                                size='small'
                                color='success'
                                onClick={() => {
                                    if (props.new) {
                                        toast.promise(repository.create(Resource), {
                                            loading: 'Creating Resource...',
                                            success: 'Resource created',
                                            error: 'Failed to create Resource'
                                        }).then(() => {
                                            props.onClose()
                                        })
                                    } else {
                                        toast.promise(repository.update(Resource), {
                                            loading: 'Updating Resource...',
                                            success: 'Resource updated',
                                            error: 'Failed to update Resource'
                                        }).then(() => {
                                            props.onClose()
                                        })
                                    }
                                }
                                }>Save</Button>
                        <Button variant='outlined'
                                size='medium'
                                color='error'
                                onClick={() => handleDelete()}>Delete</Button>
                        <Button variant='outlined'
                                size='medium'
                                color='primary'
                                onClick={() => props.onClose()}>Cancel</Button>
                    </Stack>
                </CardActions>
            </Box>
        </>
    )
}