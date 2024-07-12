import {TextField} from "@mui/material";

export interface InputConfig {
    name: string
    type: string
    label: string
}

export interface UserInputGroupProps<T> {
    value: T
    onChange: (value: T) => void
    inputs: InputConfig[]
}

export function UserInputGroup<T>(props: UserInputGroupProps<T>) {
    return (
        <div>
            {props.inputs.map(input => (
                <TextField key={input.name}
                           type={input.type}
                           label={input.label}
                           value={(props.value)[input.name] as string || ''}
                           onChange={e => {
                               props.onChange({
                                   ...props.value,
                                   [input.name]: e.target.value
                               })
                           }}/>
            ))}
        </div>
    )
}
