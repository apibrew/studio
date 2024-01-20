import {Box, Checkbox, Collapse, IconButton} from "@mui/material";
import {PropertyCell} from "./PropertyCell";
import React from "react";
import {Entity} from "@apibrew/client";
import {Resource} from "@apibrew/react";
import {Add, DeleteForever, Remove} from "@mui/icons-material";
import {Schema} from "../../../types/schema";
import {RecordExpand} from "./RecordExpand";

export interface TableRecordLineProps {
    index: number
    resource: Resource
    schema: Schema
    properties: string[]
    record: Entity & any
    selected: boolean
    onSelected: (selected: boolean) => void
    expanded: boolean
    onExpanded: (expanded: boolean) => void
    updated: Entity & any
    onUpdate: (updated: Entity & any) => void
    columnWidths: { [key: string]: number }
}

export function TableRecordLine(props: TableRecordLineProps) {
    const edited = Object.keys(props.updated).length > 0 || props.record.id === 'new'

    return <>
        <Box display='flex' flexDirection='row' className='row row-body'>
            <Box width='75px' className='cell body-cell'>
                <Box className='cell-inner'>
                    {!edited && <Checkbox checked={props.selected}
                                          sx={{
                                              padding: 0
                                          }}
                                          onChange={() => props.onSelected(!props.selected)}
                                          size='small'/>}
                    {edited && <IconButton onClick={() => {
                        props.onUpdate(undefined)
                    }}>
                        <DeleteForever/>
                    </IconButton>}
                    <IconButton onClick={() => {
                        props.onExpanded(!props.expanded)
                    }}>
                        {props.expanded && <Remove/>}
                        {!props.expanded && <Add/>}
                    </IconButton>
                </Box>
            </Box>
            {props.properties.map(property => (
                <PropertyCell
                    key={property}
                    resource={props.resource}
                    width={props.columnWidths[property]}
                    propertyName={property}
                    property={props.schema.properties[property]}
                    record={props.record}
                    value={props.record[property]}
                    onUpdate={value => {
                        console.log('updated', property, value)
                        props.onUpdate({
                            ...props.updated,
                            [property]: value
                        })
                    }}
                    updated={props.updated[property]}
                />
            ))}
            <Box width='50px'></Box>
        </Box>
        <Box className='row-expand'>
            <Collapse in={props.expanded}>
                <RecordExpand resource={props.resource}
                              value={props.record}
                              updated={props.updated}
                              onUpdate={props.onUpdate}/>
            </Collapse>
        </Box>
    </>
}