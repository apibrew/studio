import {capture, or} from "./matcher";
import {Expression, Identifier, Statement, VariableDeclarator} from "acorn";

export const resourceMatcher = (namespace: string, resource: string) => {
    let resourceArgument = namespace + '/' + resource

    if (namespace === 'default') {
        resourceArgument = or(resourceArgument, resource)
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

export const resourceHandlerMethodMatcher = (resourceVarName: string, resourceItemVarName: string) => {
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
                    "name": resourceItemVarName
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

export const validateMethodMatcher = (resource: string, itemVarName: string) => {
    return {
        "type": "ExpressionStatement",
        "expression": {
            "type": "CallExpression",
            "callee": {
                "type": "Identifier",
                "name": "validate" + resource
            },
            "arguments": [
                {
                    "type": "Identifier",
                    "name": itemVarName
                }
            ]
        }
    } as Statement
}