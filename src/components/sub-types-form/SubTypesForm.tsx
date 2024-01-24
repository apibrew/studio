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
                fullWidth
                label='Name'
                variant='filled'
                value={props.subType.name ?? ''}
                onChange={(event) => {
                    props.onChange({
                        ...props.subType,
                        name: event.target.value
                    })
                }}/>
            <br/>
            <TextField
                fullWidth
                label='Title'
                variant='filled'
                value={props.subType.title ?? ''}
                onChange={(event) => {
                    props.onChange({
                        ...props.subType,
                        title: event.target.value
                    })
                }}/>
            <br/>
            <TextField
                fullWidth
                label='Description'
                variant='filled'
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