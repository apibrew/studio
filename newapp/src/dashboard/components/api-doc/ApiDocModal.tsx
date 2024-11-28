import {Resource, useClient} from "@apibrew/react";
import {Box, IconButton} from "@mui/material";
import {useState} from "react";
import {LoadingOverlay} from "common";
import {Close} from "@mui/icons-material";

export interface ApiDocModalProps {
    onClose: () => void
    resource?: Resource
}

export function ApiDocModal(props: ApiDocModalProps) {
    const client = useClient()
    const [loading, setLoading] = useState(true)

    return <Box width={'1000px'}>
        <Box display='flex' justifyContent='space-between' m={1} >
            <div
                className="fnt-600-20-Inter clr101828">Api Documentation {props.resource?.name}</div>
            <IconButton onClick={() => {
                if (props.onClose) {
                    props.onClose()
                }
            }}>
                <Close/>
            </IconButton>
        </Box>
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
