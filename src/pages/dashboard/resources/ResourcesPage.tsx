import {Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {Resource, useClient} from "@apibrew/react";
import {useEffect, useState} from "react";
import {LoadingOverlay} from "../../../components/LoadingOverlay";
import {DataTable} from "../../../components/data-table/DataTable";

export default function ResourcesPage() {
    const params = useParams()
    const client = useClient()
    const [resource, setResource] = useState<Resource>()

    useEffect(() => {
        setResource(undefined)
        if (params.namespace && params.resource) {
            client.getResourceByName(params.namespace, params.resource)
                .then(resp => {
                    setResource(resp)
                })
        }
    }, [client, params.namespace, params.resource]);

    if (!params.namespace || !params.resource) {
        return <Typography>
            Please select a resource from the left panel
        </Typography>
    }

    if (!resource) {
        return <LoadingOverlay/>
    }

    return <>
        <DataTable resource={resource}/>
    </>
}