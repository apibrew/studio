import {Thread, ThreadEntityInfo} from "./model/thread.ts";
import {Box, Button, TextField} from "@mui/material";
import {Direction, useRepository} from "@apibrew/react";
import {Message, MessageEntityInfo} from "./model/message.ts";
import {LoadingOverlay} from "common";
import {Fragment, useEffect, useState} from "react";
import {Run, RunEntityInfo} from "./model/run.ts";
import Markdown from 'react-markdown'


export interface ChatProps {
    thread: Thread
    onRefresh?: () => void
}

export function Chat(props: ChatProps) {
    const [thread, setThread] = useState<Thread>(props.thread)
    const [newMessage, setNewMessage] = useState<string>('')
    const repository = useRepository<Message>(MessageEntityInfo)
    const runRepository = useRepository<Run>(RunEntityInfo)
    const [messages, setMessages] = useState<Message[] | undefined>(undefined)
    const [responding, setResponding] = useState<boolean>(false)

    const threadRepository = useRepository<Thread>(ThreadEntityInfo)

    function loadMessages(clear: boolean = true) {
        if (clear) {
            setMessages(undefined)
        }
        repository.list({
            filters: {
                thread: thread.id
            },
            sorting: [
                {
                    property: 'auditData.createdOn',
                    direction: Direction.ASC,
                }
            ]
        }).then(resp => resp.content).then(setMessages)
    }

    useEffect(() => {
        setThread(props.thread)
    }, [props.thread.id]);

    useEffect(() => {
        loadMessages();
    }, [thread.id]);

    if (!messages) {
        return <LoadingOverlay/>
    }

    async function awaitRun(run: Run) {
        await delay(150)

        for (let i = 0; i < 100; i++) {
            const r = await runRepository.update(run)
            if (r.status === 'completed') {
                break
            }
            await delay(500)
        }

        loadMessages()
    }

    async function sendMessage() {
        setResponding(true)
        await repository.create({
            thread: thread,
            content: newMessage,
            role: 'user',
            owner: thread.owner,
        } as Message)
        setNewMessage('')
        loadMessages(false)

        const run = await runRepository.create({
            thread: thread,
            owner: thread.owner,
            status: 'pending',
        } as Run)

        await awaitRun(run)
        setResponding(false)
    }

    async function renameThread() {
        await threadRepository.update(thread)
        if (props.onRefresh) {
            props.onRefresh()
        }
    }

    return (
        <Box sx={{
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            padding: '10px'
        }}>
            <Box display='flex' mb={1}>
                <TextField
                    placeholder='Type thread name here...'
                    size='small'
                    value={thread.title || ''}
                    onChange={e => {
                        setThread({
                            ...thread,
                            title: e.target.value
                        })

                    }} fullWidth/>
                {props.thread.title != thread.title && <Fragment>
                    <Button onClick={() => {
                        renameThread()
                    }}>
                        Rename
                    </Button>
                </Fragment>}
            </Box>

            <Box className='ask-ai-chat' flexGrow={1} overflow='scroll' height='1px'>
                {messages.map((message, index) => (
                    <Box key={message.id}
                         ref={index === messages.length - 1 ? (el: HTMLDivElement) => el?.scrollIntoView() : undefined}
                         sx={{
                             padding: '10px',
                             backgroundColor: message.role === 'user' ? 'rgb(205, 230, 235)' : 'transparent',
                             marginBottom: '10px',
                         }}>
                        <Box mb={3} display='flex' width='100%' justifyContent='space-between'>
                            <span>
                                <b>{message.role}</b>
                            </span>
                            <span>
                                <b>{message.auditData.createdOn}</b>
                            </span>
                        </Box>
                        <div style={{
                            textWrap: 'wrap',
                        }}>
                            <Markdown>{message.content}</Markdown>
                        </div>
                    </Box>
                ))}
            </Box>
            {responding && <>Loading...</>}
            <Box display='flex'>
                <TextField value={newMessage} onChange={e => {
                    setNewMessage(e.target.value)
                }} fullWidth/>
                <Button sx={{
                    marginLeft: '10px',
                    marginRight: '10px',
                }} variant='contained' size='small' onClick={() => sendMessage()} color='success'>Send</Button>
            </Box>
        </Box>
    )
}

async function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
