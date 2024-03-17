import {Box} from "@mui/material";
import React, {useEffect, useState} from "react";
import {DataTable} from "../../../components/data-table/DataTable";
import {Resource, useClient} from "@apibrew/react";
import {LoadingOverlay} from "../../../components/LoadingOverlay";
import {useParams} from "react-router-dom";

export default function ResourcePage() {
    const [wi, setWi] = useState<number>(0)
    const [resource, setResource] = useState<Resource>()
    const client = useClient()

    const params = useParams()

    useEffect(() => {
        setResource(undefined)
        if (params.namespace && params.resource) {
            client.getResourceByName(params.namespace, params.resource).then(resp => {
                setResource(resp)
            })
        }
    }, [params.namespace, params.resource, wi]);

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