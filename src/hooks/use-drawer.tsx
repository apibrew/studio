import React, {ReactNode} from "react";
import {Drawer} from "@mui/material";


export interface useDrawerResult {
    render(): ReactNode

    open: (content: React.ReactNode) => void
    close: () => void
}

export function useDrawer(): useDrawerResult {
    const [open, setOpen] = React.useState<boolean>(false)
    const [content, setContent] = React.useState<React.ReactNode>()

    return {
        render: () => {
            return <>
                <Drawer
                    onClose={() => {
                        setOpen(false)
                        setContent(undefined)
                    }}
                    anchor='right'
                    open={open}
                    variant='temporary'>{content}</Drawer>
            </>
        },
        open: (content: React.ReactNode) => {
            setOpen(true)
            setContent(content)
        },
        close: () => {
            setOpen(false)
            setContent(undefined)
        }
    }
}