import {AbstractComponentType, Container, FilterPredicate} from "./abs.ts";

class store implements Container {
    componentMap: Map<string, AbstractComponentType[]> = new Map<string, AbstractComponentType[]>();

    registerComponent<T extends AbstractComponentType>(value: T, name?: string, primary?: boolean, order?: number): void {
        if (name !== undefined) {
            value.name = name;
        }
        if (order !== undefined) {
            value.order = order;
        }

        if (primary !== undefined) {
            value.primary = primary;
        }


        if (!value.name) {
            throw new Error("Component name is required");
        }

        let components = this.componentMap.get(value.componentType);

        if (components === undefined) {
            components = [];
            this.componentMap.set(value.componentType, components);
        }
        components.push(value);
    }

    getComponentByType<T extends AbstractComponentType>(componentType: string, filters?: FilterPredicate<T>): T {
        let components = (this.componentMap.get(componentType) || []) as T[];

        if (filters !== undefined) {
            components = components.filter(filters);
        }

        if (components === undefined || components.length === 0) {
            throw new Error("Component not found: " + componentType);
        }
        if (components.length === 1) {
            return components[0] as T;
        }
        for (const component of components) {
            if (component.primary) {
                return component as T;
            }
        }
        throw new Error("Primary component not found: " + componentType);
    }

    getComponentByTypeAndName<T extends AbstractComponentType>(componentType: string, name: string): T {
        const components = (this.componentMap.get(componentType) || []) as T[];

        if (components === undefined) {
            throw new Error("Component not found");
        }
        for (const component of components) {
            if (component.name === name) {
                return component;
            }
        }
        throw new Error("Component not found with type and name: " + componentType + " / " + name);
    }

    getComponentsByType<T extends AbstractComponentType>(componentType: string, filters?: FilterPredicate<T>): T[] {
        let components = (this.componentMap.get(componentType) || []) as T[];

        if (filters !== undefined) {
            components = components.filter(filters);
        }

        if (components === undefined) {
            throw new Error("Component not found");
        }

        return components;
    }

}

export const container: Container = new store();
