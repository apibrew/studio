import {Property, Resource, Type} from "@apibrew/client/model/resource";
import {AbstractComponentType, FilterPredicate} from "../abs.ts";
import {ComponentType} from "react";
import {container} from "../store.ts";

export interface PropertyFormProps<T> {
    value: T;
    onChange: (value: T, isValid?: boolean) => void;
}

export const PropertyFormTypeName = "property-form";

export interface PropertyFormMatcher {
    resource?: Resource
    property?: Property
    propertyType?: Type
}

export interface PropertyFormType<T> extends AbstractComponentType {
    componentType: typeof PropertyFormTypeName;
    predicate: FilterPredicate<PropertyFormMatcher>
    component: ComponentType<PropertyFormProps<T>>;
}

export function registerPropertyFormType<T>(name: string, component: ComponentType<PropertyFormProps<T>>, predicate: FilterPredicate<PropertyFormMatcher>) {
    const containerEntry: PropertyFormType<T> = {
        componentType: PropertyFormTypeName,
        name,
        component,
        predicate
    };

    container.registerComponent<PropertyFormType<T>>(containerEntry)
}

export function getPropertyFormByType<T>(propertyType: Type): PropertyFormType<T> {
    return container.getComponentByType<PropertyFormType<T>>(
        PropertyFormTypeName, (value) => {
            return value.predicate({
                propertyType
            })
        })
}

export function getPropertyFormByProperty<T>(property: Property): PropertyFormType<T> {
    return container.getComponentByType<PropertyFormType<T>>(
        PropertyFormTypeName, (value) => {
            return value.predicate({
                property
            })
        })
}
