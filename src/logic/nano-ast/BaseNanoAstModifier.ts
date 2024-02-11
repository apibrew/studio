import {Resource} from "@apibrew/react";
import {Ast, parseNanoCode} from "./abs";
import {EmptyStatement, Expression, Identifier, ObjectExpression, Property as AcornProperty, Statement} from "acorn";
import {astMatcher} from "./matcher";


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

    const(varName: string, initValue?: Expression): Statement {
        return {
            type: "VariableDeclaration",
            kind: "const",
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

    var(varName: string, initValue?: Expression): Statement {
        return {
            type: "VariableDeclaration",
            kind: "var",
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

    newLine() {
        this.ast.body.push({
            type: "EmptyStatement",
        } as EmptyStatement)
    }

    property(item: Expression, property: string): Expression {
        return {
            type: "MemberExpression",
            object: item,
            property: this.identifier(property)
        } as Expression;
    }

    identifier(name: string) {
        return {
            type: "Identifier",
            name: name,
        } as Identifier
    }

    value(value: any): Expression {
        return {
            type: "Literal",
            value: value,
            raw: value,
        } as Expression;
    }

    applyTemplate(template: string, replacements?: { [key: string]: string }) {
        let templateProcessed = template.trim()

        if (replacements) {
            for (const key of Object.keys(replacements)) {
                templateProcessed = templateProcessed.replaceAll(key, replacements[key])
            }
        }

        const ast = parseNanoCode(templateProcessed)

        if (ast.body) {
            for (const item of ast.body) {
                this.append(item as Statement)
            }
        }
    }
}
