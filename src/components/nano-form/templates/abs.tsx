import {ReactNode} from "react";
import {Program} from "acorn";

export interface NanoCodeTemplate {
    label: string;

    renderParams(): ReactNode

    check(ast: Program): boolean

    apply(ast: Program): void
}

export interface NanoCodeTemplateConstructor {
    new(): NanoCodeTemplate;
}