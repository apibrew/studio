import {Resource} from "@apibrew/react";
import {Box, Checkbox, FormControl, FormHelperText, FormLabel, Stack, TextField, Tooltip} from "@mui/material";
import {useEffect} from "react";
import {isAnnotationEnabled, withBooleanAnnotation} from "../../../util/annotation.ts";
import {
    ActionApi,
    AllowPublicAccess,
    AllowPublicCreateAccess,
    AllowPublicDeleteAccess,
    AllowPublicReadAccess,
    AllowPublicUpdateAccess,
    DisableVersion,
    EnableAudit,
    RestApiDisabled,
    StudioSeparatePages
} from "../../../util/base-annotations.ts";
import {AnnotationsForm} from "../annotations-form/AnnotationsForm.tsx";

export interface ResourceFormProps {
    value: Resource
    onChange: (Resource: Resource, isValid: boolean) => void
}

export function ResourceAdvancedForm(props: ResourceFormProps) {
    function validate(): boolean {
        return true
    }

    useEffect(() => {
        props.onChange(props.value, validate())
    }, [props.value]);

    return (
        <Stack width='600px' m={1} spacing={2}>
            <FormControl fullWidth>
                <TextField
                    size='small'
                    value={props.value.catalog ?? ''}
                    label='Catalog'
                    variant='outlined'
                    onChange={(event) => {
                        props.onChange({
                            ...props.value,
                            catalog: event.target.value
                        }, validate())
                    }}/>
                <FormHelperText>
                    The catalog that this resource belongs to. This is used by Some Databases to group tables.
                    For example, in Postgresql, It is the schema name.
                    If you are not sure, leave it blank.
                    It will be set to the default catalog of the database.
                </FormHelperText>
            </FormControl>
            <FormControl fullWidth>
                <TextField
                    size='small'
                    value={props.value.entity ?? ''}
                    label='Entity'
                    variant='outlined'
                    onChange={(event) => {
                        props.onChange({
                            ...props.value,
                            entity: event.target.value
                        }, validate())
                    }}/>
                <FormHelperText>
                    The catalog that this resource belongs to. This is used by Some Databases to group tables.
                    For example, in Postgresql, It is the schema name.
                    If you are not sure, leave it blank.
                    It will be set to the default catalog of the database.
                </FormHelperText>
            </FormControl>
            <FormControl fullWidth>
                <FormLabel>
                    Enable Audit
                </FormLabel>
                <Checkbox
                    size='small'
                    sx={{
                        display: 'inline-block',
                        width: '40px'
                    }}
                    checked={isAnnotationEnabled(props.value.annotations, EnableAudit)}
                    onChange={(event) => {
                        props.onChange({
                            ...props.value,
                            annotations: withBooleanAnnotation(props.value.annotations, EnableAudit, event.target.checked)
                        }, validate())
                    }}/>
                <FormHelperText>
                    If you enable audit, All changes on Resource will be kept in AuditLog (you can find them in
                    Monitoring / Audit page)
                </FormHelperText>
            </FormControl>
            <FormControl fullWidth>
                <FormLabel>
                    Action Api
                </FormLabel>
                <Checkbox
                    size='small'
                    sx={{
                        display: 'inline-block',
                        width: '40px'
                    }}
                    checked={isAnnotationEnabled(props.value.annotations, ActionApi)}
                    onChange={(event) => {
                        props.onChange({
                            ...props.value,
                            annotations: withBooleanAnnotation(props.value.annotations, ActionApi, event.target.checked)
                        }, validate())
                    }}/>
                <FormHelperText>
                    If you enable Action Api, you can create custom actions based on this resource.
                    This Resource will only have POST api available
                </FormHelperText>
            </FormControl>
            <FormControl fullWidth>
                <FormLabel>
                    Disable Rest Api
                </FormLabel>
                <Checkbox
                    size='small'
                    sx={{
                        display: 'inline-block',
                        width: '40px'
                    }}
                    checked={isAnnotationEnabled(props.value.annotations, RestApiDisabled)}
                    onChange={(event) => {
                        props.onChange({
                            ...props.value,
                            annotations: withBooleanAnnotation(props.value.annotations, RestApiDisabled, event.target.checked)
                        }, validate())
                    }}/>
                <FormHelperText>
                    If you don't want resource to have Rest API endpoints, you can disable them, it is useful
                    for creating internal Resources
                </FormHelperText>
            </FormControl>
            <FormControl fullWidth>
                <FormLabel>
                    Disable Version
                </FormLabel>
                <Checkbox
                    size='small'
                    sx={{
                        display: 'inline-block',
                        width: '40px'
                    }}
                    checked={isAnnotationEnabled(props.value.annotations, DisableVersion)}
                    onChange={(event) => {
                        props.onChange({
                            ...props.value,
                            annotations: withBooleanAnnotation(props.value.annotations, DisableVersion, event.target.checked)
                        }, validate())
                    }}/>
                <FormHelperText>
                    You can disable versioning on records for this resource
                </FormHelperText>
            </FormControl>
            <FormControl>
                <FormLabel>Immutable</FormLabel>
                <Checkbox
                    size='small'
                    sx={{
                        display: 'inline-block',
                        width: '40px'
                    }}
                    checked={Boolean(props.value.immutable)}
                    onChange={(event) => {
                        props.onChange({
                            ...props.value,
                            immutable: event.target.checked
                        }, validate())
                    }}/>
                <FormHelperText>
                    Virtual resources are not materialized in the database.
                    They are used to define relationships between resources.
                </FormHelperText>
            </FormControl>
            <FormControl>
                <FormLabel>Virtual</FormLabel>
                <Checkbox
                    size='small'
                    sx={{
                        display: 'inline-block',
                        width: '40px'
                    }}
                    checked={Boolean(props.value.virtual)}
                    onChange={(event) => {
                        props.onChange({
                            ...props.value,
                            virtual: event.target.checked
                        }, validate())
                    }}/>
                <FormHelperText>
                    Virtual resources are not materialized in the database.
                    They are used to define relationships between resources.
                </FormHelperText>
            </FormControl>
            <FormControl>
                <FormLabel>Separate Page in Studio</FormLabel>
                <Checkbox
                    size='small'
                    sx={{
                        display: 'inline-block',
                        width: '40px'
                    }}
                    checked={isAnnotationEnabled(props.value.annotations, StudioSeparatePages)}
                    onChange={(event) => {
                        props.onChange({
                            ...props.value,
                            annotations: withBooleanAnnotation(props.value.annotations, StudioSeparatePages, event.target.checked)
                        }, validate())
                    }}/>
                <FormHelperText>
                    Separate page for this resource will be created in Menu for this resource.
                </FormHelperText>
            </FormControl>
            <FormControl>
                <FormLabel>Public Access</FormLabel>
                <Box>
                    <Tooltip title='Full'>
                        <Checkbox
                            size='small'
                            sx={{
                                display: 'inline-block',
                                width: '40px'
                            }}
                            checked={isAnnotationEnabled(props.value.annotations, AllowPublicAccess)}
                            onChange={(event) => {
                                const annotations = {...props.value.annotations}

                                delete (annotations[AllowPublicAccess])
                                delete (annotations[AllowPublicReadAccess])
                                delete (annotations[AllowPublicCreateAccess])
                                delete (annotations[AllowPublicUpdateAccess])
                                delete (annotations[AllowPublicDeleteAccess])

                                if (event.target.checked) {
                                    annotations[AllowPublicAccess] = "true"
                                }

                                props.onChange({
                                    ...props.value,
                                    annotations: annotations
                                }, validate())
                            }}/>
                    </Tooltip>
                    <Tooltip title='Read'>
                        <Checkbox
                            size='small'
                            sx={{
                                display: 'inline-block',
                                width: '40px'
                            }}
                            checked={isAnnotationEnabled(props.value.annotations, AllowPublicAccess) || isAnnotationEnabled(props.value.annotations, AllowPublicReadAccess)}
                            onChange={(event) => {
                                props.onChange({
                                    ...props.value,
                                    annotations: withBooleanAnnotation(props.value.annotations, AllowPublicReadAccess, event.target.checked)
                                }, validate())
                            }}/>
                    </Tooltip>
                    <Tooltip title='Create'>
                        <Checkbox
                            size='small'
                            sx={{
                                display: 'inline-block',
                                width: '40px'
                            }}
                            checked={isAnnotationEnabled(props.value.annotations, AllowPublicAccess) || isAnnotationEnabled(props.value.annotations, AllowPublicCreateAccess)}
                            onChange={(event) => {
                                props.onChange({
                                    ...props.value,
                                    annotations: withBooleanAnnotation(props.value.annotations, AllowPublicCreateAccess, event.target.checked)
                                }, validate())
                            }}/>
                    </Tooltip>
                    <Tooltip title='Update'>
                        <Checkbox
                            size='small'
                            sx={{
                                display: 'inline-block',
                                width: '40px'
                            }}
                            checked={isAnnotationEnabled(props.value.annotations, AllowPublicAccess) || isAnnotationEnabled(props.value.annotations, AllowPublicUpdateAccess)}
                            onChange={(event) => {
                                props.onChange({
                                    ...props.value,
                                    annotations: withBooleanAnnotation(props.value.annotations, AllowPublicUpdateAccess, event.target.checked)
                                }, validate())
                            }}/>
                    </Tooltip>
                    <Tooltip title='Delete'>
                        <Checkbox
                            size='small'
                            sx={{
                                display: 'inline-block',
                                width: '40px'
                            }}
                            checked={isAnnotationEnabled(props.value.annotations, AllowPublicAccess) || isAnnotationEnabled(props.value.annotations, AllowPublicDeleteAccess)}
                            onChange={(event) => {
                                props.onChange({
                                    ...props.value,
                                    annotations: withBooleanAnnotation(props.value.annotations, AllowPublicDeleteAccess, event.target.checked)
                                }, validate())
                            }}/>
                    </Tooltip>
                </Box>
                <FormHelperText>
                    Virtual resources are not materialized in the database.
                    They are used to define relationships between resources.
                </FormHelperText>
            </FormControl>
            <FormControl fullWidth>
                <FormLabel>
                    Annotations
                </FormLabel>
                <AnnotationsForm
                    value={props.value.annotations}
                    onChange={annotations => {
                        props.onChange({
                            ...props.value,
                            annotations: annotations,
                        }, validate())
                    }}/>
            </FormControl>
        </Stack>
    )
}
