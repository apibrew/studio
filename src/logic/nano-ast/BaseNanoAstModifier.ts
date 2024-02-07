import {Resource} from "@apibrew/react";
import {Ast} from "./abs";
import {Expression, ObjectExpression, Property as AcornProperty, Statement} from "acorn";
import {astMatcher, ensureStatement} from "./matcher";


export abstract class BaseNanoAstModifier {
    constructor(protected ast: Ast) {
    }

    resourceItemName(resource: Resource) {
        const resourceName = resource.name

        return resourceName.charAt(0).toLowerCase() + resourceName.slice(1);
    }

    resourceName(resource: Resource) {
        const resourceName = resource.name

        return resourceName.charAt(0).toUpperCase() + resourceName.slice(1);
    }

    callMethod(methodName: string, ...args: Expression[]) {
        const statement: Statement = {
            type: 'ExpressionStatement',
            expression: {
                type: "CallExpression",
                callee: {
                    type: "Identifier",
                    name: methodName,
                },
                arguments: args
            }
        } as Statement

        ensureStatement(this.ast, statement, statement)
    }

    let(varName: string, initValue?: Expression): Statement {
        return {
            type: "VariableDeclaration",
            kind: "let",
            declarations: [
                {
                    type: "VariableDeclarator",
                    id: {
                        type: "Identifier",
                        name: varName
                    },
                    init: initValue
                }
            ],
        } as Statement;
    }

    object(): ObjectExpression {
        return {
            type: "ObjectExpression",
            properties: [] as AcornProperty[],
        } as ObjectExpression
    }

    return(argument: Expression): Statement {
        return {
            type: "ReturnStatement",
            argument: argument
        } as Statement
    }

    prepend(statement: Statement) {
        const matches = astMatcher(this.ast, statement)

        if (matches.matches.length > 0) {
            return
        }

        this.ast.body.unshift(statement)
    }

    append(statement: Statement) {
        const matches = astMatcher(this.ast, statement)

        if (matches.matches.length > 0) {
            return
        }

        this.ast.body.push(statement)
    }
}