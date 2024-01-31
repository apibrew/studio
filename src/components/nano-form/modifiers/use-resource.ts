import {CodeModifierCheckFunction, CodeModifierFunction} from "./abs";
import {Expression, Identifier, Program, Statement, VariableDeclarator} from "acorn";
import {astMatcher, capture, or} from "./matcher";

export interface UseResourceModifierOptions {
    /**
     * The name of the resource to use
     */
    namespace: string
    resource: string;
}

export const locateResourceVariable = (ast: Program, options: UseResourceModifierOptions): string | undefined => {
    let resourceArgument = options.namespace + '/' + options.resource

    if (options.namespace === 'default') {
        resourceArgument = or(resourceArgument, options.resource)
    }

    const result = astMatcher(ast, {
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
    })

    if (result.matches.length > 0) {
        return result.matches[0].extracted.resourceVariableName
    }

    return undefined
}

export const applyUseResourceModifier: CodeModifierFunction<UseResourceModifierOptions> = (ast, options): string => {
    let resourceArgument = options.namespace + '/' + options.resource

    if (options.namespace === 'default') {
        resourceArgument = options.resource
    }

    ast.body.unshift({
        type: 'VariableDeclaration',
        kind: 'const',
        declarations: [
            {
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: options.resource
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
    } as Statement)

    return resourceArgument
}

export const checkUseResourceModifierAlreadyApplied: CodeModifierCheckFunction<UseResourceModifierOptions> = (ast, options) => {
    return Boolean(locateResourceVariable(ast, options));
}