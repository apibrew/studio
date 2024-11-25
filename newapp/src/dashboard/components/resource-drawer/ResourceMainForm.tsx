import {Resource} from "@apibrew/react";
import {FormControl, FormHelperText, Stack, TextField, Tooltip} from "@mui/material";
import {ReferenceValueSelector} from "../ReferenceValueSelector";
import {useEffect} from "react";

export interface ResourceFormProps {
    value: Resource
    onChange: (Resource: Resource, isValid: boolean) => void
}

const resourceNameRegex = /^[A-Z][A-Za-z0-9-]{2,}$/;

export function ResourceMainForm(props: ResourceFormProps) {
    function validate(): boolean {
        if (!resourceNameRegex.test(props.value.name)) {
            return false
        }

        return true
    }

    useEffect(() => {
        props.onChange(props.value, validate())
    }, [props.value]);

    return (
        <Stack className="MD-mf-dv1" spacing={3}>
            <FormControl fullWidth>
                <Tooltip title={'Name must start with a capital letter and contain only letters, numbers and dashes. Minimum length is 3 characters.'}>
                <TextField
                    size='small'
                    value={props.value.name}
                    label='Name'
                    error={!resourceNameRegex.test(props.value.name)}
                    variant='outlined'
                    onChange={(event) => {
                        props.onChange({
                            ...props.value,
                            name: event.target.value
                        }, validate())
                    }}/>
                </Tooltip>
                <FormHelperText>
                    The name of the resource.
                </FormHelperText>
            </FormControl>
            <FormControl fullWidth>
                <ReferenceValueSelector
                    required={true}
                    reference={'system/Namespace'}
                    value={props.value.namespace}
                    onChange={namespace => {
                        props.onChange({
                            ...props.value,
                            namespace: namespace,
                        }, validate())
                    }}/>
                <FormHelperText>
                    Namespace of the resource.
                </FormHelperText>
            </FormControl>
            <FormControl fullWidth>
                <TextField
                    size='small'
                    value={props.value.title}
                    label='Title'
                    variant='outlined'
                    onChange={(event) => {
                        props.onChange({
                            ...props.value,
                            title: event.target.value
                        }, validate())
                    }}/>
                <FormHelperText>
                    The title of the resource.
                </FormHelperText>
            </FormControl>
            <FormControl fullWidth>
                <TextField
                    size='small'
                    value={props.value.description}
                    multiline={true}
                    rows={3}
                    label='Description'
                    variant='outlined'
                    onChange={(event) => {
                        props.onChange({
                            ...props.value,
                            description: event.target.value
                        }, validate())
                    }}/>
                <FormHelperText>
                    The description of the resource.
                </FormHelperText>
            </FormControl>
        </Stack>
    )
}
