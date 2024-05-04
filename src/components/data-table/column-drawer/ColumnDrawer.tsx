import {Resource, useRepository} from "@apibrew/react";
import {ResourceEntityInfo} from "@apibrew/client/model/resource";
import {useConfirmation} from "../../modal/use-confirmation";
import toast from "react-hot-toast";
import React from "react";
import {Box, Button, Card, CardActions, CardContent, CardHeader, Stack} from "@mui/material";
import {Property} from "@apibrew/client/model";
import {PropertyForm} from "../../property-form/PropertyForm";
import {getAnnotation, withAnnotation} from "../../../util/annotation";
import {SourceMatchKey} from "../../../util/base-annotations";

export interface ColumnDrawerProps {
    resource: Resource
    new: boolean
    propertyName: string
    property: Property
    onUpdateResource: (resource: Resource) => void
    onClose: () => void
}

export function ColumnDrawer(props: ColumnDrawerProps) {
    const [propertyName, setPropertyName] = React.useState<string>(props.propertyName)
    const [property, setProperty] = React.useState<Property>(props.property)

    const repository = useRepository(ResourceEntityInfo)
    const confirmation = useConfirmation()

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
        confirmation.open({
            title: 'Delete property',
            message: 'Are you sure you want to delete this property?',
            kind: 'danger',
            onConfirm: () => {
                const updatedResource = {
                    ...props.resource,
                    properties: {
                        ...props.resource.properties,
                    }
                } as Resource

                delete (updatedResource.properties[propertyName])

                handleUpdateResource(updatedResource);
            }
        })
    }

    async function handleUpdate() {
        let updatedProperties = {...props.resource.properties}

        if (!props.new && props.propertyName !== propertyName && getAnnotation(property.annotations, SourceMatchKey) === "") {
            updatedProperties[props.propertyName] = property
            property.annotations = withAnnotation(property.annotations, SourceMatchKey, propertyName)

            await repository.update({
                ...props.resource,
                properties: updatedProperties
            } as Resource)
        }

        delete updatedProperties[props.propertyName]
        updatedProperties[propertyName] = property

        const updatedResource = {
            ...props.resource,
            properties: updatedProperties
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
