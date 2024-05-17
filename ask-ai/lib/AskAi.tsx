import {useRecords, useRepository} from "@apibrew/react";
import {Thread, ThreadEntityInfo} from "./model/thread.ts";
import {useState} from "react";
import {Instance} from "./model/instance.ts";
import {Box, Button, IconButton, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import {Chat} from "./Chat.tsx";
import {toast} from "react-hot-toast";
import './reset.scss'
import {Delete} from "@mui/icons-material";

export interface AskAi {
    instance: Instance
}

export function AskAi(props: AskAi) {
    const [wi, setWi] = useState<number>(0)
    const [activeThread, setActiveThread] = useState<Thread>()

    const threads = useRecords<Thread>(ThreadEntityInfo, {
        filters: {
            instance: props.instance.id,
            deleted: "false",
        }
    }, wi)

    const threadRepository = useRepository<Thread>(ThreadEntityInfo)

    if (!threads) {
        return <div>Loading...</div>
    }

    function reload() {
        setWi(wi + 1)
        setActiveThread(undefined)
    }

    async function newThread() {
        await toast.promise(threadRepository.create({
            instance: props.instance,
            owner: props.instance.owner,
            assistant: {
                id: 'cd835936-8907-4759-8711-7dfb3d8e1ddd',
            },
            title: 'new thread-' + randomHex(6),
            deleted: false,
        } as Thread), {
            loading: 'Creating new thread...',
            success: 'Thread created',
            error: 'Failed to create thread',
        })

        setWi(wi + 1)
    }

    function handleDeleteThread(thread: Thread) {
        toast.promise(threadRepository.update({
            ...thread,
            deleted: true,
        }), {
            loading: 'Deleting thread...',
            success: 'Thread deleted',
            error: 'Failed to delete thread',
        }).then(() => {
            setWi(wi + 1)
        })
    }

    return (
        <Box display='flex' flex='1'>
            <Box display='flex' flexDirection='column' flex='0 0 300px'>
                <Box m={3} mb={0}>
                    <Button variant='text' onClick={() => reload()}>Refresh</Button>
                    <Button variant='text' sx={{
                        ml: '8px'
                    }} onClick={() => newThread()}>New Thread</Button>
                </Box>
                <List>
                    {threads.map(item => (
                        <ListItem sx={{
                            backgroundColor: activeThread === item ? 'rgb(205, 230, 235)' : 'transparent',
                            '&:hover': {
                                backgroundColor: 'rgb(205, 230, 235)',
                            }
                        }} key={item.name}>
                            <ListItemButton onClick={() => {
                                setActiveThread(item)
                            }}>
                                <ListItemText primary={item.title ?? item.name}/>
                            </ListItemButton>
                            <IconButton>
                                <Delete onClick={() => {
                                    handleDeleteThread(item)
                                }}/>
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box display='flex' flexGrow={1}>
                {activeThread && <>
                    <Chat thread={activeThread} onRefresh={() => {
                        reload()
                    }}/>
                </>}
            </Box>
        </Box>
    )
}

function randomHex(n: number) {
    return [...Array(n)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')
}
