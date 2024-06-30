import {Resource} from "@apibrew/react";
import {Box, IconButton} from "@mui/material";
import {useMemo} from "react";
import {SubType, Type} from "@apibrew/client/model/resource";
import {AccountTree, Add, ChevronRight, ExpandMore, Remove, SchemaRounded, TableChart} from "@mui/icons-material";
import {TreeItem, TreeView} from "@mui/x-tree-view";
import {getPropertyOrder, sortedProperties} from "../../../../util/property";
import {SchemaPropertyTreeItem} from "./SchemaPropertyTreeItem";
import {Property} from "@apibrew/client/model";
import {Schema} from "../../../../types/schema";
import {useDrawer} from "../../../../hooks/use-drawer";
import {PropertyDrawer} from "../../property-drawer/PropertyDrawer";
import {SubTypeDrawer} from "../../sub-type-drawer/SubTypeDrawer";
import {getAnnotation, withAnnotation} from "../../../../util/annotation";
import {SourceMatchKey} from "../../../../util/base-annotations";

export interface SchemaProps {
    resource: Resource
    setResource: (resource: Resource) => void
}

export function SchemaTable(props: SchemaProps) {
    const drawer = useDrawer()

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


    const typeNames = props.resource.types?.map(item => 'type-' + item.name) ?? []

    return <Box m={1} display='flex' flexDirection='row'>
        {drawer.render()}
        <Box flex={1}>
            <TreeView
                aria-label="file system navigator"
                expanded={['resource', 'properties', 'types', 'ResidentialData', 'indexes', ...typeNames]}
                defaultCollapseIcon={<ExpandMore/>}
                defaultExpandIcon={<ChevronRight/>}
            >
                <TreeItem
                    icon={<TableChart/>}
                    nodeId="resource"
                    label={`Resource: ${props.resource.name}`}>
                    <TreeItem
                        icon={<SchemaRounded/>}
                        nodeId="properties"
                        label={<>
                            <span style={{
                                display: 'inline-block',
                                minWidth: '433px'
                            }}>Properties</span>
                            <IconButton
                                onClick={() => {
                                    drawer.open(<PropertyDrawer
                                        resource={props.resource}
                                        title='New Property'
                                        value={{
                                            name: `new-property-${Math.floor(Math.random() * 100)}`,
                                            property: {
                                                type: Type.STRING
                                            } as Property
                                        }}
                                        onChange={(updated) => {
                                            props.setResource({
                                                ...props.resource,
                                                properties: {
                                                    ...props.resource.properties,
                                                    [updated.name]: updated.property
                                                }
                                            })
                                        }}
                                        onClose={drawer.close}
                                    />)
                                }}
                                color='success'
                                size='small'>
                                <Add fontSize='small'/>
                            </IconButton>
                        </>}>
                        {properties.map((propertyName, index) => (
                            <SchemaPropertyTreeItem
                                key={propertyName}
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
                                onEdit={() => {
                                    drawer.open(<PropertyDrawer resource={props.resource}
                                                                title={`Update property: ${propertyName}`}
                                                                value={{
                                                                    name: propertyName,
                                                                    property: props.resource.properties[propertyName]
                                                                }}
                                                                onChange={async (updated) => {
                                                                    const updatedProperties = {...props.resource.properties}
                                                                    const property = props.resource.properties[propertyName]

                                                                    if (propertyName !== updated.name) {
                                                                        if (getAnnotation(property.annotations, SourceMatchKey) === "") {
                                                                            updatedProperties[propertyName] = property
                                                                            property.annotations = withAnnotation(property.annotations, SourceMatchKey, propertyName)
                                                                        } else {
                                                                            delete updatedProperties[propertyName]
                                                                        }
                                                                    }

                                                                    updatedProperties[updated.name] = updated.property
                                                                    props.setResource({
                                                                        ...props.resource,
                                                                        properties: updatedProperties
                                                                    })
                                                                }}
                                                                onClose={drawer.close}/>)
                                }}/>
                        ))}
                    </TreeItem>
                    <TreeItem
                        icon={<AccountTree/>}
                        nodeId="types"
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
                            const properties = sortedProperties(type.properties || {})
                            return (
                                <TreeItem
                                    icon={<AccountTree/>}
                                    key={type.name}
                                    nodeId={'type-' + type.name}
                                    label={<>
                                        <span style={{
                                            display: 'inline-block',
                                            width: '416px'
                                        }}>Type: {type.name}</span>
                                        <IconButton
                                            onClick={(e) => {
                                                e.stopPropagation()

                                                drawer.open(<PropertyDrawer
                                                    resource={props.resource}
                                                    title='New Property'
                                                    value={{
                                                        name: `new-property-${Math.floor(Math.random() * 100)}`,
                                                        property: {
                                                            type: Type.STRING
                                                        } as Property
                                                    }}
                                                    onChange={(updated) => {
                                                        updateType(type.name, {
                                                            properties: {
                                                                ...type.properties,
                                                                [updated.name]: updated.property
                                                            }
                                                        })
                                                    }}
                                                    onClose={drawer.close}
                                                />)
                                            }}
                                            color='success'
                                            size='small'>
                                            <Add fontSize='small'/>
                                        </IconButton>
                                        <IconButton onClick={(e) => {
                                            e.stopPropagation()

                                            const newTypes = [...props.resource.types || []]

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
                                        drawer.open(<SubTypeDrawer
                                            type={type}
                                            onChange={updated => {
                                                updateType(type.name, updated)
                                            }}
                                            onClose={drawer.close}
                                        />)
                                    }}>
                                    {properties.map((propertyName, index) => {
                                        return (
                                            <SchemaPropertyTreeItem
                                                key={propertyName}
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
                                                onEdit={() => {
                                                    drawer.open(<PropertyDrawer
                                                        title={'Update property: ' + propertyName}
                                                        resource={props.resource}
                                                        value={{
                                                            name: propertyName,
                                                            property: type.properties[propertyName]
                                                        }}
                                                        onChange={updated => {
                                                            updateType(type.name, {
                                                                properties: {
                                                                    ...type.properties,
                                                                    [updated.name]: updated.property
                                                                }
                                                            })
                                                        }}
                                                        onClose={drawer.close}/>)
                                                }}/>
                                        )
                                    })}
                                </TreeItem>
                            )
                        })}
                    </TreeItem>
                </TreeItem>
            </TreeView>
        </Box>
    </Box>
}
