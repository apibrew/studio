import React from "react";
import {Property} from "@apibrew/client/model";
import {Type} from "@apibrew/client/model/resource";
import {ReferenceValueSelector} from "../ReferenceValueSelector";
import {TagInput} from "../TagInput";

export interface PropertyValueEditProps {
    property: Property
    value: any
    onChange: (value: any) => void
    onForceClose?: () => void
    autoOpen?: boolean
}

export function PropertyValueEdit(props: PropertyValueEditProps) {
    const [updated, setUpdated] = React.useState<any>(props.value)

    switch (props.property.type) {
        case Type.BOOL:
            return <input type='checkbox'
                          style={{
                              width: '25px',
                          }}
                          checked={updated}
                          autoFocus
                          className='property-edit-input'
                          onChange={e => {
                              setUpdated(e.target.checked)
                          }}
                          onBlur={e => {
                              props.onChange(e.target.checked)
                          }}/>
        case Type.INT32:
        case Type.INT64:
            return <input type='number' value={updated || ''}
                          autoFocus
                          className='property-edit-input'
                          onChange={e => {
                              setUpdated(e.target.value)
                          }}
                          onBlur={e => {
                              props.onChange(parseInt(e.target.value))
                              setUpdated(parseInt(e.target.value))
                          }}/>
        case Type.FLOAT32:
        case Type.FLOAT64:
            return <input type='number' value={updated || ''}
                          autoFocus
                          className='property-edit-input'
                          onChange={e => {
                              setUpdated(e.target.value)
                          }}
                          onBlur={e => {
                              props.onChange(parseFloat(e.target.value))
                              setUpdated(parseFloat(e.target.value))
                          }}/>
        case Type.STRING:
            return <input value={updated || ''}
                          autoFocus
                          className='property-edit-input'
                          onChange={e => {
                              setUpdated(e.target.value)
                          }}
                          onBlur={e => {
                              props.onChange(e.target.value)
                          }}/>
        case Type.DATE:
            return <input type='date' value={updated || ''}
                          autoFocus
                          className='property-edit-input'
                          onChange={e => {
                              setUpdated(e.target.value)
                          }}
                          onBlur={e => {
                              props.onChange(e.target.value)
                          }}/>
        case Type.TIME:
            return <input type='time' value={updated || ''}
                          autoFocus
                          className='property-edit-input'
                          onChange={e => {
                              setUpdated(e.target.value)
                          }}
                          onBlur={e => {
                              let value = e.target.value

                              if (value.length === 5) {
                                  value = value + ':00'
                              }

                              props.onChange(value)
                          }}/>
        case Type.TIMESTAMP:
            return <input type='datetime-local' value={updated || ''}
                          autoFocus
                          className='property-edit-input'
                          onChange={e => {
                              setUpdated(e.target.value)
                          }}
                          onBlur={e => {
                              let value = e.target.value

                                if (value.length === 16) {
                                    value = value + ':00Z'
                                }

                                props.onChange(value)
                          }}/>
        case Type.ENUM:
            return <select value={updated || ''}
                           autoFocus
                           style={{
                               height: '30px',
                           }}
                           className='property-edit-input'
                           onChange={e => {
                               setUpdated(e.target.value)
                           }}
                           onBlur={e => {
                               props.onChange(e.target.value)
                           }}>
                <option value={undefined}>---</option>
                {props.property.enumValues?.map((v, i) => {
                    return <option key={i} value={v}>{v}</option>
                })}
            </select>
        case Type.LIST:
            return <TagInput
                autoOpen={Boolean(props.autoOpen)}
                value={updated || []}
                onChange={e => {
                    setUpdated(e)
                    props.onChange(e)
                }}
                onClose={() => {
                    if (props.onForceClose) {
                        props.onForceClose()
                    }
                }}
                inputPros={{}}/>
        case Type.REFERENCE:
            return <ReferenceValueSelector
                value={updated}
                onChange={e => {
                    setUpdated(e)
                    props.onChange(e)
                }}
                reference={props.property.reference}
                required={props.property.required}
            />
    }

    return <>not allowed</>
}
