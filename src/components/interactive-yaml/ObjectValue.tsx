import {PropertyValueProps} from "./PropertyValue";
import {TextField} from "@mui/material";
import {useState} from "react";
import toast from "react-hot-toast";

export function ObjectValue(props: PropertyValueProps) {
    const [value, setValue] = useState<string>(JSON.stringify(props.value))

    return <TextField
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
        value={value}
        variant='standard'
        onChange={e => {
            setValue(e.target.value)
        }}
        onBlur={e => {
            try {
                props.onChange(JSON.parse(e.target.value))
            } catch (e: any) {
                toast.error('Invalid JSON: ', e.message)
            }
        }}
    />
}