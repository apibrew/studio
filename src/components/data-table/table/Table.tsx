import {Box, Checkbox, IconButton} from "@mui/material";
import React, {useEffect, useMemo, useState} from "react";
import {Resource} from "@apibrew/react";
import {Add, MoreVert} from "@mui/icons-material";
import {TableDnd} from "./TableDnd";
import {TableResize} from "./TableResize";
import {TableRecordLine} from "./TableRecordLine";
import {getPropertyOrder, isSpecialProperty, sortedProperties} from "../../../util/property";

import './Table.scss'
import {Schema} from "../../../types/schema";
import {ensureGivenPropertiesOrder} from "../../../util/resource";
import {Type} from "@apibrew/client/model/resource";
import {LoadingOverlay} from "../../LoadingOverlay";

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
    loading?: boolean
}

export function DataTableTable(props: DataTableTableProps) {
    let [wi, setWi] = useState<number>(0)
    const [tableWidth, setTableWidth] = useState<number>(0)

    const [columnWidths, setColumnWidths] = useState<{ [key: string]: number }>({} as any)

    const properties = useMemo(() => {
        const newProperties = sortedProperties(props.schema.properties).filter(property => !isSpecialProperty(props.schema.properties[property]))

        if (props.schema.properties.id && newProperties.indexOf('id') === -1) {
            newProperties.unshift('id')
        }

        return newProperties

    }, [props.resource, props.schema, wi]);

    useEffect(() => {
        let modifiedWidth = columnWidths
        properties.forEach(property => {
            if (!columnWidths[property]) {
                let defaultWidth = 200

                if (property === 'id') {
                    defaultWidth = 100
                }

                const propertyType = props.resource.properties[property].type

                switch (propertyType) {
                    case Type.INT32:
                    case Type.INT64:
                    case Type.FLOAT32:
                    case Type.FLOAT64:
                    case Type.STRUCT:
                    case Type.BOOL:
                    case Type.OBJECT:
                        defaultWidth = 150
                        break;
                    case Type.ENUM:
                    case Type.DATE:
                    case Type.TIME:
                    case Type.TIMESTAMP:
                        defaultWidth = 150
                        break;
                }

                let propertyLength = property.length * 10
                if (defaultWidth < propertyLength) {
                    defaultWidth = propertyLength
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
        setWi(wi + 1)
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

    if (properties.length === 0) return <></>

    return <Box className='data-table-table' display='flex' flexDirection='column' width='1px' overflow='scroll'>
        <Box display='block' minWidth={Math.max(500, 100 * properties.length + 85)} width={(tableWidth + 85) + 'px'}>
            <Box display='flex' flexDirection='row' className='row row-header'>
                <Box width='75px' className='cell header-cell'>
                    <Box className='cell-inner'>
                        <Checkbox
                            checked={props.selectedItems.length > 0 && props.selectedItems.length === props.records.length}
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
            {props.loading && <LoadingOverlay/>}
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
                                         onUpdate={(updated) => {
                                             if (updated && Object.keys(updated).length > 0) {
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
