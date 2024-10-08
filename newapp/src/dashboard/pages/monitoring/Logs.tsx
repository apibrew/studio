import {Box, FormLabel, MenuItem, Select, Stack} from "@mui/material";
import {useEffect, useMemo, useState} from "react";
import {ApiException, useClient} from "@apibrew/react";
import toast from "react-hot-toast";
import './Logs.scss'
import {useSearchParams} from "react-router-dom";

export interface Log {
    fields: { [key: string]: string }
    time: string
    level: string
    message: string
}

const logLevelMap: { [key: string]: number } = {
    "": -1,
    debug: 0,
    info: 1,
    warn: 2,
    warning: 2,
    error: 3,
    fatal: 4
}

export function LogsPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    const logLevel = searchParams.get('level') || 'debug'

    const [logs, setLogs] = useState<Log[]>([])
    const client = useClient()

    useEffect(() => {
        const controller = new AbortController()

        async function watchInternal() {
            let remeaining = ''
            while (!controller.signal.aborted) {
                try {
                    console.log('Starting watch')
                    const response = await fetch(
                        `${client.getUrl()}/_logs?format=json`,
                        {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'text/event-stream',
                                ...client.headers()
                            },
                            signal: controller.signal
                        }
                    )

                    if (!response.body) {
                        if (controller.signal.aborted) {
                            console.log('request aborted')
                            break
                        }

                        console.log('watcher no content')
                        break
                    }

                    const reader = response.body
                        .pipeThrough(new TextDecoderStream())
                        .getReader()

                    while (true) {
                        try {
                            const {value, done} = await reader.read()
                            if (done) {
                                console.log('watcher done')
                                break
                            }
                            if (!value) {
                                console.log('watcher no value')
                                break
                            }

                            if (response.status !== 200) {
                                throw ApiException.fromError(value)
                            }

                            const data = remeaining + value

                            const linesToAppend: Log[] = []
                            for (const line of data.split('\n')) {
                                if (!line) {
                                    continue
                                }

                                try {
                                    const log = JSON.parse(line)
                                    linesToAppend.push(log)
                                } catch (e) {
                                    remeaining = line
                                    break
                                }
                            }

                            setLogs((logs) => [...logs, ...linesToAppend])
                        } catch (e) {
                            console.error(e)
                            break
                        }
                    }
                } catch (e: any) {
                    console.error(e)

                    if (e instanceof DOMException) {
                        return
                    }

                    toast.error('Error watching logs: ' + e.message)
                } finally {
                    await new Promise((resolve) => setTimeout(resolve, 1000))
                }
            }
        }

        watchInternal().then(() => {
            console.log('Watch completed')
        })

        return () => {
            console.log('Aborting watch')
            controller.abort()
        }
    }, [logLevel])

    const fieldsMap: { [key: string]: string[] } = useMemo(() => {
        const result: { [key: string]: string[] } = {}
        for (const log of logs) {
            for (const key of Object.keys(log.fields)) {
                if (!result[key]) {
                    result[key] = []
                }
                if (result[key].indexOf(log.fields[key]) === -1) {
                    result[key].push(log.fields[key])
                }
            }
        }
        return result
    }, [logs])

    const fieldKeys = Object.keys(fieldsMap)

    fieldKeys.sort()

    return (
        <Box>
            <Stack direction='row' spacing={3} m={1}>
                <Box>
                    <FormLabel sx={{
                        marginRight: '5px'
                    }}>Level:</FormLabel>
                    <Select
                        size='small'
                        variant='standard'
                        sx={{
                            width: '150px'
                        }}
                        value={logLevel}
                        onChange={e => setSearchParams({
                            ...searchParams,
                            level: e.target.value
                        })}>
                        <MenuItem value=''>Any</MenuItem>
                        <MenuItem value='debug'>Debug</MenuItem>
                        <MenuItem value='info'>Info</MenuItem>
                        <MenuItem value='warn'>Warn</MenuItem>
                        <MenuItem value='error'>Error</MenuItem>
                        <MenuItem value='fatal'>Fatal</MenuItem>
                    </Select>
                </Box>
                {fieldKeys.map(field => <Box>
                    <FormLabel sx={{
                        marginRight: '5px'
                    }}>{field}:</FormLabel>
                    <Select
                        size='small'
                        variant='standard'
                        sx={{
                            width: '150px'
                        }}
                        value={searchParams.get(field) || ''}
                        onChange={e => {
                            setSearchParams({
                                ...searchParams,
                                [field]: e.target.value
                            })
                        }}>
                        <MenuItem value=''>Any</MenuItem>
                        {fieldsMap[field].map(value => <MenuItem value={value}>{value}</MenuItem>)}
                    </Select>
                </Box>)}
            </Stack>
            <Box m={2}>
                {logs.reverse()
                    .filter(item => {
                        for (const key of Object.keys(fieldsMap)) {
                            const fieldValue = searchParams.get(key)
                            if (fieldValue && item.fields[key] !== fieldValue) {
                                console.log('Filtering out', item.fields[key], fieldValue)
                                return false
                            }
                        }

                        return logLevelMap[item.level] >= logLevelMap[logLevel]
                    })
                    .map(item => <span className={'log-item log-level-' + item.level}>
                    <span className='time'>
                        {new Date(Date.parse(item.time)).toISOString()}
                    </span>
                    <span className='level'>
                     <b>{item.level}</b>
                    </span>
                    <span className='fields'>
                     {JSON.stringify(Object.keys(item.fields).map(key => `${key}: ${item.fields[key]}`))}
                    </span>
                    <span className='message'>
                        {item.message}
                    </span>
                    <br/>
                </span>)}
            </Box>
        </Box>
    )
}
