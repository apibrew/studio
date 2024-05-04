import {Resource, useClient} from "@apibrew/react";
import React from "react";
import {Box, Button} from "@mui/material";
import toast from "react-hot-toast";
import {useConfirmation} from "../modal/use-confirmation";
import {DrawerMultiComponent} from "../common/DrawerMultiComponent";
import {ResourceForm} from "../resource-form/ResourceForm";
import {SchemaTable} from "../data-table/schema-new/Schema";

export interface ResourceDrawerProps {
    new: boolean
    resource: Resource
    onClose: () => void
}

export function ResourceDrawer(props: ResourceDrawerProps) {
    const client = useClient()
    const confirmation = useConfirmation()

    function handleDelete() {
        confirmation.open({
            kind: 'confirm',
            message: 'Are you sure you want to delete these resource?',
            buttonMessage: 'Delete',
            onConfirm: () => {
                toast.promise(client.deleteResource(props.resource, true), {
                    loading: 'Deleting Resource...',
                    success: 'Resource deleted',
                    error: err => err.message
                }).then(() => {
                    props.onClose()
                })
            }
        })
    }

    const [resource, setResource] = React.useState<Resource>(props.resource)
    return <DrawerMultiComponent
        title={props.new ? 'New resource' : 'Update resource: ' + props.resource.name}
        items={[
            {
                title: 'General',
                content: <ResourceForm resource={resource} onChange={setResource}/>,
            },
            {
                title: 'Schema',
                content: <SchemaTable resource={resource} setResource={setResource}/>
            }
        ]}
        actions={<>
            {confirmation.render()}
            <Box flexGrow={1}/>
            {props.new && <Button variant='contained'
                                  size='small'
                                  color='success'
                                  onClick={() => {
                                      toast.promise(client.createResource(resource, false), {
                                          loading: 'Creating Resource...',
                                          success: 'Resource created',
                                          error: err => err.message
                                      }).then(() => {
                                          props.onClose()
                                      })
                                  }
                                  }>Create</Button>}
            {!props.new && <Button variant='contained'
                                   size='small'
                                   color='warning'
                                   onClick={() => {
                                       toast.promise(client.updateResource(resource, true), {
                                           loading: 'Updating Resource...',
                                           success: 'Resource updated',
                                           error: err => err.message
                                       }).then(() => {
                                           props.onClose()
                                       })
                                   }
                                   }>Force Migrate</Button>}
            {!props.new && <Button variant='contained'
                                   size='small'
                                   color='success'
                                   onClick={() => {
                                       toast.promise(client.updateResource(resource, false), {
                                           loading: 'Updating Resource...',
                                           success: 'Resource updated',
                                           error: err => err.message
                                       }).then(() => {
                                           props.onClose()
                                       })
                                   }
                                   }>Update</Button>}
            <Button variant='outlined'
                    size='medium'
                    color='error'
                    onClick={() => handleDelete()}>Delete</Button>
            <Button variant='outlined'
                    size='medium'
                    color='primary'
                    onClick={() => props.onClose()}>Cancel</Button>
        </>}
    />
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}
