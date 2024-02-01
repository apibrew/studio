import {Statement} from "acorn";

export const resourceStatement = (namespace: string, resource: string) => {
    let resourceArgument = namespace + '/' + resource

    if (namespace === 'default') {
        resourceArgument = resource
    }

    return {
        type: 'VariableDeclaration',
        kind: 'const',
        declarations: [
            {
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: resource
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

export const validateMethodStatement = (resource: string, itemVarName: string) => {
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