import {Box, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {Resource, useClient} from "@apibrew/react";
import {useEffect, useState} from "react";
import {LoadingOverlay} from "../../../components/LoadingOverlay";
import {DataTable} from "../../../components/data-table/DataTable";
import {ensurePropertiesOrder, ensureResourcePropertiesOrder} from "../../../util/resource";

export default function ResourcesPage() {
    const params = useParams()
    const client = useClient()
    const [resource, setResource] = useState<Resource>()

    const [wi, setWi] = useState<number>(0)

    useEffect(() => {
        setResource(undefined)
        if (params.namespace && params.resource) {
            client.getResourceByName(params.namespace, params.resource)
                .then(resp => {
                    setResource(resp)
                })
        }
    }, [client, params.namespace, params.resource, wi]);

    useEffect(() => {
        if (resource) {
            if (ensureResourcePropertiesOrder(resource)) {
                client.updateResource(resource)
                    .then(() => {
                        setWi(wi + 1)
                    })
            }
        }
    }, [resource]);

    if (!params.namespace || !params.resource) {
        return <Typography>
            Please select a resource from the left panel
        </Typography>
    }

    if (!resource) {
        return <LoadingOverlay/>
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