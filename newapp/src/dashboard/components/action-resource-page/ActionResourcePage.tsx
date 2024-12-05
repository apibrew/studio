import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {fromResource, Resource, useClient, useRepository} from "@apibrew/react";
import {LoadingOverlay} from "common";
import {Box, FormControl, FormLabel, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {resourceDrawerMultiDrawer} from "../resource-drawer/ResourceDrawer.tsx";
import {Api, Code, PlayCircle, RemoveCircle} from "@mui/icons-material";
import {ResourceNanoDrawer} from "../resource-nano-drawer/ResourceNanoDrawer.tsx";
import {ApiDocModal} from "../api-doc/ApiDocModal.tsx";
import {useDrawer} from "../../../hooks/use-drawer.tsx";
import {useAnalytics} from "../../hooks/use-analytics.ts";
import {isSpecialProperty, sortedProperties} from "@apibrew/client/util/property";
import {getPropertyFormByProperty} from "core";
import toast from "react-hot-toast";
import {openMultiDrawer} from "../multi-drawer/MultiDrawer.tsx";

const emptyResource = {
    namespace: {name: ''},
    name: ''
} as Resource;

export function ActionResourcePage() {
    const [wi, setWi] = useState<number>(0)
    const [resource, setResource] = useState<Resource>()
    const [actionData, setActionData] = useState<any>({})
    const client = useClient()
    const drawer = useDrawer()
    const analytics = useAnalytics()

    const params = useParams()

    const repository = useRepository<any>(fromResource(resource || emptyResource))

    useEffect(() => {
        setResource(undefined)
        if (params.namespace && params.resource) {
            client.getResourceByName(params.namespace, params.resource).then(resp => {
                setResource(resp)
            })
        }
    }, [params.namespace, params.resource, wi]);

    if (!params.namespace || !params.resource) {
        return <span>Please select a resource from the left panel</span>
    }

    if (!resource) {
        return <LoadingOverlay/>
    }

    function execute() {
        toast.promise(repository.create(actionData).then(resp => {
            setActionData(resp)
        }), {
            loading: 'Executing...',
            success: 'Executed successfully',
            error: err => err.message
        })
    }

    const properties = sortedProperties(resource.properties)

    const commonButtons = (
        <Stack direction='row' spacing={1}>
            <Button color='secondary'
                    size='small'
                    onClick={() => {
                        openMultiDrawer(drawer, resourceDrawerMultiDrawer(client, false, resource, () => {
                            setWi(wi + 1)
                        }))

                        analytics.click('update-resource')
                    }}>
                <Api fontSize='small'/>
                <span style={{marginLeft: '3px'}}>Update Resource</span>
            </Button>
            <Button color='secondary'
                    size='small'
                    onClick={() => {
                        drawer.open(
                            <ResourceNanoDrawer
                                namespace={resource.namespace.name}
                                resource={resource.name}
                                onClose={drawer.close}/>
                        )

                        analytics.click('nano-code')
                    }}>
                <Code fontSize='small'/>
                <span style={{marginLeft: '3px'}}>Nano code</span>
            </Button>
            <Button color='secondary'
                    size='small'
                    onClick={() => {
                        drawer.open(<ApiDocModal
                            onClose={() => {
                                drawer.close()
                            }}
                            resource={resource}/>)

                        analytics.click('api-doc')
                    }}>
                <Api fontSize='small'/>
                <span style={{marginLeft: '3px'}}>Api Doc</span>
            </Button>
        </Stack>
    )

    return <>
        {drawer.render()}
        <Box
            m={3}
            display='flex'
            height='100%'
            flexDirection='column'>
            <Stack direction='row' justifyContent='space-between'>
                <Stack direction='row' spacing={1}>
                    <Button color='success'
                            size='small'
                            onClick={() => {
                                execute()
                            }}>
                        <PlayCircle fontSize='small'/>
                        <span style={{marginLeft: '3px'}}>Execute</span>
                    </Button>
                    <Button color='error'
                            size='small'
                            onClick={() => {
                                setActionData({})
                            }}>
                        <RemoveCircle fontSize='small'/>
                        <span style={{marginLeft: '3px'}}>Reset</span>
                    </Button>
                </Stack>
                {commonButtons}
            </Stack>
            <Box>
                <Stack direction='column' spacing={1}>
                    {properties.map(item => {
                        const property = resource.properties[item]
                        const Form = getPropertyFormByProperty<unknown>(property, resource)

                        return <FormControl fullWidth>
                            <FormLabel>
                                {item}
                            </FormLabel>
                            <Form
                                disabled={isSpecialProperty(property)}
                                property={resource.properties[item]}
                                value={actionData[item]}
                                onChange={(updated, isValid) => {
                                    if (!isValid) {
                                        return
                                    }
                                    setActionData({
                                        ...actionData,
                                        [item]: updated
                                    })
                                }}/>
                        </FormControl>
                    })}
                </Stack>
            </Box>
        </Box>
    </>
}
