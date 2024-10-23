import {Box, Checkbox, IconButton, Menu} from "@mui/material";
import {useEffect, useMemo, useState} from "react";
import {Resource, useRepository} from "@apibrew/react";
import {Add, MoreVert} from "@mui/icons-material";
import {TableDnd} from "./TableDnd";
import {TableResize} from "./TableResize";
import {TableRecordLine} from "./TableRecordLine";
import {isSpecialProperty, sortedProperties} from "../../../../util/property";

import './Table.scss'
import {Schema} from "../../../../types/schema";
import {ensureGivenPropertiesOrder} from "../../../../util/resource";
import {ResourceEntityInfo, Type} from "@apibrew/client/model/resource";
import {LoadingOverlay} from "common";
import {toTitleCase} from "../../../../util/case.ts";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import {useDrawer} from "../../../../hooks/use-drawer.tsx";
import {openMultiDrawer} from "../../multi-drawer/MultiDrawer.tsx";
import {propertyDrawerMultiDrawer} from "../../property-drawer/PropertyDrawer.tsx";
import {useAnalytics} from "../../../hooks/use-analytics.ts";
import {useConfirmation} from "../../../../components/modal/use-confirmation.tsx";

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
    reload: () => void
    loading?: boolean
}

export function DataTableTable(props: DataTableTableProps) {
    let [wi, setWi] = useState<number>(0)
    const [tableWidth, setTableWidth] = useState<number>(0)
    const drawer = useDrawer()
    const confirmation = useConfirmation()
    const analytics = useAnalytics()
    const [columnWidths, setColumnWidths] = useState<{ [key: string]: number }>({} as any)
    const resourceRepository = useRepository<Resource>(ResourceEntityInfo)

    const properties = useMemo(() => {
        const newProperties = sortedProperties(props.schema.properties).filter(property => !isSpecialProperty(props.schema.properties[property]))

        if (props.schema.properties.id && newProperties.indexOf('id') === -1) {
            newProperties.unshift('id')
        }

        return newProperties

    }, [props.resource, props.schema, wi]);

    // menu anchor
    const [columnMenuAnchor, setColumnMenuAnchor] = useState<null | HTMLElement>(null)
    const [selectedProperty, setSelectedProperty] = useState<string | null>(null)

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

        setTableWidth(Object.values(modifiedWidth).reduce((acc, item) => acc + item, 0) + 115)
    }, [properties]);

    const tableDnd = useMemo(() => {
        return new TableDnd(props.schema, properties)
    }, [props.schema, properties])

    const tableResize = useMemo(() => {
        return new TableResize()
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

        setTableWidth(Object.values(columnWidths).reduce((acc, item) => acc + item, 0) + 65)
    })

    const selectionIdMap = useMemo<{ [key: string]: boolean }>(() => {
        return props.selectedItems.reduce((acc, item) => {
            acc[item] = true
            return acc
        }, {} as any)
    }, [props.selectedItems])

    if (properties.length === 0) return <></>

    return <Box className='data-table-table' display='flex' height='100%' flexDirection='column' width='1px'>
        {drawer.render()}
        {confirmation.render()}
        <Box display='flex' flexDirection='column' height='100%' minWidth={Math.max(500, 100 * properties.length + 85)}
             width={(tableWidth + 85) + 'px'}>


            <Box display='flex' flexDirection='row' className='row row-header'>
                <Box width='82px' className='cell header-cell action-cell'>
                    <Box className='cell-inner'>
                        <Checkbox className="check-icon1"
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
                    let propertyName = toTitleCase(property)

                    if (property == 'id') {
                        propertyName = 'ID'
                    }

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
                                    flexBasis: columnWidths[property] + 'px',
                                    flexShrink: 0
                                }}
                                key={property}>
                        <>
                            <Box className='cell-inner'>
                                <Box className='property-name'>
                                    {propertyName}
                                    {/*{props.schema.properties[property].required && <span style={{*/}
                                    {/*    marginLeft: '1px',*/}
                                    {/*    color: 'red'*/}
                                    {/*}}>*</span>}*/}
                                </Box>
                                <Box flexGrow={1}/>
                                <Box className='property-actions'>
                                    <IconButton
                                        size='small'
                                        onClick={(e) => {
                                            setSelectedProperty(property)
                                            setColumnMenuAnchor(e.currentTarget)
                                        }}>
                                        <MoreVert/>
                                    </IconButton>
                                </Box>
                            </Box>
                            {tableResize.renderResizeDiv(properties[index])}
                        </>
                    </Box>
                })}
                <Menu
                    id="column-menu"
                    anchorEl={columnMenuAnchor}
                    open={Boolean(columnMenuAnchor)}
                    onClose={() => {
                        setColumnMenuAnchor(null)
                        setSelectedProperty(null)
                    }}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <MenuItem onClick={() => {
                        openMultiDrawer(drawer, propertyDrawerMultiDrawer(resourceRepository, selectedProperty!, false, props.resource, () => {
                            props.reload()
                            setWi(wi + 1)
                        }))

                        setColumnMenuAnchor(null)
                        setSelectedProperty(null)
                    }}>Update</MenuItem>
                    <MenuItem onClick={() => {
                        confirmation.open({
                            kind: 'danger',
                            title: 'Delete Property: ' + selectedProperty!,
                            message: 'Are you sure you want to delete this resource?',
                            onConfirm: () => {
                                const updatedProperties = {...props.resource.properties}
                                delete updatedProperties[selectedProperty!]

                                props.updateSchema({
                                    ...props.schema,
                                    properties: updatedProperties,
                                })
                            },
                        })
                        setColumnMenuAnchor(null)
                        setSelectedProperty(null)
                    }}>Delete</MenuItem>
                </Menu>
                <Box width='40px' className='plus-icon1 cell header-cell'>
                    <Button
                        color='primary'
                        size='small'
                        onClick={() => {
                            analytics.click('action', 'add-column-open')
                            openMultiDrawer(drawer, propertyDrawerMultiDrawer(resourceRepository, 'prop-' + Object.keys(props.resource.properties).length + 1, true, props.resource, () => {
                                props.reload()
                                setWi(wi + 1)
                            }))
                        }}>
                        <Add/>
                    </Button>
                </Box>
            </Box>

            {props.loading && <LoadingOverlay/>}
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


                <Box display='flex' flexDirection='row' className='row row-body footer-row'>
                    <Box width='300px' className='cell body-cell'>
                        <Box className='cell-inner add-new-record'>
                            <Button size='small'
                                    variant='text'
                                    onClick={() => {
                                        props.records.unshift({id: 'new', properties: {}})
                                        props.setUpdates({
                                            ...props.updates,
                                            'new': {}
                                        })
                                    }}>
                                <Add/>
                                <span>Add new record</span>
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box>
}
