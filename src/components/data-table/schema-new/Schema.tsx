import {Resource} from "@apibrew/react";
import {Box, Card, CardContent, CardHeader, IconButton} from "@mui/material";
import React, {useMemo} from "react";
import {SubType} from "@apibrew/client/model/resource-action";
import {Add, ChevronRight, DatasetLinked, ExpandMore, Remove, ShoppingBag} from "@mui/icons-material";
import {TreeItem, TreeView} from "@mui/x-tree-view";
import {getPropertyOrder, sortedProperties} from "../../../util/property";
import {PropertyForm} from "../../property-form/PropertyForm";
import {SchemaPropertyTreeItem} from "./SchemaPropertyTreeItem";
import {ResourceForm} from "../../resource-form/ResourceForm";
import {SubTypesForm} from "../../sub-types-form/SubTypesForm";
import {Type} from "@apibrew/client/model/resource";
import {Property} from "@apibrew/client/model";
import {Schema} from "../../../types/schema";

enum SelectionType {
    PROPERTY,
    TYPE,
    INDEX,
    RESOURCE
}

export interface SchemaProps {
    resource: Resource
    setResource: (resource: Resource) => void
    onTriggerUpdate: () => void
}

export function SchemaTable(props: SchemaProps) {
    function updateType(typeName: string, updated: Partial<SubType>) {
        props.setResource({
            ...props.resource,
            types: props.resource.types?.map((t) => {
                if (t.name === typeName) {
                    return {
                        ...t,
                        ...updated,
                    }
                }
                return t
            })
        })
    }

    function moveProperty(properties: string[], index: number, schema: Schema, setSchema: (schema: Schema) => void, propertyName: string, property: Property, dist: number) {
        const prevPropertyName = properties[index + dist]
        const prevProperty = schema.properties[prevPropertyName]

        setSchema({
            ...schema,
            properties: {
                ...schema.properties,
                [propertyName]: {
                    ...property,
                    annotations: {
                        ...property.annotations,
                        Order: getPropertyOrder(prevPropertyName, prevProperty) + ''
                    }
                },
                [prevPropertyName]: {
                    ...prevProperty,
                    annotations: {
                        ...prevProperty.annotations,
                        Order: getPropertyOrder(propertyName, property) + ''
                    }
                }
            } as any
        })
    }

    const properties = useMemo(() => sortedProperties(props.resource.properties), [props.resource.properties])

    const [selectionType, setSelectionType] = React.useState<SelectionType>()
    const [selectedItem, setSelectedItem] = React.useState<string>()
    const [selectedTypeIndex, setSelectedTypeIndex] = React.useState<number>()
    const selectedType = props.resource.types![selectedTypeIndex as any]

    const typeNames = props.resource.types?.map(item => 'type-' + item.name) ?? []

    return <Box m={1} display='flex' flexDirection='row'>
        <Box flex={1}>
            <TreeView
                aria-label="file system navigator"
                expanded={['resource', 'properties', 'types', 'ResidentialData', 'indexes', ...typeNames]}
                defaultCollapseIcon={<ExpandMore/>}
                defaultExpandIcon={<ChevronRight/>}
            >
                <TreeItem
                    icon={<DatasetLinked/>}
                    nodeId="resource"
                    onClick={() => {
                        setSelectionType(SelectionType.RESOURCE)
                        setSelectedItem(undefined)
                        setSelectedTypeIndex(undefined)
                    }}
                    label={`Resource: ${props.resource.name}`}>
                    <TreeItem
                        onClick={() => {
                            setSelectionType(undefined)
                            setSelectedItem(undefined)
                            setSelectedTypeIndex(undefined)
                        }}
                        icon={<ShoppingBag/>}
                        nodeId="properties"
                        label={<>
                            <span style={{
                                display: 'inline-block',
                                minWidth: '433px'
                            }}>Properties</span>
                            <IconButton
                                onClick={() => {
                                    props.setResource({
                                        ...props.resource,
                                        properties: {
                                            ...props.resource.properties,
                                            [`new-property-${Math.floor(Math.random() * 100)}`]: {
                                                type: Type.STRING
                                            } as Property
                                        }
                                    })
                                }}
                                color='success'
                                size='small'>
                                <Add fontSize='small'/>
                            </IconButton>
                        </>}>
                        {properties.map((propertyName, index) => (
                            <SchemaPropertyTreeItem
                                resource={props.resource}
                                property={props.resource.properties[propertyName]}
                                path={'$'}
                                propertyName={propertyName}
                                isFirstChild={index === 0}
                                isLastChild={index === properties.length - 1}
                                onMoveUp={() => {
                                    moveProperty(properties, properties.indexOf(propertyName), props.resource, schema => {
                                        props.setResource({
                                            ...props.resource,
                                            ...schema
                                        })
                                    }, propertyName, props.resource.properties[propertyName], -1);
                                }}
                                onMoveDown={() => {
                                    moveProperty(properties, properties.indexOf(propertyName), props.resource, schema => {
                                        props.setResource({
                                            ...props.resource,
                                            ...schema
                                        })
                                    }, propertyName, props.resource.properties[propertyName], 1);
                                }}
                                onRemove={() => {
                                    const newProperties = {...props.resource.properties}
                                    delete newProperties[propertyName]
                                    props.setResource({
                                        ...props.resource,
                                        properties: newProperties
                                    })
                                }}
                                onClick={() => {
                                    setSelectionType(SelectionType.PROPERTY)
                                    setSelectedItem(propertyName)
                                    setSelectedTypeIndex(undefined)
                                }}/>
                        ))}
                    </TreeItem>
                    <TreeItem
                        icon={<ShoppingBag/>}
                        nodeId="types"
                        onClick={() => {
                            setSelectionType(undefined)
                            setSelectedItem(undefined)
                            setSelectedTypeIndex(undefined)
                        }}
                        label={<>
                            <span style={{
                                display: 'inline-block',
                                minWidth: '433px'
                            }}>Types</span>
                            <IconButton onClick={() => {
                                props.setResource({
                                    ...props.resource,
                                    types: [
                                        ...(props.resource.types || []),
                                        {
                                            name: `new-type-${Math.floor(Math.random() * 100)}`,
                                            properties: {}
                                        } as SubType
                                    ]
                                })
                            }} color='success' size='small'>
                                <Add fontSize='small'/>
                            </IconButton>
                        </>}>
                        {props.resource.types?.map((type, index) => {
                            const properties = sortedProperties(type.properties)
                            return (
                                <TreeItem
                                    icon={<ShoppingBag/>}

                                    nodeId={'type-' + type.name}
                                    label={<>
                                        <span style={{
                                            display: 'inline-block',
                                            width: '416px'
                                        }}>Type: {type.name}</span>
                                        <IconButton
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                updateType(type.name, {
                                                    properties: {
                                                        ...type.properties,
                                                        [`new-property-${Math.floor(Math.random() * 100)}`]: {
                                                            type: Type.STRING
                                                        } as Property
                                                    }
                                                })
                                            }}
                                            color='success'
                                            size='small'>
                                            <Add fontSize='small'/>
                                        </IconButton>
                                        <IconButton onClick={(e) => {
                                            e.stopPropagation()

                                            const newTypes = [...props.resource.types!]

                                            newTypes.splice(index, 1)

                                            props.setResource({
                                                ...props.resource,
                                                types: newTypes
                                            })
                                        }} color='error' size='small'>
                                            <Remove fontSize='small'/>
                                        </IconButton>
                                    </>}

                                    onClick={() => {
                                        setSelectionType(SelectionType.TYPE)
                                        setSelectedItem(type.name)
                                        setSelectedTypeIndex(undefined)
                                    }}>
                                    {properties.map((propertyName, index) => {
                                        return (
                                            <SchemaPropertyTreeItem
                                                resource={props.resource}
                                                property={type.properties[propertyName]}
                                                path={'$.' + type.name}
                                                propertyName={propertyName}
                                                isFirstChild={index === 0}
                                                isLastChild={index === properties.length - 1}
                                                onMoveUp={() => {
                                                    moveProperty(properties, properties.indexOf(propertyName), type, schema => {
                                                        updateType(type.name, schema)
                                                    }, propertyName, type.properties[propertyName], -1);
                                                }}
                                                onMoveDown={() => {
                                                    moveProperty(properties, properties.indexOf(propertyName), type, schema => {
                                                        updateType(type.name, schema)
                                                    }, propertyName, type.properties[propertyName], 1);
                                                }}
                                                onRemove={() => {
                                                    const newProperties = {...type.properties}
                                                    delete newProperties[propertyName]
                                                    updateType(type.name, {
                                                        properties: newProperties
                                                    })
                                                }}
                                                onClick={() => {
                                                    setSelectionType(SelectionType.PROPERTY)
                                                    setSelectedItem(propertyName)
                                                    setSelectedTypeIndex(0)
                                                }}/>
                                        )
                                    })}
                                </TreeItem>
                            )
                        })}
                    </TreeItem>
                    {/*<TreeItem*/}
                    {/*    icon={<ShoppingBag/>}*/}
                    {/*    nodeId="indexes"*/}
                    {/*    label={<>*/}
                    {/*        <span style={{*/}
                    {/*            display: 'inline-block',*/}
                    {/*            minWidth: '433px'*/}
                    {/*        }}>Indexes</span>*/}
                    {/*        <IconButton color='success' size='small'>*/}
                    {/*            <Add fontSize='small'/>*/}
                    {/*        </IconButton>*/}
                    {/*    </>}*/}
                    {/*>*/}
                    {/*    {props.resource.indexes?.map((index, idx) => {*/}
                    {/*        return (*/}
                    {/*            <TreeItem*/}
                    {/*                icon={<ShoppingBag/>}*/}
                    {/*                nodeId={'index-' + idx}*/}
                    {/*                label={index.properties.map(item => item.name).join(', ') + (index.unique ? ' (unique)' : '')}>*/}
                    {/*            </TreeItem>*/}
                    {/*        )*/}
                    {/*    })}*/}
                    {/*</TreeItem>*/}
                </TreeItem>
            </TreeView>
        </Box>
        <Box flex={1}>
            {selectionType === SelectionType.PROPERTY && selectedItem && <>
                <Card>
                    <CardHeader
                        title={'Edit Property: ' + (selectedType ? selectedType?.name + '/' + selectedItem : selectedItem)}/>
                    <CardContent>
                        {!selectedType && props.resource.properties[selectedItem] &&
                            <PropertyForm resource={props.resource}
                                          new={true}
                                          propertyName={selectedItem}
                                          onChangeName={updatedPropertyName => {
                                              const newProperties = {...props.resource.properties}
                                              const property = newProperties[selectedItem]

                                              if (updatedPropertyName !== selectedItem && newProperties[updatedPropertyName]) {
                                                  return
                                              }

                                              if (property) {
                                                  delete newProperties[selectedItem]
                                              }
                                              newProperties[updatedPropertyName] = property

                                              props.setResource({
                                                  ...props.resource,
                                                  properties: newProperties
                                              })
                                              setSelectedItem(updatedPropertyName)
                                          }}
                                          property={props.resource.properties[selectedItem]}
                                          onChange={property => {
                                              props.setResource({
                                                  ...props.resource,
                                                  properties: {
                                                      ...props.resource.properties,
                                                      [selectedItem]: property
                                                  }
                                              })
                                          }}/>}
                        {selectedType && selectedType.properties[selectedItem] &&
                            <PropertyForm resource={props.resource}
                                          new={true}
                                          propertyName={selectedItem}
                                          onChangeName={updatedPropertyName => {
                                              const newProperties = {...selectedType.properties}
                                              const property = newProperties[selectedItem]

                                              if (updatedPropertyName !== selectedItem && newProperties[updatedPropertyName]) {
                                                  return
                                              }

                                              if (property) {
                                                  delete newProperties[selectedItem]
                                              }
                                              newProperties[updatedPropertyName] = property

                                              updateType(selectedType.name, {
                                                  properties: newProperties
                                              })
                                              setSelectedItem(updatedPropertyName)
                                          }}
                                          property={selectedType.properties[selectedItem]}
                                          onChange={property => {
                                              updateType(selectedType.name, {
                                                  properties: {
                                                      ...selectedType.properties,
                                                      [selectedItem]: property
                                                  }
                                              })
                                          }}/>}
                    </CardContent>
                </Card>
            </>}
            {selectionType === SelectionType.RESOURCE && <>
                <Card>
                    <CardHeader
                        title='Edit Resource details'/>
                    <CardContent>
                        <ResourceForm resource={props.resource} onChange={props.setResource}/>
                    </CardContent>
                </Card>
            </>}
            {selectionType === SelectionType.TYPE && selectedItem && <>
                <Card>
                    <CardHeader
                        title={'Edit Type: ' +  selectedItem}/>
                    <CardContent>
                        <SubTypesForm subType={props.resource.types?.find(item => item.name === selectedItem)!}
                                      onChange={updated => {
                                          updateType(selectedItem, updated)
                                          if (updated.name) {
                                              setSelectedItem(updated.name)
                                          }
                                      }}/>
                    </CardContent>
                </Card>
            </>}
        </Box>
    </Box>
}