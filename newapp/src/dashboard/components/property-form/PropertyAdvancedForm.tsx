import {Checkbox, FormControl, FormHelperText, FormLabel, MenuItem, Select, Stack} from "@mui/material";
import {Type} from "@apibrew/client/model/resource";

import {Property} from "@apibrew/client/model";
import {Resource} from "@apibrew/react";
import {AnnotationsForm} from "../annotations-form/AnnotationsForm";
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

export function PropertyAdvancedForm(props: PropertyFormProps) {
    const propertyEditors = getPropertyEditorList(props.property)

    return (
        <Stack width='600px' spacing={2}>
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

        </Stack>
    )
}
