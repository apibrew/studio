import {Resource, useRepository} from "@apibrew/react";
import React, {useState} from "react";
import {Box, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {Add, Domain} from "@mui/icons-material";
import {useConfirmation} from "../../modal/use-confirmation";
import toast from "react-hot-toast";
import {useDrawer} from "../../../hooks/use-drawer";
import {ResourceEntityInfo, Type} from "@apibrew/client/model/resource";
import {Property} from "@apibrew/client/model";
import {SchemaTable} from "./Schema";
import {SubType} from "@apibrew/client/model/resource-action";

export interface SchemaContainerProps {
    resource: Resource
    commonButtons: React.ReactNode
}

export function SchemaContainer(props: SchemaContainerProps) {
    const [resource, setResource] = useState<Resource>(props.resource)
    const resourceRepository = useRepository(ResourceEntityInfo)
    const confirmation = useConfirmation()
    const drawer = useDrawer()

    function refresh() {

    }

    function handleUpdateResource(updatedResource: Resource) {
        confirmation.open({
            kind: 'confirm',
            message: 'Are you sure you want to update this resource?',
            buttonMessage: 'Update',
            onConfirm: () => {
                toast.promise(resourceRepository.update(updatedResource), {
                    loading: 'Updating Resource...',
                    success: 'Resource updated',
                    error: 'Failed to update Resource'
                }).then(() => {
                    refresh()
                })
            }
        })
    }

    return <Box display='flex' flexDirection='column' height='100%' overflow='auto'>
        {drawer.render()}
        {confirmation.render()}
        <Box className='action-bar' display='flex' p={1}>
            <Stack direction='row' spacing={1}>
                <Button color='success'
                        size='small'
                        onClick={() => {
                            setResource({
                                ...resource,
                                properties: {
                                    ...resource.properties,
                                    [`new-property-${Math.floor(Math.random() * 1000000)}`]: {
                                        type: Type.STRING
                                    } as Property
                                }
                            })
                        }}>
                    <Add fontSize='small'/>
                    <span style={{marginLeft: '3px'}}>Add</span>
                </Button>
                <Button color='success'
                        size='small'
                        onClick={() => {
                            setResource({
                                ...resource,
                                types: [
                                    ...(resource.types || []),
                                    {
                                        name: 'new',
                                        properties: {}
                                    } as SubType
                                ]
                            })
                        }}>
                    <Add fontSize='small'/>
                    <span style={{marginLeft: '3px'}}>Add Type</span>
                </Button>
                <Button
                    style={{
                        marginLeft: '40px'
                    }}
                    onClick={() => {
                        handleUpdateResource(resource)
                    }}
                    color='success'
                    size='small'>
                    <Domain fontSize='small'/>
                    <span style={{marginLeft: '3px'}}>Save</span>
                </Button>
            </Stack>
            <Box flexGrow={1}/>
            {props.commonButtons}
        </Box>
        <SchemaTable
            resource={resource}
            setResource={setResource}
            onTriggerUpdate={refresh}
        />
        <Box m={5}/>
    </Box>
}