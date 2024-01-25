import {Property} from "@apibrew/client/model";
import {Resource} from "@apibrew/react";
import {Schema} from "../../types/schema";
import {Type} from "@apibrew/client/model/resource";
import {ReferenceValue} from "./ReferenceValue";
import {ListValue} from "./ListValue";
import {StructValue} from "./StructValue";
import {ObjectValue} from "./ObjectValue";
import React from "react";
import {isSpecialProperty} from "../../util/property";
import {PropertyValueView} from "../property-value-view/PropertyValueView";
import {PropertyValueEdit} from "../property-value-edit/PropertyValueEdit";
import {MapValue} from "./MapValue";

export interface PropertyValueProps {
    resource: Resource
    property: Property
    new: boolean
    value: any
    path: string
    depth: number
    isInline?: boolean
    onChange: (updated: any) => void
}

function propertyValueSwitch(props: PropertyValueProps) {
    switch (props.property.type) {
        case Type.STRING:
        case Type.INT32:
        case Type.INT64:
        case Type.FLOAT32:
        case Type.FLOAT64:
        case Type.ENUM:
        case Type.UUID:
            return <PropertyValueView property={props.property} value={props.value}/>
        case Type.BOOL:
            return props.value ? 'true' : 'false'
        case Type.OBJECT:
            return <ObjectValue {...props}/>
        case Type.REFERENCE:
            return <ReferenceValue {...props}/>
        case Type.LIST:
            return <ListValue {...props}/>
        case Type.STRUCT:
            const subSchema = props.resource.types?.find(item => item.name === props.property.typeRef) as Schema

            if (!subSchema) throw new Error(`Could not find schema for ${props.property.typeRef}`)

            return <StructValue resource={props.resource}
                                new={props.new}
                                schema={subSchema}
                                value={props.value}
                                path={props.path}
                                depth={props.depth}
                                isInline={props.isInline}
                                onChange={(updated) => {
                                    props.onChange(updated)
                                }}/>
        default:
            return <span>Unknown type: {props.property.type}</span>
    }
}

function propertyEditValueSwitch(props: PropertyValueProps, setEditMode: (editMode: boolean) => void) {
    switch (props.property.type) {
        case Type.INT32:
        case Type.INT64:
        case Type.FLOAT32:
        case Type.FLOAT64:
        case Type.STRING:
        case Type.ENUM:
        case Type.UUID:
        case Type.DATE:
        case Type.TIME:
        case Type.TIMESTAMP:
        case Type.BOOL:
            return <PropertyValueEdit autoOpen={true} property={props.property} value={props.value} onChange={props.onChange}/>
        case Type.OBJECT:
            return <ObjectValue {...props}/>
        case Type.REFERENCE:
            return <ReferenceValue {...props}/>
        case Type.LIST:
            return <ListValue {...props}/>
        case Type.MAP:
            return <MapValue {...props}/>
        case Type.STRUCT:
            const subSchema = props.resource.types?.find(item => item.name === props.property.typeRef) as Schema

            if (!subSchema) throw new Error(`Could not find schema for ${props.property.typeRef}`)

            return <StructValue resource={props.resource}
                                new={props.new}
                                schema={subSchema}
                                value={props.value}
                                path={props.path}
                                isInline={props.isInline}
                                depth={props.depth}
                                onChange={(updated) => {
                                    props.onChange(updated)
                                }}/>
        default:
            return <span>Unknown type: {props.property.type}</span>
    }
}

export function PropertyValue(props: PropertyValueProps) {
    const [editMode, setEditMode] = React.useState<boolean>(props.new || props.value === null)
    let editModeAllowed = true

    if (isSpecialProperty(props.property)) {
        editModeAllowed = false
    }

    if (!props.new) {
        if (props.property.immutable) {
            editModeAllowed = false
        }

        if (props.resource.immutable) {
            editModeAllowed = false
        }
    }

    if (props.property.type === Type.LIST) {
        editModeAllowed = false
    }

    if (props.property.type === Type.STRUCT && props.value !== undefined) {
        editModeAllowed = false
    }

    return <>
        {!editMode && propertyValueSwitch(props)}
        {editMode && propertyEditValueSwitch(props, (editMode) => {
            if (!props.new && props.value !== null) {
                setEditMode(editMode)
            }
        })}
        {!props.new && editModeAllowed && <span
            className='unselectable cell-hand'
            style={{
                marginLeft: '5px',
                color: 'red'
            }}
            onClick={() => {
                if (props.value === undefined) {
                    props.onChange(null)
                }
                setEditMode(!editMode)
            }}>
            (edit)
        </span>}
    </>

}