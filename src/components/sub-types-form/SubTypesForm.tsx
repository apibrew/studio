import {Box, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import {SubType} from "@apibrew/client/model/resource-action";

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