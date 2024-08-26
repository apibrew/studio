import {Resource, useClient} from "@apibrew/react";
import {Box} from "@mui/material";
import {useState} from "react";
import {LoadingOverlay} from "common";

export interface ApiDocModalProps {
    onClose: () => void
    resource?: Resource
}

export function ApiDocModal(_: ApiDocModalProps) {
    const client = useClient()
    const [loading, setLoading] = useState(true)

    return <Box width={'1000px'}>
        {loading && <LoadingOverlay/>}
        <iframe
            onLoad={() => setLoading(false)}
            style={{
                width: '100%',
                height: '100vh'
            }}
            src={client.getUrl() + '/docs/swagger/index.html'}/>
    </Box>
}
