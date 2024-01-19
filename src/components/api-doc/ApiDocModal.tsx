import {Resource} from "@apibrew/react";
import {Box, Drawer} from "@mui/material";

export interface ApiDocModalProps {
    open: boolean
    onClose: () => void
    resource: Resource
}

export function ApiDocModal(props: ApiDocModalProps) {
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

            </Box>
        </Drawer>
    </>
}
