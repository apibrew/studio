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

export interface PropertyValueProps {
    resource: Resource
    property: Property
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
            return props.value
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
                                schema={subSchema}
                                value={props.value}
                                path={props.path}
                                depth={props.depth + 1}
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
            return <input type='number'
                          autoFocus
                          onBlur={() => {
                              setEditMode(false)
                          }}
                          style={{
                              width: '300px'
                          }}
                          value={props.value || 0}
                          onChange={event => {
                              props.onChange(parseInt(event.target.value))
                          }}/>
        case Type.FLOAT32:
        case Type.FLOAT64:
            return <input type='number'
                          autoFocus
                          onBlur={() => {
                              setEditMode(false)
                          }}
                          style={{
                              width: '300px'
                          }}
                          value={props.value || 0}
                          onChange={event => {
                              props.onChange(parseFloat(event.target.value))
                          }}/>
        case Type.STRING:
        case Type.ENUM:
        case Type.UUID:
            return <input type='text'
                          autoFocus
                          onBlur={() => {
                              setEditMode(false)
                          }}
                          style={{
                              width: '300px'
                          }}
                          value={props.value}
                          onChange={event => {
                              props.onChange(event.target.value)
                          }}/>
        case Type.BOOL:
            return <input type='checkbox'
                          autoFocus
                          onBlur={() => {
                              setEditMode(false)
                          }}
                          style={{
                              width: '300px'
                          }}
                          checked={props.value}
                          onChange={event => {
                              props.onChange(event.target.checked)
                          }}/>
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
                                schema={subSchema}
                                value={props.value}
                                path={props.path}
                                isInline={props.isInline}
                                depth={props.depth + 1}
                                onChange={(updated) => {
                                    props.onChange(updated)
                                }}/>
        default:
            return <span>Unknown type: {props.property.type}</span>
    }
}

export function PropertyValue(props: PropertyValueProps) {
    const [editMode, setEditMode] = React.useState<boolean>(props.value === null)
    let editModeAllowed = true

    if (isSpecialProperty(props.property)) {
        editModeAllowed = false
    }

    if (props.property.immutable) {
        editModeAllowed = false
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
            if (props.value !== null) {
                setEditMode(editMode)
            }
        })}
        {editModeAllowed && <span
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