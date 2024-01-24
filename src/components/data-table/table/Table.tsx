import {Box, Checkbox, IconButton, Tooltip} from "@mui/material";
import React, {useEffect, useMemo, useState} from "react";
import {Resource} from "@apibrew/react";
import {Add, MoreVert, Remove} from "@mui/icons-material";
import {TableDnd} from "./TableDnd";
import {TableResize} from "./TableResize";
import {TableRecordLine} from "./TableRecordLine";
import {isSpecialProperty, sortedProperties} from "../../../util/property";

import './Table.scss'
import {Schema} from "../../../types/schema";
import {ensureGivenPropertiesOrder} from "../../../util/resource";

export interface DataTableTableProps {
    resource: Resource
    schema: Schema
    updateSchema: (schema: Schema) => void
    records: any[]
    updates: { [key: string]: any }
    setUpdates: (updates: { [key: string]: any }) => void
    offset: number
    selectedItems: string[]
    setSelectedItems: (selectedItems: string[]) => void
    onAddColumnClick: () => void
    onEditColumnClick: (property: string) => void
}

export function DataTableTable(props: DataTableTableProps) {
    const [properties, setProperties] = useState<string[]>([])
    const [tableWidth, setTableWidth] = useState<number>(0)

    const [columnWidths, setColumnWidths] = useState<{ [key: string]: number }>({} as any)
    const [expandedRecords, setExpandedRecords] = useState<{ [key: string]: boolean }>({} as any)

    useEffect(() => {
        const newProperties = sortedProperties(props.schema.properties).filter(property => !isSpecialProperty(props.schema.properties[property]))

        if (props.schema.properties.id && newProperties.indexOf('id') === -1) {
            newProperties.unshift('id')
        }

        setProperties(newProperties)

    }, [props.schema]);

    useEffect(() => {
        let modifiedWidth = columnWidths
        properties.forEach(property => {
            if (!columnWidths[property]) {
                let defaultWidth = 250

                if (property === 'id') {
                    defaultWidth = 100
                }

                modifiedWidth = {
                    ...modifiedWidth,
                    [property]: defaultWidth
                }
            }
        })
        setColumnWidths({
            ...columnWidths,
            ...modifiedWidth
        })

        setTableWidth(Object.values(modifiedWidth).reduce((acc, item) => acc + item, 0))
    }, [properties]);

    const tableDnd = useMemo(() => {
        return new TableDnd(props.schema, properties)
    }, [props.schema, properties])

    const tableResize = useMemo(() => {
        return new TableResize(props.schema, properties)
    }, [props.schema, properties])

    tableDnd.onReorderProperties(updatedProperties => {
        ensureGivenPropertiesOrder(props.schema, updatedProperties)
        props.updateSchema(props.schema)
    })

    tableResize.onResize((property, width) => {
        setColumnWidths({
            ...columnWidths,
            [property]: width
        })

        setTableWidth(Object.values(columnWidths).reduce((acc, item) => acc + item, 0))
    })

    const selectionIdMap = useMemo<{ [key: string]: boolean }>(() => {
        return props.selectedItems.reduce((acc, item) => {
            acc[item] = true
            return acc
        }, {} as any)
    }, [props.selectedItems])

    const allExpanded = useMemo(() => {
        return Object.keys(expandedRecords).length === props.records.length
    }, [props.records, expandedRecords])

    if (properties.length === 0) return <></>

    return <Box className='data-table-table' display='flex' flexDirection='column' width='1px' overflow='scroll'>
        <Box display='block' minWidth={Math.max(500, 200 * properties.length + 85)} width={(tableWidth + 85) + 'px'}>
            <Box display='flex' flexDirection='row' className='row row-header'>
                <Box width='75px' className='cell header-cell'>
                    <Box className='cell-inner'>
                        <Checkbox checked={props.selectedItems.length === props.records.length}
                                  sx={{
                                      padding: 0
                                  }}
                                  indeterminate={props.selectedItems.length > 0 && props.selectedItems.length < props.records.length}
                                  onChange={() => {
                                      if (props.selectedItems.length === props.records.length) {
                                          props.setSelectedItems([])
                                      } else {
                                          props.setSelectedItems(props.records.map(item => item.id))
                                      }
                                  }}
                                  size='small'/>
                        <Tooltip title={'Expand/Unexpand all records'}>
                            <IconButton onClick={() => {
                                if (Object.keys(expandedRecords).length === props.records.length) {
                                    setExpandedRecords({})
                                } else {
                                    const newExpandedRecords = {} as any
                                    props.records.forEach(record => {
                                        newExpandedRecords[record.id] = true
                                    })
                                    setExpandedRecords(newExpandedRecords)
                                }
                            }}>
                                {allExpanded && <Remove/>}
                                {!allExpanded && <Add/>}
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
                {properties.map((property, index) => {
                    return <Box className='property-th draggable-cell cell header-cell'
                                display='flex'
                                draggable
                                property={property}
                                onDragStart={tableDnd.onDragStart.bind(tableDnd)}
                                onDragEnter={tableDnd.onDragEnter.bind(tableDnd)}
                                onDragLeave={tableDnd.onDragLeave.bind(tableDnd)}
                                onDragEnd={tableDnd.onDragEnd.bind(tableDnd)}
                                onDragOver={tableDnd.onDragOver.bind(tableDnd)}
                                onDrop={tableDnd.onDrop.bind(tableDnd)}
                                style={{
                                    flexBasis: columnWidths[property] + 'px'
                                }}
                                key={property}>
                        <>
                            <Box className='cell-inner'>
                                <Box className='property-name'>
                                    {property}
                                    {props.schema.properties[property].required && <span style={{
                                        marginLeft: '1px',
                                        color: 'red'
                                    }}>*</span>}
                                </Box>
                                <Box flexGrow={1}/>
                                <Box className='property-actions'>
                                    <IconButton
                                        size='small'
                                        onClick={() => {
                                            props.onEditColumnClick(property)
                                        }}>
                                        <MoreVert/>
                                    </IconButton>
                                </Box>
                            </Box>
                            {tableResize.renderResizeDiv(properties[index])}
                        </>
                    </Box>
                })}
                <Box width='50px' className='cell header-cell'>
                    <IconButton
                        size='small'
                        onClick={() => {
                            props.onAddColumnClick()
                        }}>
                        <Add/>
                    </IconButton>
                </Box>
            </Box>
            <Box display='flex' flexGrow={1} flexDirection='column'>
                <Box display='flex' flexDirection='column'>
                    {props.records.map((record, index) => (
                        <TableRecordLine key={record.id}
                                         new={record.id === 'new'}
                                         columnWidths={columnWidths}
                                         resource={props.resource}
                                         schema={props.schema}
                                         selected={Boolean(selectionIdMap[record.id])}
                                         properties={properties}
                                         onSelected={selected => {
                                             if (!selected) {
                                                 props.setSelectedItems(props.selectedItems.filter(item => item !== record.id))
                                             } else {
                                                 props.setSelectedItems([...props.selectedItems, record.id])
                                             }
                                         }}
                                         index={props.offset + index + 1}
                                         expanded={Boolean(expandedRecords[record.id])}
                                         onExpanded={expanded => {
                                             if (expanded) {
                                                 setExpandedRecords({
                                                     ...expandedRecords,
                                                     [record.id]: true
                                                 })
                                             } else {
                                                 const newExpandedRecords = {...expandedRecords}
                                                 delete newExpandedRecords[record.id]
                                                 setExpandedRecords(newExpandedRecords)
                                             }
                                         }}
                                         onUpdate={(updated) => {
                                             if (updated) {
                                                 props.setUpdates({
                                                     ...props.updates,
                                                     [record.id]: updated
                                                 })
                                             } else {
                                                 const newUpdates = {...props.updates}
                                                 delete newUpdates[record.id]
                                                 props.setUpdates(newUpdates)
                                             }
                                         }}
                                         updated={props.updates[record.id] ?? {}}
                                         record={record}/>
                    ))}
                </Box>
            </Box>
        </Box>
    </Box>
}