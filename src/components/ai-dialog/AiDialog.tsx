import * as React from 'react';
import {useEffect, useState} from 'react';
import Stack from '@mui/material/Stack';
import TrapFocus from '@mui/material/Unstable_TrapFocus';
import Paper from '@mui/material/Paper';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {TextField} from "@mui/material";
import {Message, MessageEntityInfo, Role} from "./model/message";
import {Direction, useRecords, useRepository, useWatcher} from "@apibrew/react";
import {LoadingOverlay} from "../LoadingOverlay";
import {Chat} from "./model/chat";

export interface AiDialogProps {
    applyItems: (items: any[]) => void;
}

export default function AiDialog(props: AiDialogProps) {
    const [bannerOpen, setBannerOpen] = React.useState(true);
    const [message, setMessage] = useState<Message>({
        text: '',
        role: 'USER',
    } as Message);

    const wi = useWatcher(MessageEntityInfo)
    const repository = useRepository<Message>(MessageEntityInfo)

    const messages = useRecords<Message>(MessageEntityInfo, {
        sorting: [
            {
                property: 'order',
                direction: Direction.ASC,
            }
        ]
    }, wi)

    const send = () => {
        let order = messages?.length ? messages[messages.length - 1].order + 1 : 1;
        repository.create({
            ...message,
            order: order,
            chat: {
                id: 'df3a0911-f77e-494a-9f02-f4542206a232'
            } as Chat
        })

        setMessage({...message, text: ''})
    };

    const reset = () => {
        messages?.forEach(message => {
            repository.delete(message.id)
        })
    };

    let currentYaml = ``

    const assistantMessages = messages?.filter(message => message.role === 'ASSISTANT')

    if (assistantMessages && assistantMessages.length > 0) {
        currentYaml = assistantMessages[assistantMessages.length - 1].text
    }

    useEffect(() => {
        if (currentYaml) {
            const items = currentYaml.split('---')

            props.applyItems(items.map(item => JSON.parse(item)))
        }
        console.log(currentYaml)
    }, [currentYaml]);

    return (
        <React.Fragment>
            <TrapFocus open disableAutoFocus disableEnforceFocus>
                <Fade appear={false} in={bannerOpen}>
                    <Paper
                        role="dialog"
                        aria-modal="false"
                        aria-label="Cookie banner"
                        square
                        variant="outlined"
                        tabIndex={-1}
                        sx={{
                            position: 'fixed',
                            bottom: 0,
                            right: 0,
                            width: '500px',
                            height: '500px',
                            display: 'flex',
                            flexDirection: 'column',
                            m: 0,
                            p: 2,
                            borderWidth: 0,
                            borderTopWidth: 1,
                        }}>
                        <Stack
                            direction={{xs: 'column', sm: 'column'}}
                            justifyContent="space-between"
                            height="100%"
                            gap={2}
                        >
                            <Box
                                sx={{
                                    flexShrink: 1,
                                    alignSelf: {sm: 'center'},
                                }}
                            >
                                <Typography fontWeight="bold">AI Engine for ApiBrew</Typography>
                            </Box>

                            {!messages && <LoadingOverlay/>}
                            {messages && <Stack
                                gap={2}
                                direction={{
                                    xs: 'column',
                                    sm: 'column',
                                }}
                                sx={{
                                    overflowY: 'auto',
                                    maxHeight: '100%',
                                }}
                            >
                                {messages.filter(item => item.role === Role.USER).map((message, index) => {
                                    return <Box key={index}>
                                        <Typography>
                                            {message.text}
                                        </Typography>
                                    </Box>
                                })}
                            </Stack>}

                            <Box flexGrow={1}/>
                            <Box>
                                <TextField value={message.text} onChange={e => {
                                    setMessage({...message, text: e.target.value})
                                }} fullWidth={true}/>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={send}
                                >
                                    Send
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={reset}
                                >
                                    Reset
                                </Button>
                            </Box>
                        </Stack>
                    </Paper>
                </Fade>
            </TrapFocus>
        </React.Fragment>
    );
}