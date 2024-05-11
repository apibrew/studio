import {ComponentType} from "./abs.ts";
import * as React from "react";

export const PageComponentTypeName = "page";

export interface PageComponentType extends ComponentType {
    componentType: typeof PageComponentTypeName;
    component: React.ComponentType<unknown>
}
