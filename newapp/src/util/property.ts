import {Property} from "@apibrew/client/model";
import {getAnnotation, isAnnotationEnabled} from "./annotation";
import {Type} from "@apibrew/client/model/resource";

export function isSpecialProperty(property: Property): boolean {
    return isAnnotationEnabled(property.annotations as any, 'SpecialProperty');
}

export function getPropertyOrder(name: string, property: Property): number {
    const order = parseInt(getAnnotation(property.annotations as any, 'Order', '0'));

    if (order !== 0) {
        return order
    }

    if (name === 'id') {
        return -2
    }

    if (isSpecialProperty(property)) {
        return 1000
    }

    if (hasComplexStructure(property)) {
        return 100
    }

    return 0;
}

export function hasComplexStructure(property: Property): boolean {
    return property.type === Type.LIST || property.type === Type.MAP || property.type === Type.STRUCT;
}

export function sortedProperties(properties: { [key: string]: Property }): string[] {
    const propertyNames = Object.keys(properties)

    return propertyNames.sort((a, b) => {
        const aProperty = properties[a]
        const bProperty = properties[b]

        if (!aProperty || !bProperty) {
            return 0
        }

        const aOrder = getPropertyOrder(a, aProperty)
        const bOrder = getPropertyOrder(b, bProperty)

        return aOrder - bOrder
    })
}

export function isComparableProperty(property: Property): boolean {
    if (property.type === Type.INT32 || property.type === Type.INT64 || property.type === Type.FLOAT32 || property.type === Type.FLOAT64) {
        return true
    }

    if (property.type === Type.DATE || property.type === Type.TIME || property.type === Type.TIMESTAMP) {
        return true
    }

    return false
}

export function isFilterableProperty(property: Property): boolean {
    switch (property.type) {
        case Type.BOOL:
        case Type.STRING:
        case Type.ENUM:
        case Type.FLOAT32:
        case Type.FLOAT64:
        case Type.INT32:
        case Type.INT64:
        case Type.UUID:
        case Type.DATE:
        case Type.TIME:
        case Type.TIMESTAMP:
        case Type.REFERENCE:
            return true;
    }

    return false;
}

export function withPropertyOrder(property: Property, order: number): Property {
    if (!property.annotations) {
        property.annotations = {}
    }

    property.annotations['Order'] = order.toString()

    return property
}

export function isSimpleProperty(propertyType: Property['type']): boolean {
    return propertyType === 'BOOL' || propertyType === 'STRING' || propertyType === 'INT32' || propertyType === 'INT64' || propertyType === 'FLOAT32' || propertyType === 'FLOAT64';
}

export function makeProperties(properties: { [key: string]: Property }) {
    let orderStart = -2;

    if (properties['id']) {
        properties['id'].annotations['Order'] = orderStart.toString()
        orderStart++;
    }

    if (properties['version']) {
        properties['version'].annotations['Order'] = orderStart.toString()
        orderStart++;
    }

    if (properties['auditData']) {
        properties['auditData'].annotations['Order'] = orderStart.toString()
        orderStart++;
    }

    return Object.entries(properties)
        .map(item => {
            return {name: item[0], property: item[1]}
        })
        .sort((a, b) => getPropertyOrder(a.name, a.property) - getPropertyOrder(a.name, b.property))
        .map((item, index) => {
            if (!item.property.annotations) {
                item.property.annotations = {}
            }

            item.property.annotations['Order'] = (index + orderStart).toString()

            return item
        })
        .sort((a, b) => getPropertyOrder(a.name, a.property) - getPropertyOrder(a.name, b.property))
}

export function defaultNativeValue(type: Property["type"]): any {
    switch (type) {
        case Type.BOOL:
            return false
        case Type.STRING:
        case Type.ENUM:
            return ''
        case Type.FLOAT32:
        case Type.FLOAT64:
        case Type.INT32:
        case Type.INT64:
            return 0
        case Type.BYTES:
            return ''
        case Type.UUID:
            return '00000000-0000-0000-0000-000000000000'
        case Type.DATE:
        case Type.TIME:
        case Type.TIMESTAMP:
            return new Date(0).toUTCString()
        case Type.OBJECT:
        case Type.MAP:
        case Type.LIST:
        case Type.STRUCT:
            return {}
        case Type.REFERENCE:
            return { id: '00000000-0000-0000-0000-000000000000' }
        default:
            return '';
    }
}
