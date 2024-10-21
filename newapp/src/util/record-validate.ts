import {ErrorField, Property, Resource} from "@apibrew/client/model";
import {Type} from "@apibrew/client/model/resource";

interface PropertyWithName extends Property {
    name: string;
}

type Record = any

export function ValidateRecords(resource: Resource, list: Record[], isUpdate: boolean): ErrorField[] {
    const fieldErrors: ErrorField[] = [];

    const PropertyExists: { [key: string]: boolean } = {};

    const propertyNames = Object.keys(resource.properties)
    const properties = propertyNames.map(item => ({
        name: item,
        ...resource.properties[item]
    }))

    propertyNames.forEach((property: string) => {
        PropertyExists[property] = true;
    });

    list.forEach((record: Record) => {
        properties.forEach((property: PropertyWithName) => {
            let packedVal = record[property.name];

            if (!packedVal && property.defaultValue) {
                packedVal = property.defaultValue;
            }

            if (packedVal === undefined || packedVal === null) {
                packedVal = null;
            }

            if (packedVal !== null) {
                fieldErrors.push(...Value(resource, property, record.id, property.name, packedVal));
            }


            const isEmpty = packedVal === null || packedVal === undefined;

            if (isEmpty) {
                if (property.primary && isUpdate) {
                    fieldErrors.push({
                        property: property.name,
                        message: "required",
                    } as ErrorField);
                }

                if (!property.primary && property.required) {
                    fieldErrors.push({
                        property: property.name,
                        message: "required",
                    } as ErrorField);
                }
            }
        });

        Object.keys(record).forEach((key: string) => {
            if (key === "type") return;

            if (!PropertyExists[key]) {
                fieldErrors.push({
                    property: key,
                    message: "there are no such property",
                } as ErrorField);
            }
        });
    });

    console.debug("Record validation errors: ", fieldErrors);

    return fieldErrors;
}

function Value(
    resource: Resource,
    property: Property,
    recordId: string,
    propertyPath: string,
    value: any
): ErrorField[] {
    const fieldErrors: ErrorField[] = [];

    if (value === null || value === undefined) {
        return fieldErrors;
    }

    let err: any;

    switch (property.type) {
        case Type.BOOL:
            if (typeof value !== "boolean") {
                err = new Error("value is not a boolean");
            }
            break;
        case Type.DATE:
        case Type.TIME:
        case Type.TIMESTAMP:
        case Type.BYTES:
        case Type.UUID:
            if (typeof value !== "string") {
                err = new Error("value is not a string");
            }
            break;
        case Type.FLOAT32:
        case Type.FLOAT64:
        case Type.INT32:
        case Type.INT64:
            if (typeof value !== "number") {
                err = new Error("value is not a number");
            }
            break;
        case Type.REFERENCE:
            if (typeof value !== "string") {
                err = new Error("value is not a string");
            }
            break;
        case Type.OBJECT:
            return [];
    }

    if (err) {
        fieldErrors.push({
            property: propertyPath,
            message: err.message,
        } as ErrorField);
    }

    switch (property.type) {
        case Type.LIST:
            if (Array.isArray(value)) {
                value.forEach((item: any, index: number) => {
                    fieldErrors.push(...Value(resource, property.item!, recordId, `${propertyPath}[${index}]`, item));
                });
            } else {
                fieldErrors.push({
                    property: propertyPath,
                    message: "value is not a list",
                } as ErrorField);
            }
            break;
        case Type.MAP:
            if (typeof value === "object") {
                Object.keys(value).forEach((key: string) => {
                    fieldErrors.push(...Value(resource, property.item!, recordId, `${propertyPath}[${key}]`, value[key]));
                });
            } else {
                fieldErrors.push({
                    property: propertyPath,
                    message: "value is not a map",
                } as ErrorField);
            }
            break;
        case Type.ENUM:
            if (typeof value !== "string") {
                fieldErrors.push({
                    property: propertyPath,
                    message: "value is not a string",
                } as ErrorField);
            }

            if (err) {
                fieldErrors.push({
                    property: propertyPath,
                    message: err.message,
                } as ErrorField);
            } else if (!property.enumValues?.includes(value.toUpperCase())) {
                fieldErrors.push({
                    property: propertyPath,
                    message: `value must be one of enum values: [${property.enumValues!.join("|")}]`,
                } as ErrorField);
            }
            break;
        case Type.STRUCT:
            if (typeof value === "object") {
                const structErrors = validateStruct(resource, property, value, propertyPath);
                fieldErrors.push(...structErrors);
            } else {
                fieldErrors.push({
                    property: propertyPath,
                    message: "value is not a struct",
                } as ErrorField);
            }
            break;
    }

    return fieldErrors;
}

function validateStruct(
    resource: Resource,
    property: Property,
    value: any,
    propertyPath: string
): ErrorField[] {
    const fieldErrors: ErrorField[] = [];
    const typeDef = resource.types?.find((t) => t.name === property.typeRef);

    if (!typeDef) {
        fieldErrors.push({
            property: propertyPath,
            message: `type ${property.typeRef} not found`,
        } as ErrorField);
        return fieldErrors;
    }

    const propertyNames = Object.keys(typeDef.properties)
    const properties = propertyNames.map(item => ({
        name: item,
        ...typeDef.properties[item]
    }))

    properties.forEach((subProperty) => {
        const packedVal = value[subProperty.name] || subProperty.defaultValue || null;
        if (packedVal === null && subProperty.required) {
            fieldErrors.push({
                property: `${propertyPath}.${subProperty.name}`,
                message: "required field is empty",
            } as ErrorField);
        }
        fieldErrors.push(...Value(resource, subProperty, "", `${propertyPath}.${subProperty.name}`, packedVal));
    });

    return fieldErrors;
}
