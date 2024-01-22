import {SchemaProperty} from "./SchemaProperty";
import React, {useMemo} from "react";
import {getPropertyOrder, isSpecialProperty, sortedProperties} from "../../../util/property";
import {Schema} from "../../../types/schema";
import {Resource} from "@apibrew/react";
import {ArrowDownward, ArrowUpward, Delete} from "@mui/icons-material";
import {IconButton, Tooltip} from "@mui/material";
import {Property} from "@apibrew/client/model";

export interface SchemaPropertiesProps {
    resource: Resource
    schema: Schema
    setSchema: (schema: Schema) => void
}

export function SchemaProperties(props: SchemaPropertiesProps) {
    const properties = useMemo(() => sortedProperties(props.schema.properties), [props.schema.properties])

    function moveProperty(index: number, propertyName: string, property: Property, dist: number) {
        const prevPropertyName = properties[index + dist]
        const prevProperty = props.schema.properties[prevPropertyName]

        props.setSchema({
            ...props.schema,
            properties: {
                ...props.schema.properties,
                [propertyName]: {
                    ...property,
                    annotations: {
                        ...property.annotations,
                        Order: getPropertyOrder(prevPropertyName, prevProperty) + ''
                    }
                },
                [prevPropertyName]: {
                    ...prevProperty,
                    annotations: {
                        ...prevProperty.annotations,
                        Order: getPropertyOrder(propertyName, property) + ''
                    }
                }
            } as any
        })
    }

    return <>
        {properties.map((propertyName, index) => {
            const property = props.schema.properties[propertyName]
            return (
                <SchemaProperty
                    index={index}
                    resource={props.resource}
                    propertyName={propertyName}
                    setPropertyName={(updatedPropertyName) => {
                        const property = props.schema.properties[propertyName]
                        if (property) {
                            delete props.schema.properties[propertyName]
                        }
                        props.schema.properties[updatedPropertyName] = property
                        props.setSchema({
                            ...props.schema,
                            properties: {
                                ...props.schema.properties
                            }
                        })
                    }}
                    property={property}
                    onChange={(property) => {
                        props.setSchema({
                            ...props.schema,
                            properties: {
                                ...props.schema.properties,
                                [propertyName]: property
                            }
                        })
                    }}
                    actions={<>
                        {!isSpecialProperty(property) && <>
                            <IconButton
                                color='info'
                                size='small'
                                disabled={index === 0}
                                onClick={() => {
                                    moveProperty(index, propertyName, property, -1);
                                }}
                            >
                                <Tooltip title='Move Up'>
                                    <ArrowUpward fontSize='small'/>
                                </Tooltip>
                            </IconButton>
                            <IconButton
                                color='info'
                                size='small'
                                onClick={() => {
                                    moveProperty(index, propertyName, property, 1);
                                }}
                            >
                                <Tooltip title='Move Down'>
                                    <ArrowDownward fontSize='small'/>
                                </Tooltip>
                            </IconButton>
                            <IconButton
                                color='error'
                                size='small'
                                onClick={() => {
                                    delete props.schema.properties[propertyName]
                                    props.setSchema({
                                        ...props.schema,
                                        properties: {
                                            ...props.schema.properties
                                        }
                                    })
                                }}
                            >
                                <Tooltip title='Delete'>
                                    <Delete fontSize='small'/>
                                </Tooltip>
                            </IconButton>
                        </>}
                    </>}
                />
            )
        })}
    </>
}
