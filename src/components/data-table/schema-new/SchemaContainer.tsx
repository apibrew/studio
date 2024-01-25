import {Resource, useClient, useRepository} from "@apibrew/react";
import React, {useState} from "react";
import {Box, IconButton, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {Add, Domain, Save, UpdateSharp} from "@mui/icons-material";
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
    const client = useClient()
    const confirmation = useConfirmation()
    const drawer = useDrawer()

    function refresh() {

    }

    function handleUpdateResource(updatedResource: Resource, force?: boolean) {
        confirmation.open({
            kind: 'confirm',
            message: 'Are you sure you want to update this resource?' + (force ? ' This will force migrate the resource' : ''),
            buttonMessage: 'Update',
            onConfirm: () => {
                toast.promise(client.updateResource(updatedResource, force), {
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
                <Button
                    style={{
                        marginLeft: '40px'
                    }}
                    onClick={() => {
                        handleUpdateResource(resource)
                    }}
                    color='success'
                    size='small'>
                    <Save fontSize='small'/>
                    <span style={{marginLeft: '3px'}}>Save</span>
                </Button>
                <Button
                    style={{
                        marginLeft: '40px'
                    }}
                    onClick={() => {
                        handleUpdateResource(resource, true)
                    }}
                    color='warning'
                    size='small'>
                    <UpdateSharp fontSize='small'/>
                    <span style={{marginLeft: '5px'}}>Force Migrate</span>
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