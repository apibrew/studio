import {useEffect, useState} from "react";
import {WidgetLayout} from "../../layout/WidgetLayout";
import {useClient} from "@apibrew/react";
import {Typography} from "@mui/material";

export function HealthWidget() {
    const client = useClient()

    const [health, setHealth] = useState<{ status: string }>()

    useEffect(() => {
        fetch(
            `${client.getUrl()}/health`,
            {
                method: 'GET',
                headers: {
                    ...client.headers()
                },
            }
        ).then(response => response.json()).then(data => {
            setHealth(data as any)
        })
    }, []);

    return <WidgetLayout title='Health'>
        {health && <Typography variant='body1'>{health.status === 'ok' ? 'Running' : health.status}</Typography>}
    </WidgetLayout>
}
