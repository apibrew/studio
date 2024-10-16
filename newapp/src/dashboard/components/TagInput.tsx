import {Box, BoxProps, IconButton, Popover, TextField, TextFieldProps, Typography} from "@mui/material";
import {label} from "../../util/record";
import {Add, Edit, Remove} from "@mui/icons-material";
import {useEffect, useRef, useState} from "react";
import Button from "@mui/material/Button";

export interface TagInputProps<T> {
    value: T[] | undefined
    onChange: (value: T[]) => void
    autoOpen?: boolean
    onClose?: () => void
    inputPros: TextFieldProps
    sx?: BoxProps['sx']
}

export function TagInput(props: TagInputProps<unknown>) {
    const ref = useRef(null)

    const [open, setOpen] = useState<boolean | undefined>()

    const [newValue, setNewValue] = useState('')

    useEffect(() => {
        if (props.autoOpen) {
            setOpen(true)
        }
    }, []);

    return (
        <Box sx={props.sx} ref={ref}
             display='flex'
             flexDirection='row'>
            <span style={{
                padding: '3px'

            }}>
                {props.value?.map((item: any) => label(item)).join('; ')}
            </span>
            <Box flexGrow={1}/>
            {<IconButton
                size='small'
                onClick={(_) => {
                    setOpen(true)
                }}>
                <Edit fontSize='small'/>
            </IconButton>}

            {ref.current && <Popover
                open={Boolean(open)}
                anchorEl={ref.current}
                onClose={() => {
                    setOpen(false)
                    props.onClose?.()
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Box style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '20px',
                    width: '250px',
                    height: '300px'
                }}>
                    <table>
                        <tbody>
                        {props.value?.map((item: any, index) => (
                            <tr key={index}>
                                <td>
                                    <Typography textAlign='left'>{label(item)}</Typography>
                                </td>
                                <td>
                                    <IconButton
                                        onClick={() => {
                                            props.onChange(props.value?.filter((i: any) => i !== item) || [])
                                        }}
                                        size='small'>
                                        <Remove fontSize='small'/>
                                    </IconButton>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <Box flexGrow={1}/>
                    <Box>
                        <TextField
                            size='small'
                            {...props.inputPros}
                            value={newValue}
                            onChange={(e) => {
                                setNewValue(e.target.value)
                            }}
                        />
                        <IconButton
                            onClick={() => {
                                props.onChange([...(props.value || []), newValue])
                                setNewValue('')
                            }}
                            sx={{
                                marginTop: '5px'
                            }}>
                            <Add/>
                        </IconButton>
                    </Box>
                    <Button sx={{
                        marginTop: '5px'
                    }} onClick={() => {
                        setOpen(false)
                        props.onClose?.()
                    }}>Done</Button>
                </Box>
            </Popover>}
        </Box>
    )
}
