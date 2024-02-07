import React from "react";
import {NanoCodeTemplate} from "./abs";
import {ResourceSelect} from "../../ResourceSelect";
import toast from "react-hot-toast";
import {Resource} from "@apibrew/react";
import {Box, FormLabel, MenuItem, Select, TextField} from "@mui/material";
import {sortedProperties} from "../../../util/property";
import {NanoAstModifier} from "../../../logic/nano-ast/NanoAstModifier";
import {ResourceHandlerType} from "../../../logic/nano-ast/abs";
import {BinaryOperator} from "acorn";

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
    property?: string = 'version';
    operator?: string = '==';
    value?: string = '1';
    errorMessage?: string;

    constructor(resource?: Resource) {
        this.resource = resource
    }

    apply(modifier: NanoAstModifier): boolean {
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

        modifier.declareResource(this.resource)

        const validateMethodName = "validate" + this.resource.name

        modifier.declareFunction(validateMethodName, [modifier.resourceItemName(this.resource)], methodModifier => {
            methodModifier.if(
                methodModifier.binaryStatement(
                    methodModifier.property(methodModifier.item(), this.property!),
                    methodModifier.value(this.value),
                    this.operator as BinaryOperator
                ),
                scopeModifier => {
                    scopeModifier.throwError(this.errorMessage!)
                })
        })

        modifier.resourceHandler(this.resource, ResourceHandlerType.BEFORE_CREATE, methodModifier => {
            methodModifier.callMethod(validateMethodName, methodModifier.item())
        })

        modifier.resourceHandler(this.resource, ResourceHandlerType.BEFORE_UPDATE, methodModifier => {
            methodModifier.callMethod(validateMethodName, methodModifier.item())
        })

        return true
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