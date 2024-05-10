import {Property} from "@apibrew/client/model";
import {Resource} from "@apibrew/react";
import {Schema} from "../../types/schema";
import {Type} from "@apibrew/client/model/resource";
import {ReferenceValue} from "./ReferenceValue";
import {ListValue} from "./ListValue";
import {StructValue} from "./StructValue";
import {ObjectValue} from "./ObjectValue";

import {MapValue} from "./MapValue";
import {TextField} from "@mui/material";

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

export function PropertyValue(props: PropertyValueProps) {
    switch (props.property.type) {
        case Type.INT32:
        case Type.INT64:
        case Type.FLOAT32:
        case Type.FLOAT64:
        case Type.BOOL:
        case Type.STRING:
        case Type.UUID:
            return <TextField
                fullWidth
                disabled={props.property.immutable}
                sx={{
                    margin: 0,
                    padding: 0,
                    display: 'inline-block',
                    verticalAlign: 'bottom',
                    '& .MuiInput-input': {
                        padding: 0,
                        margin: 0,
                    }
                }}
                value={props.value || ''}
                variant='standard'
                onChange={e => {
                    props.onChange(e.target.value)
                }}
            />
        case Type.DATE:
            return <input type='date' value={props.value || ''}
                          autoFocus
                          disabled={props.property.immutable}
                          className='property-edit-input'
                          onChange={e => {
                              props.onChange(e.target.value)
                          }}
                          onBlur={e => {
                              props.onChange(e.target.value)
                          }}/>
        case Type.TIME:
            return <input type='time' value={props.value || ''}
                          autoFocus
                          disabled={props.property.immutable}
                          className='property-edit-input'
                          onChange={e => {
                              props.onChange(e.target.value)
                          }}
                          onBlur={e => {
                              let value = e.target.value

                              if (value.length === 5) {
                                  value = value + ':00'
                              }

                              props.onChange(value)
                          }}/>
        case Type.TIMESTAMP:
            return <input type='datetime-local' value={props.value || ''}
                          autoFocus
                          disabled={props.property.immutable}
                          className='property-edit-input'
                          onChange={e => {
                              props.onChange(e.target.value)
                          }}
                          onBlur={e => {
                              let value = e.target.value

                              if (value.length === 16) {
                                  value = value + ':00Z'
                              }

                              props.onChange(value)
                          }}/>
        case Type.ENUM:
            return <select value={props.value || ''}
                           disabled={props.property.immutable}
                           className='property-edit-input'
                           onChange={e => {
                               props.onChange(e.target.value)
                           }}
                           onBlur={e => {
                               props.onChange(e.target.value)
                           }}>
                <option value={undefined}>---</option>
                {props.property.enumValues?.map((v, i) => {
                    return <option key={i} value={v}>{v}</option>
                })}
            </select>
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
