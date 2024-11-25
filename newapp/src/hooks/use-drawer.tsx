import {ReactNode, useState} from "react";
import {Drawer} from "@mui/material";
import toast from "react-hot-toast";


export interface useDrawerResult {
    render(): ReactNode

    open: (content: ReactNode, options?: ModalOptions) => void
    close: () => void
}

export interface ModalOptions {
    allowClose?: boolean
}

export function useDrawer(): useDrawerResult {
    const [open, setOpen] = useState<boolean>(false)
    const [content, setContent] = useState<ReactNode>()
    const [options, setOptions] = useState<ModalOptions>({allowClose: false})

    return {
        render: () => {
            return <>
                <Drawer
                    onClose={() => {
                        if (options.allowClose) {
                            setOpen(false)
                            setContent(undefined)
                        } else {
                            toast.error('Please press the close button to close the drawer')
                        }
                    }}
                    anchor='right'
                    open={open}
                    >{content}</Drawer>
            </>
        },
        open: (content: ReactNode, options?: ModalOptions) => {
            setOpen(true)
            setContent(content)
            if (options) {
                setOptions(options)
            }
        },
        close: () => {
            setOpen(false)
        }
    }
}
