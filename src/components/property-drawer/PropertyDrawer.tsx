import {Resource, useRepository} from "@apibrew/react";
import {ResourceEntityInfo, Type} from "@apibrew/client/model/resource";
import toast from "react-hot-toast";
import React from "react";
import {Box, Button, Card, CardActions, CardContent, CardHeader, Stack} from "@mui/material";
import {Property} from "@apibrew/client/model";
import {useConfirmation} from "../modal/use-confirmation";
import {PropertyForm} from "../property-form/PropertyForm";

export interface ColumnDrawerProps {
    resource: Resource
    new: boolean
    propertyName: string
    property: Property
    onUpdateResource: (resource: Resource) => void
    onClose: () => void
}

export function PropertyDrawer(props: ColumnDrawerProps) {
    const [propertyName, setPropertyName] = React.useState<string>(props.propertyName)
    const [property, setProperty] = React.useState<Property>(props.property)

    const repository = useRepository(ResourceEntityInfo)

    function handleUpdateResource(updatedResource: Resource) {
        toast.promise(repository.update(updatedResource), {
            loading: 'Updating Resource...',
            success: 'Resource updated',
            error: err => err.message
        }).then(() => {
            props.onClose()
            props.onUpdateResource(updatedResource)
        })
    }

    function handleDelete() {
        const updatedResource = {
            ...props.resource,
            properties: {
                ...props.resource.properties,
            }
        } as Resource

        delete (updatedResource.properties[propertyName])

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
            <Box width='600px'>
                <Card>
                    <CardHeader title={props.new ? 'New property' : 'Update property: ' + props.property}/>
                </Card>
                <CardContent>
                    <PropertyForm
                        resource={props.resource}
                        new={props.new}
                        propertyName={propertyName}
                        onChangeName={setPropertyName}
                        property={property}
                        onChange={setProperty}
                    />
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