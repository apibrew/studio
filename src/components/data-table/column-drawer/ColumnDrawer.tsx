import {Resource, useRepository} from "@apibrew/react";
import {ResourceEntityInfo, Type} from "@apibrew/client/model/resource";
import {useConfirmation} from "../../modal/use-confirmation";
import toast from "react-hot-toast";
import React from "react";
import {Box, Button, Card, CardActions, CardContent, CardHeader, FormControl, Stack, TextField} from "@mui/material";
import {Property} from "@apibrew/client/model";
import {PropertyTypeDropdown} from "../../PropertyTypeDropdown";

export interface ColumnDrawerProps {
    resource: Resource
    new: boolean
    property: string
    onUpdateResource: (resource: Resource) => void
    onClose: () => void
}

export function ColumnDrawer(props: ColumnDrawerProps) {
    const [propertyName, setPropertyName] = React.useState<string>(props.property)
    const [property, setProperty] = React.useState<Property>(props.resource.properties[props.property] || {
        type: Type.STRING,
    } as Property)

    const repository = useRepository(ResourceEntityInfo)
    const confirmation = useConfirmation()

    function handleUpdateResource(updatedResource: Resource) {
        confirmation.open({
            kind: 'confirm',
            message: 'Are you sure you want to update this resource?',
            buttonMessage: 'Update',
            onConfirm: () => {
                toast.promise(repository.update(updatedResource), {
                    loading: 'Updating Resource...',
                    success: 'Resource updated',
                    error: 'Failed to update Resource'
                }).then(() => {
                    props.onClose()
                    props.onUpdateResource(updatedResource)
                })
            }
        })
    }

    function handleDelete() {
        const updatedResource = {
            ...props.resource,
            properties: {
                ...props.resource.properties,
            }
        } as Resource

        delete(updatedResource.properties[propertyName])

        handleUpdateResource(updatedResource);
    }

    function handleUpdate() {
        const updatedResource = {
            ...props.resource,
            properties: {
                ...props.resource.properties,
                [propertyName]: property
            }
        } as Resource

        handleUpdateResource(updatedResource);
    }

    return (
        <>
            {confirmation.render()}
            <Box width='600px'>
                <Card>
                    <CardHeader title={props.new ? 'New property' : 'Update property: ' + props.property}/>
                </Card>
                <CardContent>
                    <Stack spacing={2}>
                        <FormControl fullWidth>
                            <TextField
                                value={propertyName}
                                label='Name'
                                disabled={!props.new}
                                variant='filled'
                                onChange={(event) => {
                                    setPropertyName(event.target.value)
                                }}/>
                        </FormControl>
                        <FormControl fullWidth>
                            <PropertyTypeDropdown
                                value={property.type}
                                label='Type'
                                title='Type'
                                disabled={!props.new}
                                variant='filled'
                                onChange={(event) => {
                                    setProperty({
                                        ...property,
                                        type: event.target.value as Type
                                    })
                                }}/>
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                value={property.title}
                                label='Title'
                                variant='filled'
                                onChange={(event) => {
                                    setProperty({
                                        ...property,
                                        title: event.target.value
                                    })
                                }}/>
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                value={property.description}
                                label='Description'
                                variant='filled'
                                onChange={(event) => {
                                    setProperty({
                                        ...property,
                                        description: event.target.value
                                    })
                                }}/>
                        </FormControl>
                    </Stack>
                </CardContent>
                <CardActions>
                    <Stack direction='row' spacing={1}>
                        <Button variant='contained'
                                size='small'
                                color='success'
                                onClick={() => {
                                    handleUpdate()
                                }
                                }>Save</Button>
                        {!props.new && <Button variant='outlined'
                                               size='medium'
                                               color='error'
                                               onClick={() => handleDelete()}>Delete</Button>}
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