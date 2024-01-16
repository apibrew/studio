import {Box, Checkbox, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip} from "@mui/material";
import React, {useMemo, useState} from "react";
import {Resource} from "@apibrew/react";
import Button from "@mui/material/Button";
import {PropertyCell} from "./PropertyCell";
import {isSpecialProperty} from "../../util/property";
import {ExpandMore} from "@mui/icons-material";
import {TableDnd} from "./TableDnd";

export interface DataTableTableProps {
    resource: Resource
    records: any[]
    offset: number
}

export function DataTableTable(props: DataTableTableProps) {

    const [properties, setProperties] = useState(
        Object.keys(props.resource.properties)
            .filter(item => !isSpecialProperty(props.resource.properties[item]))
    )

    const tableDnd = useMemo(() => {
        return new TableDnd(props.resource, properties)
    }, [props.resource])

    tableDnd.onReorderProperties(updatedProperties => {
        setProperties(updatedProperties)
    })


    return <Table size='small'>
        <TableHead>
            <TableRow>
                <TableCell width='10px'>
                    #
                </TableCell>
                <TableCell width='10px'>
                    <Checkbox size='small'/>
                </TableCell>
                <TableCell sx={{
                    minWidth: '80px'
                }}>Id</TableCell>
                {properties.map(property => (
                    <TableCell className='property-th draggable-cell'
                               draggable
                               property={property}
                               onDragStart={tableDnd.onDragStart.bind(tableDnd)}
                               onDragEnter={tableDnd.onDragEnter.bind(tableDnd)}
                               onDragLeave={tableDnd.onDragLeave.bind(tableDnd)}
                               onDragEnd={tableDnd.onDragEnd.bind(tableDnd)}
                               onDragOver={tableDnd.onDragOver.bind(tableDnd)}
                               onDrop={tableDnd.onDrop.bind(tableDnd)}
                               key={property}>
                        <Box display='flex'>
                            <Box className='property-name'>
                                {property}
                            </Box>
                            <Box flexGrow={1}/>
                            <Box className='property-actions'>
                                <IconButton>
                                    <ExpandMore/>
                                </IconButton>
                            </Box>
                        </Box>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
        <TableBody>
            {props.records.map((record, index) => (
                <TableRow key={record.id}>
                    <TableCell>
                        {props.offset + index + 1}
                    </TableCell>
                    <TableCell>
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