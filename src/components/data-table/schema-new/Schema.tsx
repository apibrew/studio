import {resource, Resource} from "@apibrew/react";
import {Box, Card, CardContent, CardHeader} from "@mui/material";
import React, {useMemo} from "react";
import {SubType} from "@apibrew/client/model/resource-action";
import {ChevronRight, DatasetLinked, ExpandMore, ShoppingBag} from "@mui/icons-material";
import {TreeItem, TreeView} from "@mui/x-tree-view";
import {sortedProperties} from "../../../util/property";
import {PropertyForm} from "../../property-form/PropertyForm";
import {SchemaPropertyTreeItem} from "./SchemaPropertyTreeItem";
import {ResourceForm} from "../../resource-form/ResourceForm";
import {SubTypesForm} from "../../sub-types-form/SubTypesForm";

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

    const properties = useMemo(() => sortedProperties(props.resource.properties), [props.resource.properties])

    const [selectionType, setSelectionType] = React.useState<SelectionType>()
    const [selectedItem, setSelectedItem] = React.useState<string>()
    const [selectedTypeIndex, setSelectedTypeIndex] = React.useState<number>()
    const selectedType = props.resource.types![selectedTypeIndex as any]

    return <Box m={1} display='flex' flexDirection='row'>
        <Box flex={1}>
            <TreeView
                aria-label="file system navigator"
                expanded={['resource', 'properties', 'types', 'ResidentialData', 'indexes']}
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
                        label="Properties">
                        {properties.map((propertyName) => (
                            <SchemaPropertyTreeItem
                                resource={props.resource}
                                property={props.resource.properties[propertyName]}
                                path={'$'}
                                propertyName={propertyName}
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
                        label="Types">
                        {props.resource.types?.map((type, index) => {
                            const properties = sortedProperties(type.properties)
                            return (
                                <TreeItem
                                    icon={<ShoppingBag/>}
                                    nodeId={'ResidentialData'}
                                    label={"Type: " + type.name}
                                    onClick={() => {
                                        setSelectionType(SelectionType.TYPE)
                                        setSelectedItem(type.name)
                                        setSelectedTypeIndex(undefined)
                                    }}>
                                    {properties.map((propertyName) => {
                                        return (
                                            <SchemaPropertyTreeItem
                                                resource={props.resource}
                                                property={type.properties[propertyName]}
                                                path={'$'}
                                                propertyName={propertyName}
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
                    <TreeItem
                        icon={<ShoppingBag/>}
                        nodeId="indexes"
                        label="Indexes">
                        {props.resource.indexes?.map((index, idx) => {
                            return (
                                <TreeItem
                                    icon={<ShoppingBag/>}
                                    nodeId={'index-' + idx}
                                    label={index.properties.map(item => item.name).join(', ') + (index.unique ? ' (unique)' : '')}>
                                </TreeItem>
                            )
                        })}
                    </TreeItem>
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
                <ResourceForm resource={props.resource} onChange={props.setResource}/>
            </>}
            {selectionType === SelectionType.TYPE && selectedItem && <>
                <SubTypesForm subType={props.resource.types?.find(item => item.name === selectedItem)!}
                              onChange={updated => {
                                  updateType(selectedItem, updated)
                                  if (updated.name) {
                                      setSelectedItem(updated.name)
                                  }
                              }}/>
            </>}
        </Box>
    </Box>
}