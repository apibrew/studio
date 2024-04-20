import React, {useEffect} from "react";
import {useConnection} from "../../context/ConnectionContext";
import {WidgetLayout} from "../../layout/WidgetLayout";
import {Box, Typography} from "@mui/material";
import {useClient} from "@apibrew/react";

export function WelcomeWidget() {
    const connection = useConnection()
    const client = useClient()
    const [version, setVersion] = React.useState<any>()

    useEffect(() => {
        fetch(client.getUrl() + "/_version")
            .then(response => {
                response.json().then(data => setVersion(data))
            })
    }, []);

    console.log(version)

    return <WidgetLayout title={''}>
        <Box>
            <Typography variant='body1'>
                Welcome to {connection.title}
            </Typography>
            {version && <Typography variant='body1'>
                Backend version: {version.version}
                <br/>
                Modules:
                <br/>
                {version.modules && Object.keys(version.modules).map((key: string) => (
                    <span key={key}>{key}: {version.modules[key]}</span>
                ))}
            </Typography>}
        </Box>
    </WidgetLayout>
}
