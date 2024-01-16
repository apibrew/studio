import {Box, Checkbox, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip} from "@mui/material";
import React, {useMemo, useState} from "react";
import {Resource} from "@apibrew/react";
import {PropertyCell} from "./PropertyCell";
import {isSpecialProperty} from "../../util/property";
import {ExpandMore} from "@mui/icons-material";
import {TableDnd} from "./TableDnd";
import {TableResize} from "./TableResize";

export interface DataTableTableProps {
    resource: Resource
    records: any[]
    offset: number
}

export function DataTableTable(props: DataTableTableProps) {
    const [properties, setProperties] = useState(
        [
            'id',
            ...Object.keys(props.resource.properties)
                .filter(item => !isSpecialProperty(props.resource.properties[item]))
        ]
    )
    const [columnWidths, setColumnWidths] = useState<{ [key: string]: number }>({} as any)

    const tableDnd = useMemo(() => {
        return new TableDnd(props.resource, properties)
    }, [props.resource])

    const tableResize = useMemo(() => {
        return new TableResize(props.resource, properties)
    }, [props.resource])

    tableDnd.onReorderProperties(updatedProperties => {
        setProperties(updatedProperties)
    })

    tableResize.onResize((property, width) => {
        setColumnWidths({
            ...columnWidths,
            [property]: width
        })
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
                {properties.map((property, index) => (
                    <TableCell className='property-th draggable-cell'
                               draggable
                               property={property}
                               onDragStart={tableDnd.onDragStart.bind(tableDnd)}
                               onDragEnter={tableDnd.onDragEnter.bind(tableDnd)}
                               onDragLeave={tableDnd.onDragLeave.bind(tableDnd)}
                               onDragEnd={tableDnd.onDragEnd.bind(tableDnd)}
                               onDragOver={tableDnd.onDragOver.bind(tableDnd)}
                               onDrop={tableDnd.onDrop.bind(tableDnd)}
                               width={columnWidths[property] ? columnWidths[property] + 'px' : 'auto'}
                               key={property}>
                        <Box display='flex'>
                            {index > 0 && tableResize.renderResizeDiv(properties[index - 1])}
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