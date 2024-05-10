import {capture, or} from "./matcher";
import {Expression, FunctionDeclaration, Identifier, Statement, VariableDeclarator} from "acorn";
import {Resource} from "@apibrew/react";

export const resourceMatcher = (resource: Resource) => {
    let resourceArgument = resource.namespace.name + '/' + resource.name

    if (resource.namespace.name === 'default') {
        resourceArgument = or(resourceArgument, resource.name)
    }

    return {
        type: 'VariableDeclaration',
        declarations: [
            {
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: capture('resourceVariableName')
                } as Identifier,
                init: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'resource'
                    },
                    arguments: [
                        {
                            type: 'Literal',
                            value: resourceArgument
                        }
                    ]
                } as Expression
            } as VariableDeclarator
        ]
    } as Statement
}

export const resourceHandlerMethodMatcher = (resourceVarName: string, handlerMethodName: string) => {
    return {
        "type": "ExpressionStatement",
        "expression": {
            "type": "CallExpression",
            "callee": {
                "type": "MemberExpression",
                "object": {
                    "type": "Identifier",
                    "name": resourceVarName
                },
                "property": {
                    "type": "Identifier",
                    "name": handlerMethodName
                },
            },
            "arguments": [
                {
                    type: or("ArrowFunctionExpression", "FunctionExpression"),
                    "params": [
                        {
                            "type": "Identifier",
                            "name": capture("argumentName")
                        }
                    ],
                }
            ]
        }
    } as Statement
}

export const functionCallMatcher = () => {
    return {
        "type": "FunctionDeclaration",
    } as FunctionDeclaration
}
