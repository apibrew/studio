import {Code} from "@apibrew/client/nano/model/code";
import {Box, MenuItem, Select, Stack, TextField} from "@mui/material";
import {MonacoNanoForm} from "./MonacoNanoForm.tsx";

export interface NanoForm2Props {
    value: Code
    onChange: (value: Code) => void
}

export function NanoForm2(props: NanoForm2Props) {
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
            <MonacoNanoForm code={props.value.content}
                            language={props.value.language}
                            onChange={updated => {
                                props.onChange({
                                    ...props.value,
                                    content: updated
                                })
                            }}/>
        </Box>
    </Box>
}
