import {Resource, useClient} from "@apibrew/react";
import {Box, Drawer} from "@mui/material";
import CodeEditor from '@uiw/react-textarea-code-editor';
import {useState} from "react";

export interface ApiDocModalProps {
    open: boolean
    onClose: () => void
    resource: Resource
}

export function ApiDocModal(props: ApiDocModalProps) {
    const client = useClient()

    return <>
        <Drawer open={props.open}
                variant='temporary'
                anchor='right'
                onClose={props.onClose}
                hideBackdrop={false}
        >
            <Box sx={{
                width: '800px'
            }}>
                <iframe style={{
                    width: '100%',
                    height: '100vh'
                }} src={client.getUrl() + '/docs/swagger/index.html'}/>
            </Box>
        </Drawer>
    </>
}
