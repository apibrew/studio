import {Resource} from "@apibrew/react";
import {Box, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField} from "@mui/material";
import {sortedProperties} from "../../../util/property";
import {SchemaProperty} from "./SchemaProperty";
import React from "react";
import {SubType} from "@apibrew/client/model/resource-action";
import Button from "@mui/material/Button";
import {Property} from "@apibrew/client/model";
import {Type} from "@apibrew/client/model/resource";
import {Add, Delete, Remove} from "@mui/icons-material";

export interface SchemaProps {
    resource: Resource
    setResource: (resource: Resource) => void
    onTriggerUpdate: () => void
}

export function SchemaTable(props: SchemaProps) {
    const properties = sortedProperties(props.resource.properties)

    function updateType(typeName: string, updateFn: (type: SubType) => Partial<SubType>) {
        props.setResource({
            ...props.resource,
            types: props.resource.types?.map((t) => {
                const updated = updateFn(t)
                if (t.name === typeName) {
                    return {
                        ...t,
                        ...updated,
                    }
                }
                return t
            })
        })
    }

    return <Box m={1}>
        <Table size='small'>
            <TableHead>
                <TableRow>
                    <TableCell size='small'>#</TableCell>
                    <TableCell>Property Name</TableCell>
                    <TableCell>Property Type</TableCell>
                    <TableCell>Type Info</TableCell>
                    <TableCell width='20px'>Required</TableCell>
                    <TableCell width='20px'>Immutable</TableCell>
                    <TableCell width='20px'>Unique</TableCell>
                    <TableCell width='200px'>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell colSpan={6}>
                        <b>Properties:</b>
                    </TableCell>
                    <TableCell></TableCell>
                </TableRow>
                {properties.map((propertyName, index) => {
                    const property = props.resource.properties[propertyName]
                    return (
                        <SchemaProperty
                            index={index}
                            resource={props.resource}
                            propertyName={propertyName}
                            setPropertyName={(propertyName) => {
                                const property = props.resource.properties[propertyName]
                                if (property) {
                                    delete props.resource.properties[propertyName]
                                    props.resource.properties[propertyName] = property
                                }
                                props.setResource({
                                    ...props.resource,
                                    properties: {
                                        ...props.resource.properties
                                    }
                                })
                            }}
                            property={property}
                            onChange={(property) => {
                                props.setResource({
                                    ...props.resource,
                                    properties: {
                                        ...props.resource.properties,
                                        [propertyName]: property
                                    }
                                })
                            }}
                        />
                    )
                })}
                {props.resource.types && props.resource.types.map((type, index) => {
                    const properties = sortedProperties(type.properties)

                    return (<>
                        <TableCell colSpan={7}>
                            <IconButton color='error'
                                    style={{
                                        marginLeft: '15px'
                                    }}
                                    size='small'
                                    onClick={() => {
                                        props.setResource({
                                            ...props.resource,
                                            types: props.resource.types?.filter((t) => {
                                                return t.name !== type.name
                                            })
                                        })
                                    }}>
                                <Delete/>
                            </IconButton>
                            <TextField
                                variant={'filled'}
                                label='Type:'
                                value={type.name}
                                size='small'
                                onChange={(event) => {
                                    updateType(type.name, (type) => {
                                        return {
                                            name: event.target.value
                                        }
                                    })
                                }}/>
                        </TableCell>
                        <TableCell>
                            <Button color='success'
                                    style={{
                                        marginLeft: '50px'
                                    }}
                                    size='small'
                                    onClick={() => {
                                        const newProperty: Property = {
                                            type: Type.STRING,
                                        } as Property

                                        updateType(type.name, (type) => {
                                            return {
                                                properties: {
                                                    ...type.properties,
                                                    [`new-property-${Math.floor(Math.random() * 1000000)}`]: newProperty
                                                }
                                            }
                                        })
                                    }}>
                                <span style={{marginLeft: '3px'}}>Add Property</span>
                            </Button>
                        </TableCell>

                        {properties.map((propertyName, index) => {
                            const property = type.properties[propertyName]

                            return (
                                <SchemaProperty
                                    index={index}
                                    resource={props.resource}
                                    propertyName={propertyName}
                                    setPropertyName={(propertyName) => {
                                        const property = type.properties[propertyName]
                                        if (property) {
                                            delete type.properties[propertyName]
                                            type.properties[propertyName] = property
                                        }

                                        updateType(type.name, (type) => {
                                            return {
                                                properties: {
                                                    ...type.properties
                                                }
                                            }
                                        })
                                    }}
                                    property={property}
                                    onChange={(property) => {
                                        updateType(type.name, (type) => {
                                            return {
                                                properties: {
                                                    ...type.properties,
                                                    [propertyName]: property
                                                }
                                            }
                                        })
                                    }}
                                />
                            )
                        })}
                    </>)
                })}
            </TableBody>
        </Table>
    </Box>
}