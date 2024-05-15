import {Stack, TextField} from "@mui/material";

import {SubType} from "@apibrew/client/model/resource";

export interface ResourceFormProps {
    subType: SubType
    onChange: (subType: SubType) => void
}

export function SubTypesForm(props: ResourceFormProps) {
    return (
        <Stack spacing={2}>
            <TextField
                size='small'
                fullWidth
                label='Name'
                variant='outlined'
                value={props.subType.name ?? ''}
                onChange={(event) => {
                    props.onChange({
                        ...props.subType,
                        name: event.target.value
                    })
                }}/>
            <br/>
            <TextField
                size='small'
                fullWidth
                label='Title'
                variant='outlined'
                value={props.subType.title ?? ''}
                onChange={(event) => {
                    props.onChange({
                        ...props.subType,
                        title: event.target.value
                    })
                }}/>
            <br/>
            <TextField
                size='small'
                fullWidth
                multiline={true}
                rows={3}
                label='Description'
                variant='outlined'
                value={props.subType.description ?? ''}
                onChange={(event) => {
                    props.onChange({
                        ...props.subType,
                        description: event.target.value
                    })
                }}/>
            <br/>
        </Stack>
    )
}
