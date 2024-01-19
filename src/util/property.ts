import {Property} from "@apibrew/client/model";
import {getAnnotation, isAnnotationEnabled} from "./annotation";
import {Type} from "@apibrew/client/model/resource";

export function isSpecialProperty(property: Property): boolean {
    return isAnnotationEnabled(property.annotations as any, 'SpecialProperty');
}

export function getPropertyOrder(property: Property): number {
    return parseInt(getAnnotation(property.annotations as any, 'Order', '0'));
}

export function hasComplexStructure(property: Property): boolean {
    return property.type === Type.LIST || property.type === Type.MAP || property.type === Type.STRUCT;
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

export function withPropertyOrder(property: Property, order: number): Property {
    if (!property.annotations) {
        property.annotations = {}
    }

    property.annotations['Order'] = order.toString()

    return property
}

export function isSimpleProperty(property: Property): boolean {
    return property.type === 'BOOL' || property.type === 'STRING' || property.type === 'INT32' || property.type === 'INT64' || property.type === 'FLOAT32' || property.type === 'FLOAT64';
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
        .sort((a, b) => getPropertyOrder(a.property) - getPropertyOrder(b.property))
        .map((item, index) => {
            if (!item.property.annotations) {
                item.property.annotations = {}
            }

            item.property.annotations['Order'] = (index + orderStart).toString()

            return item
        })
        .sort((a, b) => getPropertyOrder(a.property) - getPropertyOrder(b.property))
}

