import {Checkbox, Table, TableBody, TableCell, TableHead, TableRow, Tooltip} from "@mui/material";
import React from "react";
import {Resource} from "@apibrew/react";
import Button from "@mui/material/Button";
import {PropertyCell} from "./PropertyCell";
import {isSpecialProperty} from "../../util/property";

export interface DataTableTableProps {
    resource: Resource
    records: any[]
    offset: number
}

export function DataTableTable(props: DataTableTableProps) {
    const properties = Object.keys(props.resource.properties).filter(item => {
        if (isSpecialProperty(props.resource.properties[item])) {
            return false
        }
        return true
    })

    return <Table size='small'>
        <TableHead>
            <TableRow>
                <TableCell width='10px'>
                    <Checkbox size='small'/>
                </TableCell>
                <TableCell sx={{
                    minWidth: '80px'
                }}>Id</TableCell>
                {properties.map(property => (
                    <TableCell key={property}>{property}</TableCell>
                ))}
            </TableRow>
        </TableHead>
        <TableBody>
            {props.records.map((record, index) => (
                <TableRow key={record.id}>
                    <TableCell sx={{
                        whiteSpace: 'nowrap',
                    }}>
                        <Checkbox size='small'/>
                    </TableCell>
                    <TableCell>
                        <Tooltip title={record.id}>
                            <Button variant='text' onClick={() => {
                                console.log(record)
                            }}>{record.id.substring(0, 8)}</Button>
                        </Tooltip>
                    </TableCell>
                    {properties.map(property => (
                        <PropertyCell property={props.resource.properties[property]}
                                      value={record[property]}
                                      key={property}/>
                    ))}
                </TableRow>
            ))}
        </TableBody>
    </Table>
}