import {PropertyValue} from "./PropertyValue";
import React, {useMemo} from "react";
import {Resource} from "@apibrew/react";
import {Schema} from "../../types/schema";
import {Type} from "@apibrew/client/model/resource";
import {sortedProperties} from "../../util/property";

export interface StructValueProps {
    resource: Resource
    schema: Schema
    new: boolean
    value: any
    isInline?: boolean
    path: string
    depth: number
    onChange: (updated: any) => void
}

export function StructValue(props: StructValueProps) {
    const properties = useMemo(() => sortedProperties(props.schema.properties), [props.schema.properties])

    if (props.value === undefined) {
        return <span
            itemRef={props.path}
            property={JSON.stringify(props.value) + ''}
            style={{
                color: 'red'
            }}>undefined</span>
    }

    const value = props.value || {}

    return <div
        style={{
            display: 'inline-block'
        }}
        itemRef={props.path}>
        {properties.map((item, index) => {
            const property = props.schema.properties[item]
            let propertyValue = <PropertyValue
                new={props.new}
                resource={props.resource}
                property={property}
                value={value[item]}
                depth={props.depth + 1}
                path={`${props.path}.${item}`}
                onChange={updated => {
                    props.onChange({
                        ...value,
                        [item]: updated
                    })
                }}/>

            const isSub = (value[item] !== undefined) && (property.type === Type.LIST || property.type === Type.MAP || property.type === Type.STRUCT)

            let propertyKeySuffix = ''

            switch (property.type) {
                case Type.LIST:
                    const length = (value[item] || []).length
                    propertyKeySuffix = `[${length}]`
                    break
                case Type.MAP:
                    propertyKeySuffix = '<>'
                    break
                case Type.STRUCT:
                    propertyKeySuffix = '{}'
                    break
            }


            return <div
                className='property-line'
                key={item}>
                <span>
                    <span key={item}
                          style={{
                              whiteSpace: 'nowrap'
                          }}>
                    <span className='property-key'>{item}<span
                        className='unselectable'>{propertyKeySuffix}</span>: </span>
                        {!isSub && propertyValue}
                    </span>
                    {isSub && <div>
                        {propertyValue}
                    </div>}
                </span>
            </div>
        })}
    </div>
}