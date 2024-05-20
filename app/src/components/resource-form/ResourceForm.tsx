import {Resource} from "@apibrew/react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Checkbox,
    FormControl,
    FormHelperText,
    FormLabel,
    Stack,
    TextField,
    Tooltip,
    Typography
} from "@mui/material";
import {AnnotationsForm} from "../annotations-form/AnnotationsForm";

import {ArrowDownward} from "@mui/icons-material";
import {ReferenceValueSelector} from "../ReferenceValueSelector";
import {isAnnotationEnabled, withBooleanAnnotation} from "../../util/annotation";
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
} from "../../util/base-annotations";

export interface ResourceFormProps {
    resource: Resource
    onChange: (Resource: Resource) => void
}

export function ResourceForm(props: ResourceFormProps) {
    return (
        <Stack m={1} spacing={2}>
            <FormControl fullWidth>
                <TextField
                    size='small'
                    value={props.resource.name}
                    label='Name'
                    variant='outlined'
                    onChange={(event) => {
                        props.onChange({
                            ...props.resource,
                            name: event.target.value
                        })
                    }}/>
                <FormHelperText>
                    The name of the resource.
                </FormHelperText>
            </FormControl>
            <FormControl fullWidth>
                <ReferenceValueSelector
                    required={true}
                    reference={'system/Namespace'}
                    value={props.resource.namespace}
                    onChange={namespace => {
                        props.onChange({
                            ...props.resource,
                            namespace: namespace,
                        })
                    }}/>
                <FormHelperText>
                    The name of the resource.
                </FormHelperText>
            </FormControl>
            <FormControl fullWidth>
                <TextField
                    size='small'
                    value={props.resource.title}
                    label='Title'
                    variant='outlined'
                    onChange={(event) => {
                        props.onChange({
                            ...props.resource,
                            title: event.target.value
                        })
                    }}/>
                <FormHelperText>
                    The title of the resource.
                </FormHelperText>
            </FormControl>
            <FormControl fullWidth>
                <TextField
                    size='small'
                    value={props.resource.description}
                    multiline={true}
                    rows={3}
                    label='Description'
                    variant='outlined'
                    onChange={(event) => {
                        props.onChange({
                            ...props.resource,
                            description: event.target.value
                        })
                    }}/>
                <FormHelperText>
                    The description of the resource.
                </FormHelperText>
            </FormControl>
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
                        <TextField
                            size='small'
                            value={props.resource.catalog ?? ''}
                            label='Catalog'
                            variant='outlined'
                            onChange={(event) => {
                                props.onChange({
                                    ...props.resource,
                                    catalog: event.target.value
                                })
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
                            value={props.resource.entity ?? ''}
                            label='Entity'
                            variant='outlined'
                            onChange={(event) => {
                                props.onChange({
                                    ...props.resource,
                                    entity: event.target.value
                                })
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
                            checked={isAnnotationEnabled(props.resource.annotations, EnableAudit)}
                            onChange={(event) => {
                                props.onChange({
                                    ...props.resource,
                                    annotations: withBooleanAnnotation(props.resource.annotations, EnableAudit, event.target.checked)
                                })
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
                            checked={isAnnotationEnabled(props.resource.annotations, ActionApi)}
                            onChange={(event) => {
                                props.onChange({
                                    ...props.resource,
                                    annotations: withBooleanAnnotation(props.resource.annotations, ActionApi, event.target.checked)
                                })
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
                            checked={isAnnotationEnabled(props.resource.annotations, RestApiDisabled)}
                            onChange={(event) => {
                                props.onChange({
                                    ...props.resource,
                                    annotations: withBooleanAnnotation(props.resource.annotations, RestApiDisabled, event.target.checked)
                                })
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
                            checked={isAnnotationEnabled(props.resource.annotations, DisableVersion)}
                            onChange={(event) => {
                                props.onChange({
                                    ...props.resource,
                                    annotations: withBooleanAnnotation(props.resource.annotations, DisableVersion, event.target.checked)
                                })
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
                            checked={Boolean(props.resource.immutable)}
                            onChange={(event) => {
                                props.onChange({
                                    ...props.resource,
                                    immutable: event.target.checked
                                })
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
                            checked={Boolean(props.resource.virtual)}
                            onChange={(event) => {
                                props.onChange({
                                    ...props.resource,
                                    virtual: event.target.checked
                                })
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
                            checked={isAnnotationEnabled(props.resource.annotations, StudioSeparatePages)}
                            onChange={(event) => {
                                props.onChange({
                                    ...props.resource,
                                    annotations: withBooleanAnnotation(props.resource.annotations, StudioSeparatePages, event.target.checked)
                                })
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
                                    checked={isAnnotationEnabled(props.resource.annotations, AllowPublicAccess)}
                                    onChange={(event) => {
                                        const annotations = {...props.resource.annotations}

                                        delete (annotations[AllowPublicAccess])
                                        delete (annotations[AllowPublicReadAccess])
                                        delete (annotations[AllowPublicCreateAccess])
                                        delete (annotations[AllowPublicUpdateAccess])
                                        delete (annotations[AllowPublicDeleteAccess])

                                        if (event.target.checked) {
                                            annotations[AllowPublicAccess] = "true"
                                        }

                                        props.onChange({
                                            ...props.resource,
                                            annotations: annotations
                                        })
                                    }}/>
                            </Tooltip>
                            <Tooltip title='Read'>
                                <Checkbox
                                    size='small'
                                    sx={{
                                        display: 'inline-block',
                                        width: '40px'
                                    }}
                                    checked={isAnnotationEnabled(props.resource.annotations, AllowPublicAccess) || isAnnotationEnabled(props.resource.annotations, AllowPublicReadAccess)}
                                    onChange={(event) => {
                                        props.onChange({
                                            ...props.resource,
                                            annotations: withBooleanAnnotation(props.resource.annotations, AllowPublicReadAccess, event.target.checked)
                                        })
                                    }}/>
                            </Tooltip>
                            <Tooltip title='Create'>
                                <Checkbox
                                    size='small'
                                    sx={{
                                        display: 'inline-block',
                                        width: '40px'
                                    }}
                                    checked={isAnnotationEnabled(props.resource.annotations, AllowPublicAccess) || isAnnotationEnabled(props.resource.annotations, AllowPublicCreateAccess)}
                                    onChange={(event) => {
                                        props.onChange({
                                            ...props.resource,
                                            annotations: withBooleanAnnotation(props.resource.annotations, AllowPublicCreateAccess, event.target.checked)
                                        })
                                    }}/>
                            </Tooltip>
                            <Tooltip title='Update'>
                                <Checkbox
                                    size='small'
                                    sx={{
                                        display: 'inline-block',
                                        width: '40px'
                                    }}
                                    checked={isAnnotationEnabled(props.resource.annotations, AllowPublicAccess) || isAnnotationEnabled(props.resource.annotations, AllowPublicUpdateAccess)}
                                    onChange={(event) => {
                                        props.onChange({
                                            ...props.resource,
                                            annotations: withBooleanAnnotation(props.resource.annotations, AllowPublicUpdateAccess, event.target.checked)
                                        })
                                    }}/>
                            </Tooltip>
                            <Tooltip title='Delete'>
                                <Checkbox
                                    size='small'
                                    sx={{
                                        display: 'inline-block',
                                        width: '40px'
                                    }}
                                    checked={isAnnotationEnabled(props.resource.annotations, AllowPublicAccess) || isAnnotationEnabled(props.resource.annotations, AllowPublicDeleteAccess)}
                                    onChange={(event) => {
                                        props.onChange({
                                            ...props.resource,
                                            annotations: withBooleanAnnotation(props.resource.annotations, AllowPublicDeleteAccess, event.target.checked)
                                        })
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
                            value={props.resource.annotations}
                            onChange={annotations => {
                                props.onChange({
                                    ...props.resource,
                                    annotations: annotations,
                                })
                            }}/>
                    </FormControl>
                </AccordionDetails>
            </Accordion>
        </Stack>
    )
}
