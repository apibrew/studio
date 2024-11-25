import {Checkbox, FormControl, FormHelperText, FormLabel, MenuItem, Select, Stack, TextField} from "@mui/material";
import {Type} from "@apibrew/client/model/resource";

import {Property} from "@apibrew/client/model";
import {Resource} from "@apibrew/react";
import {PropertyValueEdit} from "../property-value-edit/PropertyValueEdit";
import {getAnnotation, isAnnotationEnabled, withAnnotation, withBooleanAnnotation} from "../../../util/annotation";
import {
    ActionApi,
    ActionOutputProperty,
    CascadeReference,
    PropertyEditorAnnotation
} from "../../../util/base-annotations";
import {getPropertyEditorList} from "../property-editor/PropertyEditor";

export interface PropertyFormProps {
    resource: Resource
    property: Property;
    onChange: (property: Property) => void
}

export function PropertyDetailsForm(props: PropertyFormProps) {
    const propertyEditors = getPropertyEditorList(props.property)

    return (
        <Stack spacing={2}>
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
                    resource={props.resource}
                    property={props.property}
                    propertyName={''}
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
                    resource={props.resource}
                    property={props.property}
                    propertyName={''}
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
            {isAnnotationEnabled(props.resource.annotations, ActionApi) && <FormControl fullWidth>
                <FormLabel>
                    Action Output Property
                </FormLabel>
                <Checkbox
                    size='small'
                    sx={{
                        display: 'inline-block',
                        width: '40px'
                    }}
                    checked={isAnnotationEnabled(props.property.annotations, ActionOutputProperty)}
                    onChange={(event) => {
                        props.onChange({
                            ...props.property,
                            annotations: withBooleanAnnotation(props.property.annotations, ActionOutputProperty, event.target.checked)
                        })
                    }}/>
                <FormHelperText>
                    If enabled, this property will be behaved as an output property of an action.
                </FormHelperText>
            </FormControl>}
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
        </Stack>
    )
}
