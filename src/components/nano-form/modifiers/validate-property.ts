import {CodeModifierCheckFunction, CodeModifierFunction} from "./abs";
import {applyUseResourceModifier, locateResourceVariable} from "./use-resource";
import {Statement} from "acorn";

export interface ValidatePropertyModifierOptions {
    /**
     * The name of the resource to use
     */
    namespace: string
    resource: string;
    propertyName: string;
    operator: string;
    value: string;
    errorMessage?: string;
}


export const applyValidatePropertyModifier: CodeModifierFunction<ValidatePropertyModifierOptions> = (ast, options) => {
    let resourceVarName = locateResourceVariable(ast, options)

    if (!resourceVarName) {
        resourceVarName = applyUseResourceModifier(ast, options) as any as string
    }


    ast.body.push({
        type: 'ExpressionStatement',
        expression: {
            type: 'CallExpression',
            callee: {
                type: 'MemberExpression',
                object: {
                    type: 'Identifier',
                    name: resourceVarName
                },
                property: {
                    type: 'Identifier',
                    name: 'validateProperty'
                }
            },
            arguments: [
                {
                    type: 'Literal',
                    value: options.propertyName
                },
                {
                    type: 'Literal',
                    value: options.operator
                },
                {
                    type: 'Literal',
                    value: options.value
                },
                {
                    type: 'Literal',
                    value: options.errorMessage || ''
                }
            ]
        }
    } as Statement)
}

export const checkValidatePropertyAlreadyApplied: CodeModifierCheckFunction<ValidatePropertyModifierOptions> = (ast, options) => {
    // return Boolean(locateResourceVariable(ast, options));
    return false
}