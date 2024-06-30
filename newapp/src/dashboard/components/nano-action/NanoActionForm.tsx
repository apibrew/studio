import {Box, MenuItem, Select, Stack, TextField} from "@mui/material";
import {MonacoNanoForm} from "../nano-form/MonacoNanoForm.tsx";
import {Action} from "@apibrew/client/nano/model/action";

export interface NanoForm2Props {
    value: Action
    onChange: (value: Action) => void
}

export function NanoActionForm(props: NanoForm2Props) {
    return <Box width='80vw'>
        <Stack direction='row' justifyContent='space-between'>
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
                value={props.value.restPath ?? ''}
                style={{marginLeft: '1rem', width: '400px', marginTop: '-14px'}}
                onChange={e => {
                    props.onChange({
                        ...props.value,
                        restPath: e.target.value
                    })
                }}
                label='Rest Path'
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
        <Box mt={3}>
            <MonacoNanoForm code={props.value.source}
                            language={props.value.language}
                            onChange={updated => {
                                props.onChange({
                                    ...props.value,
                                    source: updated
                                })
                            }}/>
        </Box>
    </Box>
}
