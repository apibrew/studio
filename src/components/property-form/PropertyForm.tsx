import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Checkbox,
    FormControl,
    FormHelperText,
    FormLabel,
    MenuItem,
    Select,
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
import {AnnotationsForm} from "../annotations-form/AnnotationsForm";
import {PropertyValueEdit} from "../property-value-edit/PropertyValueEdit";
import {getAnnotation, isAnnotationEnabled, withAnnotation, withBooleanAnnotation} from "../../util/annotation";
import {CascadeReference, PropertyEditorAnnotation} from "../../util/base-annotations";
import {getPropertyEditorList} from "../property-editor/PropertyEditor";

export interface PropertyFormProps {
    resource: Resource
    propertyName: string
    onChangeName: (propertyName: string) => void
    property: Property;
    onChange: (property: Property) => void
}

export function PropertyForm(props: PropertyFormProps) {
    const propertyEditors = getPropertyEditorList(props.property)

    return (
        <Stack spacing={2}>
            <FormControl fullWidth>
                <TextField
                    size='small'
                    value={props.propertyName}
                    label='Name'
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
                <FormControl>
                    <FormLabel>Virtual</FormLabel>
                    <Checkbox
                        size='small'
                        sx={{
                            display: 'inline-block'
                        }}
                        checked={Boolean(props.property.virtual)}
                        onChange={(event) => {
                            props.onChange({
                                ...props.property,
                                virtual: event.target.checked
                            })
                        }}/>
                </FormControl>
            </Stack>
            {props.property.type === Type.REFERENCE && <FormControl fullWidth>
                <FormLabel>
                    Cascade Reference
                </FormLabel>
                <Checkbox
                    size='small'
                    sx={{
                        display: 'inline-block',
                        width: '40px'
                    }}
                    checked={isAnnotationEnabled(props.property.annotations, CascadeReference)}
                    onChange={(event) => {
                        props.onChange({
                            ...props.property,
                            annotations: withBooleanAnnotation(props.property.annotations, CascadeReference, event.target.checked)
                        })
                    }}/>
                <FormHelperText>
                    If enabled, when the referenced record is deleted, this record will also be deleted. This is
                    useful for cascading deletes.
                </FormHelperText>
            </FormControl>}
            <hr/>
            {propertyEditors.length > 0 && <FormControl fullWidth>
                <FormLabel>Property Editor</FormLabel>
                <Select
                    value={getAnnotation(props.property.annotations, PropertyEditorAnnotation)}
                    onChange={e => {
                        props.onChange({
                            ...props.property,
                            annotations: withAnnotation(props.property.annotations, PropertyEditorAnnotation, e.target.value as string)
                        })
                    }}
                >
                    <MenuItem value=''>default</MenuItem>
                    {propertyEditors.map(editor => (
                        <MenuItem key={editor} value={editor}>{editor}</MenuItem>
                    ))}
                </Select>
            </FormControl>}
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
