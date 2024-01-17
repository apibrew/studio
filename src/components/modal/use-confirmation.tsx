import React from "react";
import {useModal} from "./use-modal";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {CrisisAlertOutlined} from "@mui/icons-material";

export type ConfirmationKind = 'info' | 'confirm' | 'danger'

export interface ConfirmationOptions {
    kind: ConfirmationKind
    title?: string | React.JSX.Element
    message: string | React.JSX.Element
    onConfirm: () => void
    buttonMessage?: string
}

export interface useConfirmationResult {
    open: (options: ConfirmationOptions) => void
    close: () => void
    render: () => React.JSX.Element
}

export function useConfirmation(): useConfirmationResult {
    const modal = useModal()

    return {
        open: (options: ConfirmationOptions) => {
            modal.open(<>
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        display: 'flex',
                        p: 3,
                    }}
                >
                    <Avatar
                        sx={{
                            backgroundColor: 'error.lightest',
                            color: 'error.main',
                        }}
                    >
                        <SvgIcon>
                            <CrisisAlertOutlined/>
                        </SvgIcon>
                    </Avatar>
                    <div>
                        <Typography variant="h5">{options.title ?? 'Are you sure?'}</Typography>
                        <Typography
                            color="text.secondary"
                            sx={{mt: 1}}
                            variant="body2"
                        >
                            {options.message}
                        </Typography>
                    </div>
                </Stack>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        pb: 3,
                        px: 3,
                    }}
                >
                    <Button
                        color="inherit"
                        sx={{mr: 2}}
                        onClick={() => modal.close()}
                    >
                        Cancel
                    </Button>
                    <Button
                        sx={{
                            backgroundColor: 'error.main',
                            '&:hover': {
                                backgroundColor: 'error.dark',
                            },
                        }}
                        variant="contained"
                        onClick={() => {
                            options.onConfirm()
                            modal.close()
                        }}
                    >
                        {options.buttonMessage ?? 'Okay'}
                    </Button>
                </Box>
            </>)
        },
        close: modal.close,
        render: modal.render
    }
}

