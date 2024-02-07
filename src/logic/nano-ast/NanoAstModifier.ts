import {BaseNanoAstModifier} from "./BaseNanoAstModifier";
import {Resource} from "@apibrew/react";
import {Ast, ResourceBinderType, ResourceHandlerType} from "./abs";
import {NanoAstMethodModifier} from "./NanoAstMethodModifier";
import {astMatcher, capture} from "./matcher";
import {resourceHandlerMethodMatcher, resourceMatcher} from "./matchers";
import {resourceHandlerMethodStatement, resourceStatement} from "./statements";
import {
    ArrowFunctionExpression,
    BlockStatement,
    CallExpression,
    ExpressionStatement,
    FunctionDeclaration,
    Identifier,
    Statement
} from "acorn";
import {appendStatementToSection} from "./positions";

export class NanoAstModifier extends BaseNanoAstModifier {

    constructor(ast: Ast) {
        super(ast);

        this.parse()
    }

    declareResource(resource: Resource) {
        const result = astMatcher(this.ast, resourceMatcher(resource))

        if (result.matches.length > 0) {
            return
        }

        const statement = resourceStatement(resource)
        appendStatementToSection(this.ast, statement, 'resources')
    }

    resourceHandler(resource: Resource, handlerType: ResourceHandlerType, prepare: (methodModifier: NanoAstMethodModifier) => void): void {
        const matches = astMatcher(this.ast, resourceHandlerMethodMatcher(this.resourceName(resource), handlerType))

        let statement: Statement
        if (matches.matches.length > 0) {
            statement = matches.matches[0].statement
        } else {
            statement = resourceHandlerMethodStatement(this.resourceName(resource), handlerType, this.resourceItemName(resource))

            appendStatementToSection(this.ast, statement, 'handlers')
        }

        const functionAst = this.getBody(statement as ExpressionStatement)

        const methodModifier = new NanoAstMethodModifier(functionAst)
        methodModifier.setArgs([this.resourceItemName(resource)])
        prepare(methodModifier)
    }

    private getBody(statement: ExpressionStatement) {
        return (((statement as ExpressionStatement).expression as CallExpression)
            .arguments[0] as ArrowFunctionExpression).body as BlockStatement;
    }

    resourceBind(resource: Resource, toResource: Resource, handlerType: ResourceBinderType, fromMethodName: string, toMethodName: string): void {
        const statement: Statement = {
            type: "ExpressionStatement",
            expression: {
                type: "CallExpression",
                callee: {
                    type: "MemberExpression",
                    object: {
                        type: "Identifier",
                        name: this.resourceName(resource),
                    },
                    property: {
                        type: "Identifier",
                        name: handlerType
                    }
                },
                arguments: [
                    {
                        type: "Identifier",
                        name: this.resourceName(toResource)
                    } as Identifier,
                    {
                        type: "Identifier",
                        name: fromMethodName,
                    } as Identifier,
                    {
                        type: "Identifier",
                        name: toMethodName,
                    } as Identifier
                ]
            }
        } as Statement

        const match = astMatcher(this.ast, statement)

        if (match.matches.length > 0) {
            return;
        }

        appendStatementToSection(this.ast, statement, 'handlers')
    }

    declareFunction(functionName: string, argNames: string[], prepare: (methodModifier: NanoAstMethodModifier) => void): void {
        const matches = astMatcher(this.ast, {
            "type": "FunctionDeclaration",
            "id": {
                "type": "Identifier",
                "name": functionName
            },
            "params": argNames.map(arg => ({
                "type": "Identifier",
                "name": capture(arg)
            })),
        } as Statement)

        if (matches.matches.length > 0) {
            const functionAst = (matches.matches[0].statement as FunctionDeclaration).body
            const methodModifier = new NanoAstMethodModifier(functionAst)
            methodModifier.setArgs(argNames.map(arg => matches.matches[0].extracted[arg]))
            prepare(methodModifier)
            return
        }

        const statement = {
            "type": "FunctionDeclaration",
            "id": {
                "type": "Identifier",
                "name": functionName
            },
            "params": argNames.map(arg => ({
                "type": "Identifier",
                "name": arg
            })),
            body: {
                "type": "BlockStatement",
                "body": [] as Statement[]
            }
        } as FunctionDeclaration

        // ast.body.push(statement)
        appendStatementToSection(this.ast, statement, 'functions')

        const functionAst = statement.body

        const methodModifier = new NanoAstMethodModifier(functionAst)
        methodModifier.setArgs(argNames)
        prepare(methodModifier)
    }

    private parse() {

    }
}