import {Annotations} from "../../util/annotation";
import {Box, IconButton, TextField} from "@mui/material";
import {Add, Remove} from "@mui/icons-material";

export interface AnnotationsFormProps {
    value?: Annotations
    onChange: (annotations?: Annotations) => void
}

export function AnnotationsForm(props: AnnotationsFormProps) {
    const annotations: { [key: string]: string } = props.value || {}

    const obj = props.value as any || {}

    const keys = Object.keys(obj)

    return <Box>
        {keys.map((key, index) => {
            const value = obj[key]
            return (
                <Box
                    display='flex'
                    key={index}>
                    <Box>
                        <IconButton className='cell-hand unselectable'
                             style={{
                                 color: 'red'
                             }}
                             onClick={() => {
                                 const updatedObj = {...obj}

                                 delete (updatedObj[key])

                                 props.onChange(updatedObj)
                             }}>
                            <Remove/>
                        </IconButton>
                    </Box>
                    <Box display='flex'>
                        <TextField
                            fullWidth
                            sx={{
                                margin: 0,
                                padding: 0,
                                display: 'inline-block',
                                verticalAlign: 'bottom',
                                '& .MuiInput-input': {
                                    padding: 0,
                                    margin: 0,
                                }
                            }}
                            value={key || ''}
                            variant='standard'
                            onChange={e => {
                                if (e.target.value === key) {
                                    return
                                }

                                const updatedObj = {...obj}

                                delete (updatedObj[key])
                                updatedObj[e.target.value] = value

                                props.onChange(updatedObj)
                            }}
                        />
                        <span>:</span>
                        <TextField
                            fullWidth
                            sx={{
                                margin: 0,
                                padding: 0,
                                display: 'inline-block',
                                verticalAlign: 'bottom',
                                '& .MuiInput-input': {
                                    padding: 0,
                                    margin: 0,
                                }
                            }}
                            value={value || ''}
                            variant='standard'
                            onChange={e => {
                                const updatedObj = {...obj}

                                updatedObj[key] = e.target.value

                                props.onChange(updatedObj)
                            }}
                        />
                    </Box>
                </Box>)
        })}
        <IconButton
            className='unselectable cell-hand'
            onClick={() => {
                props.onChange({
                    ...obj,
                    'new-key': undefined
                })
            }}
            style={{
                color: 'green'
            }}>
            <Add/>
        </IconButton>
    </Box>
}