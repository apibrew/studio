import React from "react";
import {NanoCodeTemplate} from "./abs";
import {ResourceSelect} from "../../ResourceSelect";
import toast from "react-hot-toast";
import {Program} from 'acorn'
import {applyUseResourceModifier, checkUseResourceModifierAlreadyApplied} from "../modifiers/validate-property";
import {Resource} from "@apibrew/react";
import {Box, TextField} from "@mui/material";

export interface RenderParamsProps {
    type?: string
    property?: string
    operator?: string
    value?: string
    errorMessage?: string
    onTypeChange: (type: string) => void
    onPropertyChange: (property: string) => void
    onOperatorChange: (operator: string) => void
    onValueChange: (value: string) => void
    onErrorMessageChange: (errorMessage: string) => void
}

function RenderParams(props: RenderParamsProps) {
    const [resource, setResource] = React.useState<string | undefined>(props.type)
    const [property, setProperty] = React.useState<string | undefined>(props.property)
    const [operator, setOperator] = React.useState<string | undefined>(props.operator)
    const [value, setValue] = React.useState<string | undefined>(props.value)
    const [errorMessage, setErrorMessage] = React.useState<string | undefined>(props.errorMessage)

    return <>
        <Box>
            <div>Resource:</div>
            <ResourceSelect
                value={resource}
                onChange={e => {
                    setResource(e.target.value as string)
                    props.onTypeChange(e.target.value as string)
                }}
                fullWidth
                size='small'/>
        </Box>
        <Box marginTop={2}>
            <div>Property:</div>
            <TextField
                size='small'
                value={property}
                onChange={e => {
                    setProperty(e.target.value)
                    props.onPropertyChange(e.target.value)
                }}
            />
        </Box>
        <Box marginTop={2}>
            <div>Operator:</div>
            <TextField
                size='small'
                value={operator}
                onChange={e => {
                    setOperator(e.target.value)
                    props.onOperatorChange(e.target.value)
                }}
            />
        </Box>
        <Box marginTop={2}>
            <div>Value:</div>
            <TextField
                size='small'
                value={value}
                onChange={e => {
                    setValue(e.target.value)
                    props.onValueChange(e.target.value)
                }}
            />
        </Box>

        <Box marginTop={2}>
            <div>Error Message:</div>
            <TextField
                size='small'
                value={errorMessage}
                onChange={e => {
                    setErrorMessage(e.target.value)
                    props.onErrorMessageChange(e.target.value)
                }}
            />
        </Box>

    </>
}

export class ValidateProperty implements NanoCodeTemplate {
    label: string = 'Validate Property';

    namespace?: string;
    resource?: string;
    property?: string;
    operator?: string;
    value?: string;
    errorMessage?: string;

    constructor(resource?: Resource) {
        if (resource) {
            this.applyType(resource.namespace.name + '/' + resource.name)
        }
    }

    check(ast: Program): boolean {
        if (!this.resource) {
            toast.error('Resource is required')
            return false
        }

        // check import from ast

        if (checkUseResourceModifierAlreadyApplied(ast, {
            resource: this.resource!,
            namespace: this.namespace!,
        })) {
            toast.error('Resource already imported')
            return false
        }

        return true
    }

    apply(ast: Program): void {
        applyUseResourceModifier(ast, {
            resource: this.resource!,
            namespace: this.namespace!,
        })
    }

    renderParams() {
        return <RenderParams
            type={this.namespace ? this.namespace + '/' + this.resource : undefined}
            property={this.property}
            operator={this.operator}
            value={this.value}
            errorMessage={this.errorMessage}

            onTypeChange={type => {
                this.applyType(type)
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

    private applyType(type: string) {
        const [namespace, resource] = type!.split('/')

        this.namespace = namespace
        this.resource = resource
    }
}