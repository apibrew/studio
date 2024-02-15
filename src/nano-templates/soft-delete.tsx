import React from "react";
import {NanoCodeTemplate} from "./abs";
import toast from "react-hot-toast";
import {Resource} from "@apibrew/react";
import {Box, FormLabel, MenuItem, Select} from "@mui/material";
import {sortedProperties} from "../util/property";
import {ResourceSelect} from "../components/ResourceSelect";
import {NanoAstModifier} from "../logic/nano-ast/NanoAstModifier";
import {ResourceHandlerType} from "../logic/nano-ast/abs";

export interface RenderParamsProps {
    resource: Resource | undefined
    softDeleteProperty?: string
    onResourceChange: (resource: Resource | undefined) => void
    onSoftDeletePropertyChange: (property: string | undefined) => void
}

function RenderParams(props: RenderParamsProps) {
    const [resource, setResource] = React.useState<Resource | undefined>(props.resource)
    const [property, setProperty] = React.useState<string | undefined>(props.softDeleteProperty)

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
                    props.onSoftDeletePropertyChange(undefined)
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
                        props.onSoftDeletePropertyChange(e.target.value)
                    }}
                >
                    {properties.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
                </Select>
            </Box>
        </>}
    </>
}

export class SoftDelete implements NanoCodeTemplate {
    label: string = 'Soft Delete';

    resource?: Resource
    softDeleteProperty?: string = 'deleted';

    constructor(resource?: Resource) {
        this.resource = resource
    }

    apply(modifier: NanoAstModifier): boolean {
        if (!this.resource) {
            toast.error('Resource is required')
            return false
        }

        if (!this.softDeleteProperty) {
            toast.error('Property is required')
            return false
        }

        modifier.declareResource(this.resource)

        const resourceIdentifier = modifier.identifier(modifier.resourceName(this.resource))

        modifier.resourceHandler(this.resource, ResourceHandlerType.BEFORE_CREATE, methodModifier => { // Book.beforeCreate
            methodModifier.if(methodModifier.property(methodModifier.item(), this.softDeleteProperty!), sm => { // if (item.delete) {
                sm.throwError(`${modifier.resourceName(this.resource!)} cannot be created with deletion flag true`)
            })
        })

        modifier.resourceHandler(this.resource, ResourceHandlerType.BEFORE_UPDATE, methodModifier => {
            const getFn = methodModifier.property(resourceIdentifier, "get")
            const recordId = methodModifier.property(methodModifier.item(), "id")

            methodModifier.append(methodModifier.const('existing', methodModifier.callExpression(getFn, recordId)))
            methodModifier.newLine()

            methodModifier.if(methodModifier.property(methodModifier.identifier('existing'), this.softDeleteProperty!), sm => { // if (item.delete) {
                sm.throwError(`${modifier.resourceName(this.resource!)} not found or marked as deleted`)
            })
        })

        modifier.resourceHandler(this.resource, ResourceHandlerType.BEFORE_DELETE, methodModifier => { // Book.beforeCreate
            methodModifier.applyTemplate(`
            if (existing.deleted) {
                throw new Error('$item not found or marked as deleted')
            }
            
            existing.deleted = true;
            
            $resource.delete(existing);
            `, {
                $resource: modifier.resourceName(this.resource!),
                $item: methodModifier.itemName(),
            })
        })

        return true
    }

    renderParams() {
        return <RenderParams
            resource={this.resource}
            softDeleteProperty={this.softDeleteProperty}
            onResourceChange={resource => {
                this.resource = resource
            }}
            onSoftDeletePropertyChange={property => {
                this.softDeleteProperty = property
            }}
        />
    }
}