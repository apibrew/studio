import {Resource, useClient} from "@apibrew/react";
import {Box} from "@mui/material";

export interface ApiDocModalProps {
    onClose: () => void
    resource?: Resource
}

export function ApiDocModal(_: ApiDocModalProps) {
    const client = useClient()

    return <Box width={'1000px'}>
        <iframe style={{
            width: '100%',
            height: '100vh'
        }} src={client.getUrl() + '/docs/swagger/index.html'}/>
    </Box>
}
