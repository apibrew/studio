import React from "react";
import {NanoCodeTemplate} from "./abs";
import {ResourceSelect} from "../../ResourceSelect";
import toast from "react-hot-toast";
import {Program} from 'acorn'
import {Resource} from "@apibrew/react";
import {Box, FormLabel, MenuItem, Select, TextField} from "@mui/material";
import {applyValidatePropertyModifier, checkValidatePropertyAlreadyApplied} from "../modifiers/validate-property";
import {sortedProperties} from "../../../util/property";

export interface RenderParamsProps {
    resource: Resource | undefined
    property?: string
    operator?: string
    value?: string
    errorMessage?: string
    onResourceChange: (resource: Resource | undefined) => void
    onPropertyChange: (property: string | undefined) => void
    onOperatorChange: (operator: string | undefined) => void
    onValueChange: (value: string | undefined) => void
    onErrorMessageChange: (errorMessage: string | undefined) => void
}

function RenderParams(props: RenderParamsProps) {
    const [resource, setResource] = React.useState<Resource | undefined>(props.resource)
    const [property, setProperty] = React.useState<string | undefined>(props.property)
    const [operator, setOperator] = React.useState<string | undefined>(props.operator)
    const [value, setValue] = React.useState<string | undefined>(props.value)
    const [errorMessage, setErrorMessage] = React.useState<string | undefined>(props.errorMessage)

    const resourceValue = resource ? (resource.namespace.name + '/' + resource.name) : undefined

    const properties = resource ? sortedProperties(resource.properties) : []

    return <>
        <Box>
            <FormLabel>Resource:</FormLabel>
            <ResourceSelect
                value={resourceValue}
                onChange={(e, resource) => {
                    setResource(resource)
                    props.onResourceChange(resource)

                    setProperty(undefined)
                    setOperator(undefined)
                    setValue(undefined)
                    setErrorMessage(undefined)
                    props.onPropertyChange(undefined)
                    props.onOperatorChange(undefined)
                    props.onValueChange(undefined)
                    props.onErrorMessageChange(undefined)
                }}
                fullWidth
                size='small'/>
        </Box>
        {resource && <>
            <Box marginTop={2}>
                <FormLabel>Property:</FormLabel>
                <Select
                    size='small'
                    fullWidth
                    value={property}
                    onChange={e => {
                        setProperty(e.target.value)
                        props.onPropertyChange(e.target.value)
                    }}
                >
                    {properties.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
                </Select>
            </Box>
            <Box marginTop={2}>
                <FormLabel>Operator:</FormLabel>
                <Select
                    size='small'
                    fullWidth
                    value={operator}
                    onChange={e => {
                        setOperator(e.target.value)
                        props.onOperatorChange(e.target.value)
                    }}
                >
                    <MenuItem value='=='>=</MenuItem>
                    <MenuItem value='!='>!=</MenuItem>
                    <MenuItem value='>'>&gt;</MenuItem>
                    <MenuItem value='>='>&gt;=</MenuItem>
                    <MenuItem value='<'>&lt;</MenuItem>
                    <MenuItem value='<='>&lt;=</MenuItem>
                </Select>
            </Box>
            <Box marginTop={2}>
                <FormLabel>Value:</FormLabel>
                <TextField
                    fullWidth
                    size='small'
                    value={value}
                    onChange={e => {
                        setValue(e.target.value)
                        props.onValueChange(e.target.value)
                    }}
                />
            </Box>

            <Box marginTop={2}>
                <FormLabel>Error Message:</FormLabel>
                <TextField
                    fullWidth
                    size='small'
                    value={errorMessage}
                    onChange={e => {
                        setErrorMessage(e.target.value)
                        props.onErrorMessageChange(e.target.value)
                    }}
                />
            </Box>
        </>}
    </>
}

export class ValidateProperty implements NanoCodeTemplate {
    label: string = 'Validate Property';

    resource?: Resource
    property?: string;
    operator?: string;
    value?: string;
    errorMessage?: string;

    constructor(resource?: Resource) {
        this.resource = resource
    }

    check(ast: Program): boolean {
        if (!this.resource) {
            toast.error('Resource is required')
            return false
        }

        if (!this.property) {
            toast.error('Property is required')
            return false
        }

        if (!this.operator) {
            toast.error('Operator is required')
            return false
        }

        if (!this.value) {
            toast.error('Value is required')
            return false
        }

        if (!this.errorMessage) {
            this.errorMessage = 'Invalid value'
        }

        if (checkValidatePropertyAlreadyApplied(ast, {
            resource: this.resource.name!,
            namespace: this.resource.namespace.name!,
            propertyName: this.property!,
            operator: this.operator!,
            value: this.value!,
            propertyType: this.resource?.properties[this.property!]?.type!,
        })) {
            toast.error('Rule already imported')
            return false
        }

        return true
    }

    apply(ast: Program): void {
        applyValidatePropertyModifier(ast, {
            resource: this.resource?.name!,
            namespace: this.resource?.namespace.name!,
            propertyName: this.property!,
            operator: this.operator!,
            value: this.value!,
            errorMessage: this.errorMessage!,
            propertyType: this.resource?.properties[this.property!]?.type!,
        })
    }

    renderParams() {
        return <RenderParams
            resource={this.resource}
            property={this.property}
            operator={this.operator}
            value={this.value}
            errorMessage={this.errorMessage}

            onResourceChange={resource => {
                this.resource = resource
            }}
            onPropertyChange={property => {
                this.property = property
            }}
            onOperatorChange={operator => {
                this.operator = operator
            }}
            onValueChange={value => {
                this.value = value
            }}
            onErrorMessageChange={errorMessage => {
                this.errorMessage = errorMessage
            }}
        />
    }
}