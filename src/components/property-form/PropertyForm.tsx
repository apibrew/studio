import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Checkbox,
    FormControl,
    FormHelperText,
    FormLabel,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {PropertyTypeDropdown} from "../PropertyTypeDropdown";
import {Type} from "@apibrew/client/model/resource";
import React from "react";
import {Property} from "@apibrew/client/model";
import {Resource} from "@apibrew/react";
import {PropertyExtras} from "./PropertyExtras";
import {ArrowDownward} from "@mui/icons-material";
import {AnnotationsForm} from "../AnnotationsForm";
import {PropertyValueEdit} from "../property-value-edit/PropertyValueEdit";

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
                    size='small'
                    value={props.propertyName}
                    label='Name'
                    disabled={!props.new}
                    variant='outlined'
                    onChange={(event) => {
                        props.onChangeName(event.target.value)
                    }}/>
            </FormControl>
            <FormControl fullWidth>
                <PropertyTypeDropdown
                    size='small'
                    value={props.property.type}
                    label='Type'
                    title='Type'
                    variant='outlined'
                    onChange={(event) => {
                        props.onChange({
                            ...props.property,
                            type: event.target.value as Type,
                            defaultValue: undefined as any,
                            exampleValue: undefined as any,
                        })
                    }}/>
            </FormControl>
            {<PropertyExtras
                resource={props.resource}
                property={props.property}
                onChange={props.onChange}/>}
            <FormControl fullWidth>
                <TextField
                    size='small'
                    value={props.property.title || ''}
                    label='Title'
                    variant='outlined'
                    onChange={(event) => {
                        props.onChange({
                            ...props.property,
                            title: event.target.value
                        })
                    }}/>
            </FormControl>
            <FormControl fullWidth>
                <TextField
                    size='small'
                    multiline={true}
                    rows={3}
                    value={props.property.description ?? ''}
                    label='Description'
                    variant='outlined'
                    onChange={(event) => {
                        props.onChange({
                            ...props.property,
                            description: event.target.value
                        })
                    }}/>
            </FormControl>
            <FormControl fullWidth>
                <FormLabel>Default Value</FormLabel>
                <PropertyValueEdit
                    property={props.property}
                    value={props.property.defaultValue}
                    onChange={value => {
                        if (!value) {
                            value = undefined
                        }
                        props.onChange({
                            ...props.property,
                            defaultValue: value
                        })
                    }}/>
            </FormControl>
            <FormControl fullWidth>
                <FormLabel>Example Value</FormLabel>
                <PropertyValueEdit
                    property={props.property}
                    value={props.property.exampleValue}
                    onChange={value => {
                        if (!value) {
                            value = undefined
                        }
                        props.onChange({
                            ...props.property,
                            exampleValue: value
                        })
                    }}/>
            </FormControl>
            <Stack spacing={1} direction='row'>
                <FormControl>
                    <FormLabel>Required</FormLabel>
                    <Checkbox
                        size='small'
                        sx={{
                            display: 'inline-block'
                        }}
                        checked={Boolean(props.property.required)}
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
                        size='small'
                        sx={{
                            display: 'inline-block'
                        }}
                        checked={Boolean(props.property.immutable)}
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
                        size='small'
                        sx={{
                            display: 'inline-block'
                        }}
                        checked={Boolean(props.property.unique)}
                        onChange={(event) => {
                            props.onChange({
                                ...props.property,
                                unique: event.target.checked
                            })
                        }}/>
                </FormControl>
            </Stack>
            <hr/>
            <Accordion sx={{
                width: '580px'
            }}>
                <AccordionSummary
                    expandIcon={<ArrowDownward/>}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography>Advanced options</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl fullWidth>
                        <AnnotationsForm
                            value={props.property.annotations}
                            onChange={annotations => {
                                props.onChange({
                                    ...props.property,
                                    annotations: annotations!,
                                })
                            }}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Primary</FormLabel>
                        <Checkbox
                            size='small'
                            sx={{
                                display: 'inline-block'
                            }}
                            checked={Boolean(props.property.primary)}
                            onChange={(event) => {
                                props.onChange({
                                    ...props.property,
                                    primary: event.target.checked
                                })
                            }}/>
                        <FormHelperText>
                            This property is the primary key.
                            You should only set this on one property.
                            Normally, Id property automatically become primary and automatically generated.
                            You only need to set primary if you want to use a different property as the primary key.
                        </FormHelperText>
                    </FormControl>
                </AccordionDetails>
            </Accordion>
        </Stack>
    )
}