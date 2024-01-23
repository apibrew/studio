import {Schema} from "../types/schema";
import {Resource} from "@apibrew/react";
import {sortedProperties} from "./property";
import {getAnnotation} from "./annotation";

export function ensureResourcePropertiesOrder(resource: Resource): boolean {
    let updated = false

    updated ||= ensurePropertiesOrder(resource)

    if (resource.types) {
        for (let i = 0; i < resource.types.length; i++) {
            const type = resource.types[i]

            if (type.name === 'AuditData') {
                continue
            }

            updated ||= ensurePropertiesOrder(type)
        }
    }

    return updated
}

export function ensurePropertiesOrder(schema: Schema): boolean {
    const properties = sortedProperties(schema.properties)

    return ensureGivenPropertiesOrder(schema, properties)
}

export function ensureGivenPropertiesOrder(schema: Schema, properties: string[]): boolean {
    let updated = false

    for (let i = 0; i < properties.length; i++) {
        const property = schema.properties[properties[i]]

        const order = parseInt(getAnnotation(property.annotations as any, 'Order', '-100'));

        if (order !== i) {
            updated = true

            console.log(`Updating order of ${properties[i]} from ${order} to ${i}`)

            property.annotations = {
                ...property.annotations || {},
                Order: i.toString()
            }
        }
    }

    return updated
}