import {MultiDrawerProps, TabComponentProps} from "../multi-drawer/MultiDrawer.tsx";
import {Instance} from "../../../cloud/model/instance.ts";
import {Box, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useClient} from "@apibrew/react";
import {LoadingOverlay} from "common";

export function ProjectStatusElement(_: TabComponentProps<Instance>) {
    const client = useClient()

    const [health, setHealth] = useState<boolean>()
    const [version, setVersion] = useState<{ version: string, modules: { [key: string]: string } }>()

    useEffect(() => {
        fetch(
            `${client.getUrl()}/_version`,
            {
                method: 'GET',
                headers: {
                    ...client.headers()
                },
            }
        ).then(response => response.json()).then(data => {
            setVersion(data as any)
            setHealth(true)
        }).catch(() => {
            setHealth(false)
        })
    }, []);

    if (health === undefined) {
        return <LoadingOverlay/>
    }

    return <Box>
        {health ? <Typography color='saddlebrown' variant="h6">Health: OK</Typography> :
            <Typography variant="h6">Health: Error</Typography>}

        <Typography variant="h6">Version: {version?.version}</Typography>

        <Typography variant="h6">Modules:</Typography>

        <Box sx={{pl: 2}}>
            {Object.keys(version?.modules || {}).map(key => <Typography
                key={key}>{key}: {version?.modules[key]}</Typography>)}
        </Box>

    </Box>
}

export function projectStatusDrawer(instance: Instance): MultiDrawerProps<Instance> {
    return {
        title: 'Project Status',
        tabs: [
            {
                name: 'Project Status',
                component: ProjectStatusElement,
            },
        ],
        initialValue: instance,
        sx: {
            width: '800px'
        }
    }
}
