import {ReactNode} from "react";
import {Code} from "@apibrew/client/nano/model/code";

export interface NanoCodeTemplate {
    label: string;

    renderParams(): ReactNode

    apply(code: Code, updateCode: (code: Code) => void): void
}

export interface NanoCodeTemplateConstructor {
    new(): NanoCodeTemplate;
}