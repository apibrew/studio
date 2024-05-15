import {ComponentType} from "react";
import {AbstractComponentType} from "../abs";
import {container} from "../store";

export const PageTypeName = "page";

export interface PageType extends AbstractComponentType {
    componentType: typeof PageTypeName
    routerPath: string
    breadcrumb: string
    component: ComponentType<unknown>
}

export function registerPageType(name: string, routerPath: string, component: ComponentType<unknown>) {
    container.registerComponent({
        componentType: PageTypeName,
        routerPath: routerPath,
        breadcrumb: name,
        name,
        component
    } as PageType);
}

export function listPageTypes(): PageType[] {
    return container.getComponentsByType(PageTypeName);
}
