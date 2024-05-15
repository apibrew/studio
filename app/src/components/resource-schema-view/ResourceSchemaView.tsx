import {Resource} from "@apibrew/react";
import {sortedProperties} from "../../util/property";
import {useMemo} from "react";
import {Box, Card, CardContent} from "@mui/material";
import {Property} from "@apibrew/client/model";

export interface ResourceSchemaViewProps {
    resource: Resource
}

export function ResourceSchemaView(props: ResourceSchemaViewProps) {
    const properties = sortedProperties(props.resource.properties)

    const schemaView = useMemo(() => {
        const result: { [key: string]: string } = {}

        for (const property of properties) {
            result[property] = typeName(props.resource.properties[property])
        }

        return result
    }, [properties, props.resource.properties])

    let title = props.resource.title

    if (!title) {
        title = props.resource.name
    }

    if (props.resource.namespace && props.resource.namespace.name !== 'default') {
        title = props.resource.namespace.name + '/' + title
    }

    return <>
        <Card>
            <CardContent>
                <Box height='300px' overflow='scroll'>
                <span style={{
                    marginRight: '10px',
                    fontWeight: 'bold',
                    fontSize: '20px'
                }}>{title}</span>

                    {'{'}
                    <div style={{
                        marginLeft: '20px',
                        lineHeight: '20px'
                    }}>
                        {Object.keys(schemaView).map(key => {
                            return <div key={key}>
                                <span style={{
                                    fontWeight: 'bold',
                                    fontSize: '14px'
                                }}>{key}</span>
                                <span>:</span>
                                <span style={{
                                    fontWeight: 'bold',
                                    fontStyle: 'oblique',
                                    color: 'gray',
                                    marginLeft: '7px'
                                }}>{schemaView[key]}</span>
                            </div>
                        })}
                    </div>
                    {'}'}
                </Box>
            </CardContent>
        </Card>
    </>
}

function typeName(property: Property): string {
    let type = property.type
    let result = property.type.toLowerCase()

    switch (type) {
        case 'LIST':
            result = typeName(property.item) + '[]'
            break
        case 'MAP':
            result = '{' + typeName(property.item) + '}'
            break
        case 'ENUM':
            result = property.enumValues?.join(' | ') || 'string'
            break
        case 'REFERENCE':
            let reference = property.reference

            result = reference

            if (reference.startsWith('default/')) {
                result = reference.substring(8)
            }
            break
    }

    return result
}
