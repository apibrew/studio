import {Resource} from "@apibrew/react";
import {Box, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {sortedProperties} from "../../../util/property";
import {SchemaProperty} from "./SchemaProperty";
import Button from "@mui/material/Button";
import {Type} from "@apibrew/client/model/resource";
import {Property} from "@apibrew/client/model";
import {Add} from "@mui/icons-material";
import React from "react";

export interface SchemaProps {
    resource: Resource
    setResource: (resource: Resource) => void
    onTriggerUpdate: () => void
}

export function SchemaTable(props: SchemaProps) {
    const properties = sortedProperties(props.resource.properties)

    return <Box m={1}>
        <Table size='small'>
            <TableHead>
                <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Property Name</TableCell>
                    <TableCell>Property Type</TableCell>
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
                        <TableCell colSpan={6}>
                            <b>Type:</b> {type.name}

                            <Button color='success'
                                    style={{
                                        marginLeft: '10px'
                                    }}
                                    size='small'
                                    onClick={() => {
                                        const newProperty: Property = {
                                            type: Type.STRING,
                                        } as Property

                                        props.setResource({
                                            ...props.resource,
                                            types: props.resource.types?.map((t) => {
                                                if (t.name === type.name) {
                                                    return {
                                                        ...t,
                                                        properties: {
                                                            ...t.properties,
                                                            [`new-property-${Math.floor(Math.random() * 1000000)}`]: newProperty
                                                        }
                                                    }
                                                }
                                                return t
                                            })
                                        })
                                    }}>
                                <Add fontSize='small'/>
                                <span style={{marginLeft: '3px'}}>Add</span>
                            </Button>
                        </TableCell>
                        <TableCell>

                        </TableCell>

                        {properties.map((propertyName, index) => {
                            const property = type.properties[propertyName]

                            return (
                                <SchemaProperty
                                    index={index}
                                    propertyName={propertyName}
                                    setPropertyName={(propertyName) => {
                                        const property = type.properties[propertyName]
                                        if (property) {
                                            delete type.properties[propertyName]
                                            type.properties[propertyName] = property
                                        }
                                        props.setResource({
                                            ...props.resource,
                                            types: props.resource.types?.map((t) => {
                                                if (t.name === type.name) {
                                                    return {
                                                        ...t,
                                                        properties: {
                                                            ...t.properties
                                                        }
                                                    }
                                                }
                                                return t
                                            })
                                        })
                                    }}
                                    property={property}
                                    onChange={(property) => {
                                        props.setResource({
                                            ...props.resource,
                                            types: props.resource.types?.map((t) => {
                                                if (t.name === type.name) {
                                                    return {
                                                        ...t,
                                                        properties: {
                                                            ...t.properties,
                                                            [propertyName]: property
                                                        }
                                                    }
                                                }
                                                return t
                                            })
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