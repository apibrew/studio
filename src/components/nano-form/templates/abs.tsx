import {ReactNode} from "react";
import {Program} from "acorn";
import {NanoAstModifier} from "../../../logic/nano-ast/NanoAstModifier";

export interface NanoCodeTemplate {
    label: string;

    renderParams(): ReactNode

    apply(modifier: NanoAstModifier): boolean
}

export interface NanoCodeTemplateConstructor {
    new(): NanoCodeTemplate;
}