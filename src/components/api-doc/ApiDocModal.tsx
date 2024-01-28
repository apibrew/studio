import {Resource} from "@apibrew/react";
import {Box, Drawer} from "@mui/material";
import CodeEditor from '@uiw/react-textarea-code-editor';
import {useState} from "react";

export interface ApiDocModalProps {
    open: boolean
    onClose: () => void
    resource: Resource
}

export function ApiDocModal(props: ApiDocModalProps) {
    const [code, setCode] = useState(
        `function add(a, b) {\n  return a + b;\n}`
    );

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
