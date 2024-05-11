import {Property, Resource, Type} from "@apibrew/client/model/resource";
import {AbstractComponentType, FilterPredicate} from "../abs.ts";
import {ComponentType} from "react";
import {container} from "../store.ts";
import {getAnnotation} from "@apibrew/client/util/annotation";
import {withAnnotation} from "app/src/util/annotation.ts";

export interface PropertyFormProps<T> {
    value: T;
    onChange: (value: T, isValid?: boolean) => void;
}

export const PropertyFormTypeName = "property-form";

export interface PropertyFormMatcher {
    resource?: Resource
    property?: Property
}

export interface PropertyFormType<T> extends AbstractComponentType {
    componentType: typeof PropertyFormTypeName;
    type: Type
    condition?: FilterPredicate<PropertyFormMatcher>
    component: ComponentType<PropertyFormProps<T>>;
    mode: string
}

export function registerPropertyFormType<T>(details: PropertyFormType<T>) {
    container.registerComponent(details);
}

export function registerDefaultPropertyForm<T>(name: string, type: Type, component: ComponentType<PropertyFormProps<T>>) {
    registerPropertyFormType({
        componentType: PropertyFormTypeName,
        name,
        type,
        component,
        mode: "default"
    });
}

const PropertyEditorAnnotation = "PropertyEditor";

export function registerCustomPropertyForm<T>(name: string, type: Type, component: ComponentType<PropertyFormProps<T>>) {
    registerPropertyFormType({
        componentType: PropertyFormTypeName,
        name,
        type,
        component,
        primary: true,
        mode: "custom",
        condition: m => getAnnotation(m.property?.annotations, PropertyEditorAnnotation) === name
    });
}

export function registerSpecialPropertyForm<T>(name: string, type: Type, component: ComponentType<PropertyFormProps<T>>, condition: FilterPredicate<PropertyFormMatcher>) {
    registerPropertyFormType({
        componentType: PropertyFormTypeName,
        name,
        type,
        component,
        primary: true,
        mode: "special",
        condition
    });
}

export function listCustomPropertyForms<T>(type: Type): PropertyFormType<T>[] {
    return container.getComponentsByType(PropertyFormTypeName, m => m.type === type && m.mode === 'custom');
}

export function applyCustomPropertyForm(property: Property, name: string): Property {
    return {
        ...property,
        annotations: withAnnotation(property.annotations, PropertyEditorAnnotation, name)
    }
}

export function getPropertyFormByProperty<T>(property: Property, resource?: Resource): ComponentType<PropertyFormProps<T>> {
    const comp = container.getComponentByType<PropertyFormType<T>>(PropertyFormTypeName, m => {
        if (m.type !== property.type) {
            return false
        }

        return !(m.condition && !m.condition({resource, property}));
    });

    return comp.component;
}
