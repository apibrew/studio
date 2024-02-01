import React from "react";
import {NanoCodeTemplate} from "./abs";
import {ResourceSelect} from "../../ResourceSelect";
import toast from "react-hot-toast";
import {Program} from 'acorn'
import {applyUseResourceModifier, checkUseResourceModifierAlreadyApplied} from "../modifiers/use-resource";
import {Resource} from "@apibrew/react";
import { FormLabel } from "@mui/material";

export interface RenderParamsProps {
    resource: Resource | undefined
    onChange: (resource: Resource | undefined) => void
}

function RenderParams(props: RenderParamsProps) {
    const [resource, setResource] = React.useState<Resource | undefined>(props.resource)

    const value = resource ? (resource.namespace.name + '/' + resource.name) : undefined

    return <>
        <FormLabel>Resource:</FormLabel>
        <ResourceSelect
            value={value}
            onChange={(e, resource) => {
                setResource(resource)
                props.onChange(resource)
            }}
            fullWidth
            size='small'/>
    </>
}

export class UseResource implements NanoCodeTemplate {
    resource?: Resource

    constructor(resource?: Resource) {
        this.resource = resource
    }

    check(ast: Program): boolean {
        if (!this.resource) {
            toast.error('Resource is required')
            return false
        }

        // check import from ast

        if (checkUseResourceModifierAlreadyApplied(ast, {
            resource: this.resource.name!,
            namespace: this.resource.namespace.name!,
        })) {
            toast.error('Resource already imported')
            return false
        }

        return true
    }

    label: string = 'Use Resource';

    apply(ast: Program): void {
        applyUseResourceModifier(ast, {
            resource: this.resource!.name,
            namespace: this.resource!.namespace.name,
        })
    }

    renderParams() {
        return <RenderParams
            // type={this.resource ? (this.resource.namespace.name + '/' + this.resource.name) : undefined}
            resource={this.resource}
            onChange={resource => {
                this.resource = resource
            }}/>
    }
}