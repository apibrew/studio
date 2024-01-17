import {Box, Checkbox, IconButton, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
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
    selectedItems: string[]
    setSelectedItems: (selectedItems: string[]) => void
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
    const [tableWidth, setTableWidth] = useState<number>(1000)

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

        // setTableWidth(Object.values(columnWidths).reduce((acc, item) => acc + item, 0))
    })

    const selectionIdMap = useMemo<{ [key: string]: boolean }>(() => {
        return props.selectedItems.reduce((acc, item) => {
            acc[item] = true
            return acc
        }, {} as any)
    }, [props.selectedItems])

    return <Table className='data-table-table' size='small' style={{
        // width: tableWidth + 'px'
    }}>
        <TableHead>
            <TableRow>
                <TableCell width='10px'>
                    #
                </TableCell>
                <TableCell width='10px'>
                    <Checkbox checked={props.selectedItems.length === props.records.length}
                              indeterminate={props.selectedItems.length > 0 && props.selectedItems.length < props.records.length}
                              onChange={() => {
                                  if (props.selectedItems.length === props.records.length) {
                                      props.setSelectedItems([])
                                  } else {
                                      props.setSelectedItems(props.records.map(item => item.id))
                                  }
                              }}
                              size='small'/>
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
                        <Checkbox checked={Boolean(selectionIdMap[record.id])}
                                  onChange={() => {
                                      if (selectionIdMap[record.id]) {
                                          props.setSelectedItems(props.selectedItems.filter(item => item !== record.id))
                                      } else {
                                          props.setSelectedItems([...props.selectedItems, record.id])
                                      }
                                  }}
                                  size='small'/>
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