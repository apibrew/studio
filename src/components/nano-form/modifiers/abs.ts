import {BlockStatement, Program, Statement} from "acorn";

export type Ast = Program | BlockStatement

export type CodeModifierFunction<T> = (ast: Ast, options: T) => void;

export type CodeModifierCheckFunction<T> = (ast: Ast, options: T) => boolean;

export interface SectionOrder {
    before?: string
    after?: string
    first?: boolean
    last?: boolean
}

export interface SectionDetails {
    key: string
    comment: string
    matcherStatement: Statement
    order: SectionOrder
}