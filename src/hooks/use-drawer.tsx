import React, {ReactNode} from "react";
import {Drawer} from "@mui/material";
import toast from "react-hot-toast";


export interface useDrawerResult {
    render(): ReactNode

    open: (content: React.ReactNode, options?: ModalOptions) => void
    close: () => void
}

export interface ModalOptions {
    allowClose?: boolean
}

export function useDrawer(): useDrawerResult {
    const [open, setOpen] = React.useState<boolean>(false)
    const [content, setContent] = React.useState<React.ReactNode>()
    const [options, setOptions] = React.useState<ModalOptions>({allowClose: true})

    return {
        render: () => {
            return <>
                <Drawer
                    onClose={() => {
                        if (options.allowClose) {
                            setOpen(false)
                            setContent(undefined)
                        } else {
                            toast.error('This modal cannot be closed outside')
                        }
                    }}
                    anchor='right'
                    open={open}
                    variant='temporary'>{content}</Drawer>
            </>
        },
        open: (content: React.ReactNode, options?: ModalOptions) => {
            setOpen(true)
            setContent(content)
            if (options) {
                setOptions(options)
            }
        },
        close: () => {
            setOpen(false)
            setContent(undefined)
        }
    }
}
