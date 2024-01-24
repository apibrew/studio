import {Resource} from "@apibrew/react";
import {Box} from "@mui/material";
import React, {useMemo} from "react";
import {SubType} from "@apibrew/client/model/resource-action";
import {ChevronRight, DatasetLinked, ExpandMore, ShoppingBag, ShoppingCartTwoTone} from "@mui/icons-material";
import {TreeItem, TreeView} from "@mui/x-tree-view";
import {sortedProperties} from "../../../util/property";

export interface SchemaProps {
    resource: Resource
    setResource: (resource: Resource) => void
    onTriggerUpdate: () => void
}

export function SchemaTable(props: SchemaProps) {
    function updateType(typeName: string, updateFn: (type: SubType) => Partial<SubType>) {
        props.setResource({
            ...props.resource,
            types: props.resource.types?.map((t) => {
                const updated = updateFn(t)
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

    const [selectedProperty, setSelectedProperty] = React.useState<string | null>(null)

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
                    label={`Resource: ${props.resource.name}`}>
                    <TreeItem
                        onClick={() => {
                            setSelectedProperty(null)
                        }}
                        icon={<ShoppingBag/>}
                        nodeId="properties"
                        label="Properties">
                        {properties.map((propertyName) => {
                            const property = props.resource.properties[propertyName]
                            let label = propertyName

                            label += ': ' + property.type.toLowerCase() + ''

                            let alt: string[] = []

                            if (property.required) {
                                alt.push('required')
                            }

                            if (property.unique) {
                                alt.push('unique')
                            }

                            if (property.immutable) {
                                alt.push('immutable')
                            }

                            if (alt.length > 0) {
                                label += ' (' + alt.join(', ') + ')'
                            }

                            return (
                                <TreeItem
                                    onClick={() => {
                                        setSelectedProperty(propertyName)
                                    }}
                                    icon={<ShoppingCartTwoTone/>}
                                    nodeId={propertyName}
                                    label={label}/>
                            )
                        })}
                    </TreeItem>
                    <TreeItem
                        icon={<ShoppingBag/>}
                        nodeId="types"
                        label="Types">
                        {props.resource.types?.map((type) => {
                            const properties = sortedProperties(type.properties)
                            return (
                                <TreeItem
                                    icon={<ShoppingBag/>}
                                    nodeId={'ResidentialData'}
                                    label={"Type: " + type.name}>
                                    {properties.map((propertyName) => {
                                        return (
                                            <TreeItem
                                                icon={<ShoppingCartTwoTone/>}
                                                nodeId={propertyName}
                                                label={propertyName}/>
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
                                    label={"Type: " + index.properties.map(item => item.name).join(', ') + (index.unique ? 'unique' : '')}>
                                </TreeItem>
                            )
                        })}
                    </TreeItem>
                </TreeItem>
            </TreeView>
        </Box>
        <Box flex={1}>
            {selectedProperty && <>
                <Box>
                    <h2>{selectedProperty}</h2>
                </Box>
            </>}
        </Box>
    </Box>
}