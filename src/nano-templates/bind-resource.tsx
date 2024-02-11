import React, {useState} from "react";
import {NanoCodeTemplate} from "./abs";
import toast from "react-hot-toast";
import {Resource} from "@apibrew/react";
import {Box, FormLabel} from "@mui/material";
import {ExpressionStatement, Pattern} from "acorn";
import {ResourceSelect} from "../components/ResourceSelect";
import {NanoAstModifier} from "../logic/nano-ast/NanoAstModifier";
import {ResourceBinderType} from "../logic/nano-ast/abs";
import {NanoAstMethodModifier} from "../logic/nano-ast/NanoAstMethodModifier";
import {sortedProperties} from "../util/property";

export interface RenderParamsProps {
    resource: Resource | undefined
    boundResource: Resource | undefined
    onResourceChange: (resource: Resource | undefined) => void
    onBoundResourceChange: (resource: Resource | undefined) => void
}

function RenderParams(props: RenderParamsProps) {
    const [resource, setResource] = useState<Resource | undefined>(props.resource)
    const [boundResource, setBoundResource] = useState<Resource | undefined>(props.boundResource)
    return <>
        <Box>
            <FormLabel>Resource:</FormLabel>
            <ResourceSelect
                value={resource ? (resource.namespace.name + '/' + resource.name) : undefined}
                onChange={(e, resource) => {
                    setResource(resource)
                    props.onResourceChange(resource)
                }}
                fullWidth
                size='small'/>
            <FormLabel>Bound to Resource:</FormLabel>
            <ResourceSelect
                value={boundResource ? (boundResource.namespace.name + '/' + boundResource.name) : undefined}
                onChange={(e, resource) => {
                    setBoundResource(resource)
                    props.onBoundResourceChange(resource)
                }}
                fullWidth
                size='small'/>
        </Box>
    </>
}

export class BindResource implements NanoCodeTemplate {
    label: string = 'Bind Resource to other Resource';

    resource?: Resource
    boundResource?: Resource

    constructor(resource?: Resource) {
        this.resource = resource
    }

    apply(modifier: NanoAstModifier): boolean {
        if (!this.resource) {
            toast.error('Resource is required')
            return false
        }

        if (!this.boundResource) {
            toast.error('Bound Resource is required')
            return false
        }

        modifier.declareResource(this.resource)
        modifier.declareResource(this.boundResource)

        const mapToMethodName = `map${modifier.resourceName(this.resource)}To${modifier.resourceName(this.boundResource)}`
        const mapFromMethodName = `map${modifier.resourceName(this.boundResource)}To${modifier.resourceName(this.resource)}`

        modifier.declareFunction(mapToMethodName, [modifier.resourceItemName(this.resource)], methodModifier => {
            this.prepareMapperMethod(methodModifier, modifier.resourceItemName(this.resource!), modifier.resourceItemName(this.boundResource!), this.resource!, this.boundResource!)
        })

        modifier.declareFunction(mapFromMethodName, [modifier.resourceItemName(this.boundResource)], methodModifier => {
            this.prepareMapperMethod(methodModifier, modifier.resourceItemName(this.boundResource!), modifier.resourceItemName(this.resource!), this.boundResource!, this.resource!)
        })

        modifier.resourceBind(this.resource, this.boundResource, ResourceBinderType.CREATE, mapFromMethodName, mapToMethodName)
        modifier.resourceBind(this.resource, this.boundResource, ResourceBinderType.UPDATE, mapFromMethodName, mapToMethodName)
        modifier.resourceBind(this.resource, this.boundResource, ResourceBinderType.DELETE, mapFromMethodName, mapToMethodName)
        modifier.resourceBind(this.resource, this.boundResource, ResourceBinderType.GET, mapFromMethodName, mapToMethodName)
        modifier.resourceBind(this.resource, this.boundResource, ResourceBinderType.LIST, mapFromMethodName, mapToMethodName)

        return true
    }

    prepareMapperMethod(modifier: NanoAstMethodModifier, fromItemName: string, toItemName: string, fromResource: Resource, toResource: Resource) {
        const properties = sortedProperties(fromResource.properties)

        modifier.prepend(modifier.let(toItemName, modifier.object()))

        for (const property of properties) {
            const fromProperty = fromResource.properties[property]
            const toProperty = toResource.properties[property]

            if (toProperty && toProperty.type === fromProperty.type) {
                modifier.append({
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        left: modifier.property(modifier.identifier(toItemName), property),
                        right: modifier.property(modifier.identifier(fromItemName), property) as Pattern,
                        operator: "="
                    }
                } as ExpressionStatement)
            }
        }

        modifier.append(modifier.return(modifier.identifier(toItemName)))
    }

    renderParams() {
        return <RenderParams
            resource={this.resource}
            boundResource={this.boundResource}
            onResourceChange={resource => {
                this.resource = resource
            }}
            onBoundResourceChange={resource => {
                this.boundResource = resource
            }}
        />
    }
}