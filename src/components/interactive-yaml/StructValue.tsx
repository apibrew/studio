import {PropertyValue} from "./PropertyValue";
import {Box, IconButton} from "@mui/material";
import React, {useMemo} from "react";
import {Resource} from "@apibrew/react";
import {Schema} from "../../types/schema";
import {Type} from "@apibrew/client/model/resource";
import {Edit, EditOff, ZoomOut} from "@mui/icons-material";

export interface StructValueProps {
    resource: Resource
    schema: Schema
    value: any
    onChange: (updated: any) => void
}

export function StructValue(props: StructValueProps) {
    const properties = useMemo(() => {
        const properties = Object.keys(props.schema.properties)

        return properties
    }, [props.schema])

    if (props.value === undefined) {
        return <></>
    }

    const value = props.value || {}

    return <Box>
        {properties.map(item => {
            const property = props.schema.properties[item]
            let propertyValue = <PropertyValue
                resource={props.resource}
                property={property}
                value={value[item]}
                onChange={updated => {
                    props.onChange({
                        ...value,
                        [item]: updated
                    })
                }}/>

            const isSub = (value[item] !== undefined) && (property.type === Type.LIST || property.type === Type.MAP || property.type === Type.STRUCT || property.type === Type.REFERENCE || property.type === Type.OBJECT)

            return <>
                <Box key={item}
                     display='flex'
                     flexDirection='row'>
                    <span className='property-key'>{item}: </span>
                    {!isSub && propertyValue}
                </Box>
                {isSub && <Box marginLeft='15px'>
                    {propertyValue}
                </Box>}
            </>
        })}
    </Box>
}