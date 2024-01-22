import React from "react";
import {Property} from "@apibrew/client/model";
import {Type} from "@apibrew/client/model/resource";

export interface PropertyValueEditProps {
    property: Property
    value: any
    onChange: (value: any) => void
}

export function PropertyValueEdit(props: PropertyValueEditProps) {
    const [updated, setUpdated] = React.useState<any>(props.value)

    switch (props.property.type) {
        case Type.BOOL:
            return <input type='checkbox' checked={updated}
                          autoFocus
                          className='property-edit-input'
                          onChange={e => {
                              setUpdated(e.target.checked)
                              props.onChange(e.target.checked)
                          }}/>
        case Type.INT32:
        case Type.INT64:
            return <input type='number' value={updated || 0}
                          autoFocus
                          className='property-edit-input'
                          onChange={e => {
                              setUpdated(parseInt(e.target.value))
                              props.onChange(parseInt(e.target.value))
                          }}/>
        case Type.FLOAT32:
        case Type.FLOAT64:
            return <input type='number' value={updated || 0}
                          autoFocus
                          className='property-edit-input'
                          onChange={e => {
                              setUpdated(parseFloat(e.target.value))
                              props.onChange(parseFloat(e.target.value))
                          }}/>
        case Type.STRING:
            return <input value={updated || ''}
                          autoFocus
                          className='property-edit-input'
                          onChange={e => {
                              setUpdated(e.target.value)
                              props.onChange(e.target.value)
                          }}/>
    }

    return <></>
}
