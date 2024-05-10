import {Statement} from "acorn";
import {Resource} from "@apibrew/react";

export const resourceStatement = (resource: Resource) => {
    let resourceArgument = resource.namespace.name + '/' + resource.name

    if (resource.namespace.name === 'default') {
        resourceArgument = resource.name
    }

    return {
        type: 'VariableDeclaration',
        kind: 'const',
        declarations: [
            {
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: resource.name
                },
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
                }
            }
        ]
    } as Statement
}

export const resourceHandlerMethodStatement = (resourceVarName: string, handlerMethodName: string, itemVarName: string) => {
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
                    "type": "ArrowFunctionExpression",
                    "params": [
                        {
                            "type": "Identifier",
                            "name": itemVarName
                        }
                    ],
                    body: {
                        type: "BlockStatement",
                        body: [] as Statement[]
                    }
                },
            ]
        }
    } as Statement
}

export const validateMethodCallStatement = (resourceName: string, itemVarName: string) => {
    return {
        "type": "ExpressionStatement",
        "expression": {
            "type": "CallExpression",
            "callee": {
                "type": "Identifier",
                "name": "validate" + resourceName
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
