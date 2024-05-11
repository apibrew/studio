import {ComponentType, Container} from "./abs.ts";

class store implements Container {
    componentMap: Map<string, ComponentType[]> = new Map<string, ComponentType[]>();

    registerComponent<T extends ComponentType>(value: T, name?: string | undefined, primary?: boolean | undefined): void {
        if (name === undefined) {
            if (value.name === undefined) {
                throw new Error("Component name is required");
            }
            name = value.name;
        }
        let components = this.componentMap.get(value.componentType);

        if (primary !== undefined) {
            value.primary = primary;
        }

        if (components === undefined) {
            components = [];
            this.componentMap.set(value.componentType, components);
        }
        components.push(value);
    }

    getComponentByType<T extends ComponentType>(componentType: string): T {
        const components = this.componentMap.get(componentType);

        if (components === undefined) {
            throw new Error("Component not found");
        }
        if (components.length === 1) {
            return components[0] as T;
        }
        for (const component of components) {
            if (component.primary) {
                return component as T;
            }
        }
        throw new Error("Primary component not found");
    }

}

export const container: Container = new store();
