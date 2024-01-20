import {PropertyValue} from "./PropertyValue";
import React, {useMemo} from "react";
import {Resource} from "@apibrew/react";
import {Schema} from "../../types/schema";
import {Type} from "@apibrew/client/model/resource";
import {leftSpace} from "./util";

export interface StructValueProps {
    resource: Resource
    schema: Schema
    value: any
    isInline?: boolean
    path: string
    depth: number
    onChange: (updated: any) => void
}

export function StructValue(props: StructValueProps) {
    const properties = useMemo(() => {
        const properties = Object.keys(props.schema.properties)

        return properties
    }, [props.schema])

    if (props.value === undefined) {
        return <span
            itemRef={props.path}
            property={JSON.stringify(props.value) + ''}
            style={{
                color: 'red'
            }}>undefined</span>
    }

    const value = props.value || {}

    return <span itemRef={props.path}
                 property={JSON.stringify(props.value)}>
        {properties.map((item, index) => {
            const property = props.schema.properties[item]
            let propertyValue = <PropertyValue
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

            const isSub = (value[item] !== undefined) && (property.type === Type.LIST || property.type === Type.MAP || property.type === Type.STRUCT || property.type === Type.REFERENCE)

            return <>
                <span>
                {(!props.isInline || index > 0) && leftSpace(props.depth)}
                    <span key={item}
                          style={{
                              whiteSpace: 'nowrap'
                          }}>
                    <span className='property-key'>{item}: </span>
                        {!isSub && propertyValue}
                    </span>
                    {isSub && <div>
                        {propertyValue}
                    </div>}
                </span>
                <div/>
            </>
        })}
    </span>
}