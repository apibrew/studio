import {BlockStatement, Comment, Parser, Program, Statement} from "acorn";
import {traverse} from "estraverse";

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


function insertEmptyStatements(ast: any) {
    let lastLine = 0;
    traverse(ast, {
        enter: function (node, parent) {
            if (node.type !== 'Program' && parent?.type === 'Program') {
                const currentLine = node.loc?.start.line ?? 0;
                if (currentLine - lastLine > 1) {
                    // Insert an empty statement in the parent body
                    const index = parent.body.indexOf(node as any);
                    parent.body.splice(index, 0, {type: "EmptyStatement"});
                }
                lastLine = node.loc?.end.line || 0;
            }
        }
    });
}


export function parseNanoCode(code: string): Ast {
    const parser = Parser.extend()

    const comments: Comment[] = []

    const ast = parser.parse(code, {
        ecmaVersion: 2020,
        locations: true,
        onComment: comments
    })

    const astAny = ast as any

    insertEmptyStatements(ast)

    astAny.comments = comments

    return ast
}