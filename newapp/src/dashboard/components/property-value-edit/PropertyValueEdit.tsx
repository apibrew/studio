import {Property, Resource} from "@apibrew/client/model";
import {Type} from "@apibrew/client/model/resource";
import {coalesce} from "../data-table/table/util.ts";
import {ReferenceValueSelectorSimple} from "../ReferenceValueSelectorSimple.tsx";
import {CustomPropertyValueEdit} from "./CustomPropertyValueEdit.tsx";

export interface PropertyValueEditProps {
    resource: Resource
    property: Property
    propertyName: string
    value: any
    onChange: (value: any) => void
    onForceOpenChange?: (forceOpen: boolean) => void
    autoOpen?: boolean
}

export function PropertyValueEdit(props: PropertyValueEditProps) {
    switch (props.property.type) {
        case Type.BOOL:
            return <input type='checkbox'
                          style={{
                              width: '25px',
                          }}
                          checked={props.value}
                          autoFocus={Boolean(props.autoOpen)}
                          className='property-edit-input'
                          onChange={e => {
                              props.onChange(e.target.checked)
                          }}/>
        case Type.INT32:
        case Type.INT64:
            return <input type='number'
                          value={coalesce(props.value, '')}
                          autoFocus={Boolean(props.autoOpen)}
                          className='property-edit-input'
                          onChange={e => {
                              if (e.target.value === '') {
                                  props.onChange(undefined)
                              } else {
                                  props.onChange(parseInt(e.target.value))
                              }
                          }}/>
        case Type.FLOAT32:
        case Type.FLOAT64:
            return <input type='number'
                          value={coalesce(props.value, '')}
                          autoFocus={Boolean(props.autoOpen)}
                          className='property-edit-input'
                          onChange={e => {
                              if (e.target.value === '') {
                                  props.onChange(undefined)
                              } else {
                                  props.onChange(parseFloat(e.target.value))
                              }
                          }}/>
        case Type.STRING:
        case Type.UUID:
            return <input type='text'
                          style={{
                              width: '100%',
                          }}
                          value={coalesce(props.value, '')}
                          autoFocus={Boolean(props.autoOpen)}
                          className='property-edit-input'
                          onChange={e => {
                              props.onChange(e.target.value)
                          }}/>
        case Type.ENUM:
            return <select value={coalesce(props.value, '')}
                           autoFocus={Boolean(props.autoOpen)}
                           style={{
                               height: '30px',
                           }}
                           className='property-edit-input'
                           onChange={e => {
                               props.onChange(e.target.value)
                           }}>
                <option value={undefined}>---</option>
                {props.property.enumValues?.map((v, i) => {
                    return <option key={i} value={v}>{v}</option>
                })}
            </select>
        case Type.OBJECT:
        case Type.STRUCT:
        case Type.BYTES:
        case Type.LIST:
        case Type.DATE:
        case Type.MAP:
        case Type.TIME:
        case Type.TIMESTAMP:
            return <CustomPropertyValueEdit
                resource={props.resource}
                property={props.property}
                propertyName={props.propertyName}
                value={props.value}
                onChange={props.onChange}
            />
        case Type.REFERENCE:
            if (!props.property.reference) {
                return <>Reference is not specified yet</>
            }
            if (props.property.reference === 'storage/File') {
                return <CustomPropertyValueEdit
                    resource={props.resource}
                    property={props.property}
                    propertyName={props.propertyName}
                    value={props.value}
                    onChange={props.onChange}
                />
            }
            return <ReferenceValueSelectorSimple
                autoFocus={Boolean(props.autoOpen)}
                className='property-edit-input-reference'
                sx={{
                    margin: 0,
                    display: 'inline-block',
                    verticalAlign: 'text-bottom',
                    '& .MuiSelect-select': {
                        margin: 0,
                    }
                }}
                value={coalesce(props.value, '')}
                onChange={e => {
                    props.onChange(e)
                }}
                reference={props.property.reference}
                required={props.property.required}
            />
    }

}
