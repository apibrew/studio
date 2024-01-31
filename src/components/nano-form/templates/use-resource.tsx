import React from "react";
import {NanoCodeTemplate} from "./abs";
import {ResourceSelect} from "../../ResourceSelect";
import toast from "react-hot-toast";
import {Program} from 'acorn'
import {applyUseResourceModifier, checkUseResourceModifierAlreadyApplied} from "../modifiers/use-resource";
import {Resource} from "@apibrew/react";

export interface RenderParamsProps {
    type?: string
    onChange: (type: string) => void
}

function RenderParams(props: RenderParamsProps) {
    const [resource, setResource] = React.useState<string>(props.type || '')

    return <>
        <span>Resource:</span>
        <ResourceSelect
            value={resource}
            onChange={e => {
                setResource(e.target.value as string)
                props.onChange(e.target.value as string)
            }}
            fullWidth
            size='small'/>
    </>
}

export class UseResource implements NanoCodeTemplate {
    namespace?: string;
    resource?: string;

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

    label: string = 'Use Resource';

    apply(ast: Program): void {
        applyUseResourceModifier(ast, {
            resource: this.resource!,
            namespace: this.namespace!,
        })
    }

    renderParams() {
        return <RenderParams
            type={this.namespace ? this.namespace + '/' + this.resource : undefined}
            onChange={type => {
                this.applyType(type)
            }}/>
    }

    private applyType(type: string) {
        const [namespace, resource] = type!.split('/')

        this.namespace = namespace
        this.resource = resource
    }
}