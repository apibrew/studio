import {Checkbox, FormControl, FormLabel, Stack, TextField} from "@mui/material";
import {PropertyTypeDropdown} from "../PropertyTypeDropdown";
import {Type} from "@apibrew/client/model/resource";
import React from "react";
import {Property} from "@apibrew/client/model";
import {Resource} from "@apibrew/react";
import {PropertyExtras} from "./PropertyExtras";

export interface PropertyFormProps {
    resource: Resource
    new: boolean
    propertyName: string
    onChangeName: (propertyName: string) => void
    property: Property;
    onChange: (property: Property) => void
}

export function PropertyForm(props: PropertyFormProps) {
    return (
        <Stack spacing={2}>
            <FormControl fullWidth>
                <TextField
                    value={props.propertyName}
                    label='Name'
                    disabled={!props.new}
                    variant='filled'
                    onChange={(event) => {
                        props.onChangeName(event.target.value)
                    }}/>
            </FormControl>
            <FormControl fullWidth>
                <PropertyTypeDropdown
                    value={props.property.type}
                    label='Type'
                    title='Type'
                    variant='filled'
                    onChange={(event) => {
                        props.onChange({
                            ...props.property,
                            type: event.target.value as Type
                        })
                    }}/>
            </FormControl>
            {<PropertyExtras
                resource={props.resource}
                property={props.property}
                onChange={props.onChange}/>}
            <FormControl fullWidth>
                <TextField
                    value={props.property.title || ''}
                    label='Title'
                    variant='filled'
                    onChange={(event) => {
                        props.onChange({
                            ...props.property,
                            title: event.target.value
                        })
                    }}/>
            </FormControl>
            <FormControl fullWidth>
                <TextField
                    value={props.property.description}
                    label='Description'
                    variant='filled'
                    onChange={(event) => {
                        props.onChange({
                            ...props.property,
                            description: event.target.value
                        })
                    }}/>
            </FormControl>
            <Stack spacing={1} direction='row'>
                <FormControl>
                    <FormLabel>Required</FormLabel>
                    <Checkbox
                        sx={{
                            display: 'inline-block'
                        }}
                        checked={props.property.required}
                        onChange={(event) => {
                            props.onChange({
                                ...props.property,
                                required: event.target.checked
                            })
                        }}/>
                </FormControl>
                <FormControl>
                    <FormLabel>Immutable</FormLabel>
                    <Checkbox
                        sx={{
                            display: 'inline-block'
                        }}
                        checked={props.property.immutable}
                        onChange={(event) => {
                            props.onChange({
                                ...props.property,
                                immutable: event.target.checked
                            })
                        }}/>
                </FormControl>
                <FormControl>
                    <FormLabel>Unique</FormLabel>
                    <Checkbox
                        sx={{
                            display: 'inline-block'
                        }}
                        checked={props.property.unique}
                        onChange={(event) => {
                            props.onChange({
                                ...props.property,
                                unique: event.target.checked
                            })
                        }}/>
                </FormControl>
            </Stack>
        </Stack>
    )
}