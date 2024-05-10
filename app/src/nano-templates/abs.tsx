import {ReactNode} from "react";
import {NanoAstModifier} from "../logic/nano-ast/NanoAstModifier";
import {BindResource} from "./bind-resource";
import {ValidateProperty} from "./validate-property";
import {Resource} from "@apibrew/react";
import {UseResource} from "./use-resource";
import {SoftDelete} from "./soft-delete";

export interface NanoCodeTemplate {
    label: string;

    renderParams(): ReactNode

    apply(modifier: NanoAstModifier): boolean
}

type NanoCodeTemplateConstructor = new (resource?: Resource) => NanoCodeTemplate;

export const nanoTemplates: NanoCodeTemplateConstructor[] = [
    UseResource,
    ValidateProperty,
    BindResource,
    SoftDelete,
]