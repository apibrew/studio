import {Checkbox, TableCell, TableRow} from "@mui/material";
import {PropertyCell} from "./PropertyCell";
import React from "react";
import {Entity} from "@apibrew/client";
import {Resource} from "@apibrew/react";

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
    return <TableRow>
        <TableCell>
            {props.index}
        </TableCell>
        <TableCell>
            <Checkbox checked={props.selected}
                      onChange={() => props.onSelected(!props.selected)}
                      size='small'/>
        </TableCell>
        {props.properties.map(property => (
            <PropertyCell
                key={property}
                property={props.resource.properties[property]}
                value={props.record[property]}
                onUpdate={value => {
                    props.onUpdate({
                        ...props.updated,
                        [property]: value
                    })
                }}
                updated={props.updated[property]}/>
        ))}
    </TableRow>
}