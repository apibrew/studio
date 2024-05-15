import {Box, MenuItem, Select, Stack, TextField} from "@mui/material";
import {MonacoNanoForm} from "../nano-form/MonacoNanoForm.tsx";
import {CronJob} from "@apibrew/client/nano/model/cron-job";

export interface NanoCronJobFormProps {
    value: CronJob
    onChange: (value: CronJob) => void
}

export function NanoCronJobForm(props: NanoCronJobFormProps) {
    return <Box width='80vw'>
        <Stack mb={2} direction='row' justifyContent='space-between' spacing={2}>
            <TextField
                size='small'
                value={props.value.name ?? ''}
                style={{marginLeft: '1rem', width: '400px', marginTop: '-14px'}}
                onChange={e => {
                    props.onChange({
                        ...props.value,
                        name: e.target.value
                    })
                }}
                label='Name'
                variant='standard'
            />
            <TextField
                size='small'
                value={props.value.expression ?? ''}
                style={{marginLeft: '1rem', width: '400px', marginTop: '-14px'}}
                onChange={e => {
                    props.onChange({
                        ...props.value,
                        expression: e.target.value
                    })
                }}
                label='Expression'
                variant='standard'
            />
            <Select sx={{
                width: '300px',
                marginRight: '1rem'
            }}
                    size='small'
                    value={props.value.language || 'JAVASCRIPT'}
                    onChange={e => {
                        props.onChange({
                            ...props.value,
                            language: e.target.value as any
                        })
                    }}>
                <MenuItem value='JAVASCRIPT'>JavaScript</MenuItem>
                <MenuItem value='TYPESCRIPT'>Typescript</MenuItem>
            </Select>
        </Stack>
        <a target='_blank' href='https://crontab.guru/'>See example expressions</a>
        <Stack mt={2} direction='row' justifyContent='space-between'>
            <TextField
                size='small'
                value={props.value.lastExecutionTime ?? ''}
                disabled
                style={{marginLeft: '1rem', width: '400px', marginTop: '-14px'}}
                label='Last Execution Time'
                variant='standard'
            />
            <TextField
                size='small'
                value={props.value.lastExecutionError ?? ''}
                disabled
                style={{marginLeft: '1rem', width: '400px', marginTop: '-14px'}}
                label='Last Execution Error'
                variant='standard'
            />
        </Stack>
        <Box mt={3}>
            <MonacoNanoForm code={props.value.source}
                            language={props.value.language}
                            height='500px'
                            onChange={updated => {
                                props.onChange({
                                    ...props.value,
                                    source: updated
                                })
                            }}/>
        </Box>
    </Box>
}
