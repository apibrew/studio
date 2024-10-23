import {Box, Stack, Tooltip, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {getRestPath, Resource, useClient, useRepository} from "@apibrew/react";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {DataTable} from "../../components/data-table/table/DataTable.tsx";
import Button from "@mui/material/Button";
import {CalendarViewMonth, CircleOutlined, Code} from "@mui/icons-material";
import {openMultiDrawer} from "../../components/multi-drawer/MultiDrawer.tsx";
import {resourceDrawerMultiDrawer} from "../../components/resource-drawer/ResourceDrawer.tsx";
import {useDrawer} from "../../../hooks/use-drawer.tsx";
import {ResourceEntityInfo} from "@apibrew/client/model/resource";
import {ApiDocModal} from "../../components/api-doc/ApiDocModal.tsx";
import {ResourceNanoDrawer} from "../../components/resource-nano-drawer/ResourceNanoDrawer.tsx";

export default function ResourcesPage() {
    const params = useParams()
    const client = useClient()
    const [resource, setResource] = useState<Resource>()
    const [resourceNotFound, setResourceNotFound] = useState<boolean>(false)
    const drawer = useDrawer()
    const resourceRepository = useRepository<Resource>(ResourceEntityInfo)

    const [wi, setWi] = useState<number>(0)

    useEffect(() => {
        setResource(undefined)
        setResourceNotFound(false)
        if (params.namespace && params.resource) {
            client.getResourceByName(params.namespace, params.resource)
                .then(resp => {
                    setResource(resp)
                }, err => {
                    if (err.code === 'RESOURCE_NOT_FOUND') {
                        setResourceNotFound(true)
                    }
                    toast.error('Failed to load resource: ' + err.message)
                })
        }
    }, [client, params.namespace, params.resource, wi]);

    if (resourceNotFound || !params.namespace || !params.resource) {
        return <Box m={1}>
            <Typography>
                Please select a resource from the left panel
            </Typography>
        </Box>
    }

    if (!resource) {
        return <></>
    }

    return <>
        {drawer.render()}
        <Box className="m2-div1">
            <Stack className="m2-div1-1 flex-center" direction='row' spacing={2}>
                <Typography variant='h5'>
                    {params.namespace !== 'default' && params.namespace + ' / '}
                    {params.resource}
                </Typography>
                <Tooltip title={resource.id}>
                    <Typography variant='body2' color='textSecondary'
                                onClick={() => {
                                    navigator.clipboard.writeText(resource.id)
                                    toast.success('Copied to clipboard')
                                }}>#{resource.id.substring(0, 8)}</Typography>
                </Tooltip>
                <Box flexGrow={1} />
                <Typography ml={10} variant='body2'>
                    GET /{getRestPath(resource)}
                </Typography>

                <Button variant='text' size='small' onClick={() => {
                    drawer.open(<ApiDocModal onClose={drawer.close}/>)
                }}>
                    <CircleOutlined />
                    <span>Api Doc</span>
                </Button>
                <Button variant='text' size='small' onClick={() => {
                    drawer.open(<ResourceNanoDrawer resource={resource.name} namespace={resource.namespace.name} onClose={drawer.close}/>)
                }}>
                    <Code />
                    <span>Nano Code</span>
                </Button>
                <Button variant='outlined' color='primary' size='small' onClick={() => {
                    openMultiDrawer(drawer, resourceDrawerMultiDrawer(resourceRepository, false, resource, () => {
                        setWi(wi + 1)
                    }))
                }}>
                    <CalendarViewMonth />
                    <span>Update Resource</span>
                </Button>
            </Stack>


            <DataTable reloadResource={() => {
                setWi(wi + 1)
            }} resource={resource} />



        </Box>
    </>
}
