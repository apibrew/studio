import {BlockStatement, Program, Statement} from "acorn";

export type Ast = Program | BlockStatement

export type CodeModifierFunction<T> = (ast: Ast, options: T) => void;

export type CodeModifierCheckFunction<T> = (ast: Ast, options: T) => boolean;

export interface SectionDetails {
    key: string
    comment: string
    matcherStatement: Statement
}

export enum ResourceHandlerType {
    BEFORE_CREATE = "beforeCreate",
    BEFORE_UPDATE = "beforeUpdate",
    BEFORE_DELETE = "beforeDelete",
    BEFORE_GET = "beforeGet",
    BEFORE_List = "beforeList",

    AFTER_CREATE = "afterCreate",
    AFTER_UPDATE = "afterUpdate",
    AFTER_DELETE = "afterDelete",
    AFTER_GET = "afterGet",
    AFTER_List = "afterList",
}

export enum ResourceBinderType {
    CREATE = "bindCreate",
    UPDATE = "bindUpdate",
    DELETE = "bindDelete",
    GET = "bindGet",
    LIST = "bindList",
}