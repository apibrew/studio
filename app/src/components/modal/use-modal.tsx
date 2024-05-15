import {useState} from "react";
import {Modal} from "@mui/material";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

type Size = 'sm' | 'md' | 'lg'

export interface useModalResult {
    open: (content: JSX.Element, size?: Size) => void
    close: () => void

    render: () => JSX.Element
}

export function useModal(): useModalResult {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState<JSX.Element>();
    const [size, setSize] = useState<'sm' | 'md' | 'lg'>('sm');

    return {
        open: (content: JSX.Element, size: Size = 'sm') => {
            setContent(content);
            setIsOpen(true);
            setSize(size);
        },
        close: () => setIsOpen(false),
        render: () => (
            <Modal open={isOpen}
                   onClose={() => setIsOpen(false)}>
                <Box
                    sx={{
                        // backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.100'),
                        p: 3,
                    }}
                >
                    <Container maxWidth={size}>
                        <Paper elevation={12}>
                            {content ? content : <div/>}
                        </Paper>
                    </Container>
                </Box>
            </Modal>
        )
    }
}

