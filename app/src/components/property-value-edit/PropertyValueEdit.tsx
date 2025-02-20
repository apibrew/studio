import {Property} from "@apibrew/client/model";
import {Type} from "@apibrew/client/model/resource";
import {ReferenceValueSelector} from "../ReferenceValueSelector";
import {useState} from "react";

export interface PropertyValueEditProps {
    property: Property
    value: any
    onChange: (value: any) => void
    autoOpen?: boolean
}

export function isInlineEditSupported(property: Property): boolean {
    switch (property.type) {
        case Type.BOOL:
        case Type.INT32:
        case Type.INT64:
        case Type.FLOAT32:
        case Type.FLOAT64:
        case Type.STRING:
        case Type.DATE:
        case Type.TIME:
        case Type.TIMESTAMP:
        case Type.ENUM:
        case Type.REFERENCE:
            return true
    }
    return false
}

export function PropertyValueEdit(props: PropertyValueEditProps) {
    const [updated, setUpdated] = useState<any>(props.value)

    switch (props.property.type) {
        case Type.BOOL:
            return <input type='checkbox'
                          style={{
                              width: '25px',
                          }}
                          checked={updated}
                          autoFocus={Boolean(props.autoOpen)}
                          className='property-edit-input'
                          onChange={e => {
                              setUpdated(e.target.checked)
                          }}
                          onBlur={_ => {
                              props.onChange(updated)
                          }}/>
        case Type.INT32:
        case Type.INT64:
            return <input type='number' value={updated || ''}
                          autoFocus={Boolean(props.autoOpen)}
                          className='property-edit-input'
                          onChange={e => {
                              setUpdated(e.target.value)
                          }}
                          onBlur={_ => {
                              if (!updated) {
                                  setUpdated(undefined)
                                  return
                              }

                              props.onChange(parseInt(updated))
                          }}/>
        case Type.FLOAT32:
        case Type.FLOAT64:
            return <input type='number' value={updated || ''}
                          autoFocus={Boolean(props.autoOpen)}
                          className='property-edit-input'
                          onChange={e => {
                              setUpdated(e.target.value)
                          }}
                          onBlur={_ => {
                              if (!updated) {
                                  setUpdated(undefined)
                                  return
                              }
                              props.onChange(parseFloat(updated))
                              setUpdated(parseFloat(updated))
                          }}/>
        case Type.STRING:
            return <input value={updated || ''}
                          autoFocus={Boolean(props.autoOpen)}
                          className='property-edit-input'
                          onChange={e => {
                              setUpdated(e.target.value)
                          }}
                          onBlur={_ => {
                              props.onChange(updated)
                          }}/>
        case Type.DATE:
            return <input type='date' value={updated || ''}
                          autoFocus={Boolean(props.autoOpen)}
                          className='property-edit-input'
                          onChange={e => {
                              setUpdated(e.target.value)
                          }}
                          onBlur={_ => {
                              props.onChange(updated)
                          }}/>
        case Type.TIME:
            return <input type='time' value={updated || ''}
                          autoFocus={Boolean(props.autoOpen)}
                          className='property-edit-input'
                          onChange={e => {
                              setUpdated(e.target.value)
                          }}
                          onBlur={_ => {
                              if (!updated) {
                                  props.onChange(undefined)
                                  return
                              }

                              let value = updated

                              if (value.length === 5) {
                                  value = value + ':00'
                              }

                              props.onChange(value)
                          }}/>
        case Type.TIMESTAMP:
            return <input type='datetime-local' value={updated || ''}
                          autoFocus={Boolean(props.autoOpen)}
                          className='property-edit-input'
                          onChange={e => {
                              setUpdated(e.target.value)
                          }}
                          onBlur={_ => {
                              if (!updated) {
                                  props.onChange(undefined)
                                  return
                              }

                              let value = updated

                              if (value.length === 16) {
                                  value = value + ':00Z'
                              }

                              props.onChange(value)
                          }}/>
        case Type.ENUM:
            return <select value={updated || ''}
                           autoFocus={Boolean(props.autoOpen)}
                           style={{
                               height: '30px',
                           }}
                           className='property-edit-input'
                           onChange={e => {
                               setUpdated(e.target.value)
                           }}
                           onBlur={_ => {
                               if (!updated) {
                                   props.onChange(undefined)
                                   return
                               }

                               let value = updated

                               if (value.length === 0) {
                                   props.onChange(undefined)
                               } else {
                                   props.onChange(value)
                               }
                           }}>
                <option value={undefined}>---</option>
                {props.property.enumValues?.map((v, i) => {
                    return <option key={i} value={v}>{v}</option>
                })}
            </select>
        case Type.REFERENCE:
            if (!props.property.reference) {
                return <>Reference is not specified yet</>
            }
            return <ReferenceValueSelector
                autoFocus={Boolean(props.autoOpen)}
                sx={{
                    margin: 0,
                    padding: 0,
                    display: 'inline-block',
                    verticalAlign: 'text-bottom',
                    '& .MuiSelect-select': {
                        padding: 0,
                        margin: 0,
                    }
                }}
                value={updated}
                onChange={e => {
                    setUpdated(e)
                }}
                onBlur={() => {
                    props.onChange(updated)
                }}
                reference={props.property.reference}
                required={props.property.required}
            />
    }

    return <></>
}
