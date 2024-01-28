import {Box, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {Resource, useClient} from "@apibrew/react";
import {useEffect, useState} from "react";
import {LoadingOverlay} from "../../../components/LoadingOverlay";
import {DataTable} from "../../../components/data-table/DataTable";
import toast from "react-hot-toast";

export default function ResourcesPage() {
    const params = useParams()
    const client = useClient()
    const [resource, setResource] = useState<Resource>()
    const [resourceNotFound, setResourceNotFound] = useState<boolean>(false)

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
        console.log(process.env)
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
        <Box display='flex'
             height='100%'
             flexDirection='column'>
            <DataTable reloadResource={() => {
                setWi(wi + 1)
            }} resource={resource}/>
        </Box>
    </>
}