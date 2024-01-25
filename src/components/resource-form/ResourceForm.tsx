import {Resource} from "@apibrew/react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Checkbox,
    FormControl,
    FormHelperText, FormLabel,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {AnnotationsForm} from "../AnnotationsForm";
import React from "react";
import {ArrowDownward} from "@mui/icons-material";

export interface ResourceFormProps {
    resource: Resource
    onChange: (Resource: Resource) => void
}

export function ResourceForm(props: ResourceFormProps) {
    return (
        <Stack spacing={2}>
            <FormControl fullWidth>
                <TextField
                    value={props.resource.name}
                    label='Name'
                    variant='filled'
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
                <TextField
                    value={props.resource.title}
                    label='Title'
                    variant='filled'
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
                    value={props.resource.description}
                    label='Description'
                    variant='filled'
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
                        <AnnotationsForm
                            value={props.resource.annotations}
                            onChange={annotations => {
                                props.onChange({
                                    ...props.resource,
                                    annotations: annotations,
                                })
                            }}/>
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            value={props.resource.catalog ?? ''}
                            label='Catalog'
                            variant='filled'
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
                            value={props.resource.entity ?? ''}
                            label='Entity'
                            variant='filled'
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

                    <FormControl>
                        <FormLabel>Immutable</FormLabel>
                        <Checkbox
                            sx={{
                                display: 'inline-block'
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
                            sx={{
                                display: 'inline-block'
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
                </AccordionDetails>
            </Accordion>
        </Stack>
    )
}