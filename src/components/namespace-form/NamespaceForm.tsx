import {Namespace} from "@apibrew/react";
import {FormControl, Stack, TextField} from "@mui/material";

export interface NamespaceFormProps {
    namespace: Namespace
    onChange: (namespace: Namespace) => void
}

export function NamespaceForm(props: NamespaceFormProps) {
    return (
        <Stack spacing={2}>
            <FormControl fullWidth>
                <TextField
                    value={props.namespace.name}
                    label='Name'
                    variant='filled'
                    onChange={(event) => {
                        props.onChange({
                            ...props.namespace,
                            name: event.target.value
                        })
                    }}/>
            </FormControl>
            <FormControl fullWidth>
                <TextField
                    value={props.namespace.description}
                    label='Description'
                    variant='filled'
                    onChange={(event) => {
                        props.onChange({
                            ...props.namespace,
                            description: event.target.value
                        })
                    }}/>
            </FormControl>
        </Stack>
    )
}