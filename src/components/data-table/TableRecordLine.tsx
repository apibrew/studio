import {Checkbox, IconButton, TableCell, TableRow} from "@mui/material";
import {PropertyCell} from "./PropertyCell";
import React from "react";
import {Entity} from "@apibrew/client";
import {Resource} from "@apibrew/react";
import {DeleteForever} from "@mui/icons-material";

export interface TableRecordLineProps {
    index: number
    resource: Resource
    properties: string[]
    record: Entity & any
    selected: boolean
    onSelected: (selected: boolean) => void
    updated: Entity & any
    onUpdate: (updated: Entity & any) => void
}

export function TableRecordLine(props: TableRecordLineProps) {
    const edited = Object.keys(props.updated).length > 0 || props.record.id === 'new'
    return <TableRow>
        <TableCell>
            {props.index}
        </TableCell>
        <TableCell>
            {!edited && <Checkbox checked={props.selected}
                                  onChange={() => props.onSelected(!props.selected)}
                                  size='small'/>}
            {edited && <IconButton onClick={() => {
                props.onUpdate(undefined)
            }}>
                <DeleteForever/>
            </IconButton>}
        </TableCell>
        {props.properties.map(property => (
            <PropertyCell
                key={property}
                property={props.resource.properties[property]}
                value={props.record[property]}
                onUpdate={value => {
                    console.log('updated', property, value)
                    props.onUpdate({
                        ...props.updated,
                        [property]: value
                    })
                }}
                updated={props.updated[property]}/>
        ))}
    </TableRow>
}