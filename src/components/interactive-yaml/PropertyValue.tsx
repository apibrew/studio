import {Property} from "@apibrew/client/model";
import {Resource} from "@apibrew/react";
import {Schema} from "../../types/schema";
import {Type} from "@apibrew/client/model/resource";
import {ReferenceValue} from "./ReferenceValue";
import {ListValue} from "./ListValue";
import {StructValue} from "./StructValue";
import {ObjectValue} from "./ObjectValue";
import {IconButton} from "@mui/material";
import {Edit} from "@mui/icons-material";
import React from "react";
import {isSpecialProperty} from "../../util/property";

export interface PropertyValueProps {
    resource: Resource
    property: Property
    value: any
    onChange: (updated: any) => void
}

function propertyValueSwitch(props: PropertyValueProps) {
    switch (props.property.type) {
        case Type.STRING:
        case Type.INT32:
        case Type.INT64:
        case Type.FLOAT32:
        case Type.FLOAT64:
        case Type.BOOL:
        case Type.ENUM:
        case Type.UUID:
            return props.value
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
                                onChange={(updated) => {
                                    props.onChange(updated)
                                }}/>
        default:
            return <span>Unknown type: {props.property.type}</span>
    }
}

export function PropertyValue(props: PropertyValueProps) {
    const [editMode, setEditMode] = React.useState<boolean>(false)
    const editModeAllowed = !isSpecialProperty(props.property) && !props.property.immutable && props.property.type !== Type.LIST

    return <>
        {!editMode && propertyValueSwitch(props)}
        {editMode && propertyEditValueSwitch(props, setEditMode)}
        {editModeAllowed && <IconButton size='small'
                                        onClick={() => {
                                            if (editMode && props.value === undefined) {
                                                props.onChange(null)
                                            }
                                            setEditMode(!editMode)
                                        }}>
            {!editMode && <Edit fontSize='small'/>}
            {/*{editMode && <Save fontSize='small'/>}*/}
        </IconButton>}
    </>

}