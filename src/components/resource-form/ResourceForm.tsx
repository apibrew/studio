import {Resource} from "@apibrew/react";
import {FormControl, Stack, TextField} from "@mui/material";

export interface ResourceFormProps {
    resource: Resource
    onChange: (Resource: Resource) => void
}

export function ResourceForm(props: ResourceFormProps) {
    return (
        <Stack spacing={2}>
            <FormControl fullWidth>
                <TextField
                    value={props.resource.name}
                    label='Name'
                    variant='filled'
                    onChange={(event) => {
                        props.onChange({
                            ...props.resource,
                            name: event.target.value
                        })
                    }}/>
            </FormControl>
            <FormControl fullWidth>
                <TextField
                    value={props.resource.title}
                    label='Title'
                    variant='filled'
                    onChange={(event) => {
                        props.onChange({
                            ...props.resource,
                            title: event.target.value
                        })
                    }}/>
            </FormControl>
            <FormControl fullWidth>
                <TextField
                    value={props.resource.description}
                    label='Description'
                    variant='filled'
                    onChange={(event) => {
                        props.onChange({
                            ...props.resource,
                            description: event.target.value
                        })
                    }}/>
            </FormControl>
        </Stack>
    )
}