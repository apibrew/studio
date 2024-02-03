import {Namespace, useRepository} from "@apibrew/react";
import {NamespaceForm} from "../namespace-form/NamespaceForm";
import React from "react";
import {Box, Button, Card, CardActions, CardContent, CardHeader, Stack} from "@mui/material";
import toast from "react-hot-toast";
import {NamespaceEntityInfo} from "@apibrew/client/model/namespace";

export interface NamespaceDrawerProps {
    new: boolean
    namespace: Namespace
    onClose: () => void
}

export function NamespaceDrawer(props: NamespaceDrawerProps) {
    const repository = useRepository(NamespaceEntityInfo)

    const [namespace, setNamespace] = React.useState<Namespace>(props.namespace)
    return (
        <>
            <Box width='600px'>
                <Card>
                    <CardHeader title={props.new ? 'New namespace' : 'Update namespace: ' + props.namespace.name}/>
                </Card>
                <CardContent>
                    <NamespaceForm namespace={namespace} onChange={setNamespace}/>
                </CardContent>
                <CardActions>
                    <Stack direction='row' spacing={1}>
                        <Button variant='contained'
                                size='small'
                                color='success'
                                onClick={() => {
                                    if (props.new) {
                                        toast.promise(repository.create(namespace), {
                                            loading: 'Creating namespace...',
                                            success: 'Namespace created',
                                            error: err => err.message
                                        }).then(() => {
                                            props.onClose()
                                        }, console.error)
                                    } else {
                                        toast.promise(repository.update(namespace), {
                                            loading: 'Updating namespace...',
                                            success: 'Namespace updated',
                                            error: err => err.message
                                        }).then(() => {
                                            props.onClose()
                                        }, console.error)
                                    }
                                }
                                }>Save</Button>
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