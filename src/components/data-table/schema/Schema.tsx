import {Resource} from "@apibrew/react";
import {Box, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField} from "@mui/material";
import React from "react";
import {SubType} from "@apibrew/client/model/resource-action";
import Button from "@mui/material/Button";
import {Property} from "@apibrew/client/model";
import {Type} from "@apibrew/client/model/resource";
import {Delete} from "@mui/icons-material";
import {SchemaProperties} from "./SchemaProperties";

export interface SchemaProps {
    resource: Resource
    setResource: (resource: Resource) => void
    onTriggerUpdate: () => void
}

export function SchemaTable(props: SchemaProps) {
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
                    <TableCell sx={{
                        minWidth: '200px'
                    }}>Property Name</TableCell>
                    <TableCell width='20px'>Type</TableCell>
                    <TableCell width='20px'>Modifiers</TableCell>
                    <TableCell>Values</TableCell>
                    <TableCell width='200px'>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell colSpan={5}>
                        <b>Properties:</b>
                    </TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <SchemaProperties
                    resource={props.resource}
                    schema={props.resource}
                    setSchema={schema => {
                        console.log('updated Schema', schema)
                        props.setResource({
                            ...props.resource,
                            properties: schema.properties
                        })
                    }}/>
                {props.resource.types && props.resource.types.map((type, index) => {
                    return (<>
                        <TableCell colSpan={5}>
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

                        <SchemaProperties
                            resource={props.resource}
                            schema={type}
                            setSchema={schema => {
                                console.log('updated Schema', schema)
                                updateType(type.name, (type) => {
                                    return {
                                        properties: {
                                            ...schema.properties
                                        }
                                    }
                                })
                            }}/>
                    </>)
                })}
            </TableBody>
        </Table>
    </Box>
}