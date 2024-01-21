import {Resource, useRepository} from "@apibrew/react";
import {ResourceForm} from "../resource-form/ResourceForm";
import React from "react";
import {Box, Button, Card, CardActions, CardContent, CardHeader, Stack} from "@mui/material";
import toast from "react-hot-toast";
import {ResourceEntityInfo} from "@apibrew/client/model/resource";
import {useConfirmation} from "../modal/use-confirmation";
import {SubTypesForm} from "../sub-types-form/SubTypesForm";

export interface ResourceDrawerProps {
    resource: Resource
    onClose: () => void
}

export function SubTypesDrawer(props: ResourceDrawerProps) {
    const repository = useRepository(ResourceEntityInfo)
    const confirmation = useConfirmation()

    const [Resource, setResource] = React.useState<Resource>(props.resource)
    return (
        <>
            {confirmation.render()}
            <Box width='600px'>
                <Card>
                    <CardHeader title={'Sub Types of ' + props.resource.name}/>
                </Card>
                <CardContent>
                    <SubTypesForm resource={Resource} onChange={setResource}/>
                </CardContent>
                <CardActions>
                    <Stack direction='row' spacing={1}>
                        <Button variant='contained'
                                size='small'
                                color='success'
                                onClick={() => {
                                    toast.promise(repository.update(Resource), {
                                        loading: 'Updating Resource...',
                                        success: 'Resource updated',
                                        error: 'Failed to update Resource'
                                    }).then(() => {
                                        props.onClose()
                                    })
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