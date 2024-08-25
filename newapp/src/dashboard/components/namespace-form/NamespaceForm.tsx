import {Namespace} from "@apibrew/react";
import {FormControl, Stack, TextField} from "@mui/material";

export interface NamespaceFormProps {
    value: Namespace
    onChange: (namespace: Namespace, isValid: boolean) => void
}

const namespaceNameRegex = /^[a-z][a-z0-9-]{2,}$/;

export function NamespaceForm(props: NamespaceFormProps) {
    function validate(namespace: Namespace): boolean {
        return namespaceNameRegex.test(namespace.name)
    }

    return (
        <Stack spacing={2}>
            <FormControl fullWidth>
                <TextField
                    value={props.value.name}
                    label='Name'
                    variant='outlined'
                    disabled={props.value.id !== undefined}
                    error={!namespaceNameRegex.test(props.value.name)}
                    onChange={(event) => {
                        props.onChange({
                            ...props.value,
                            name: event.target.value
                        }, validate(props.value))
                    }}/>
            </FormControl>
            <FormControl fullWidth>
                <TextField
                    value={props.value.description}
                    label='Description'
                    variant='outlined'
                    onChange={(event) => {
                        props.onChange({
                            ...props.value,
                            description: event.target.value
                        }, validate(props.value))
                    }}/>
            </FormControl>
        </Stack>
    )
}
