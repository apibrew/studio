import React from "react";
import {NanoCodeTemplate} from "./abs";
import {ResourceSelect} from "../../ResourceSelect";
import toast from "react-hot-toast";
import {Resource} from "@apibrew/react";
import {FormLabel} from "@mui/material";
import {NanoAstModifier} from "../../../logic/nano-ast/NanoAstModifier";

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

    label: string = 'Use Resource';

    apply(modifier: NanoAstModifier): boolean {
        if (!this.resource) {
            toast.error('Resource is required')
            return false
        }

        modifier.declareResource(this.resource)

        return true
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