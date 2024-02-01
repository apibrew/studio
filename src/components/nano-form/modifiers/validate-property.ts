import {CodeModifierCheckFunction, CodeModifierFunction} from "./abs";
import {declareUseResourceModifier} from "./use-resource";
import {declareResourceHandlerMethod, ensureResourceHandlerResult} from "./resource-handlers";
import {
    ArrowFunctionExpression,
    BlockStatement,
    CallExpression,
    ExpressionStatement,
    FunctionDeclaration,
    Statement
} from "acorn";
import {declareFunction, declareFunctionResult} from "./common";
import {astMatcher} from "./matcher";
import {validateMethodStatement} from "./statements";
import {resourceItemVarName} from "./names";

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
    let resourceVarName = declareUseResourceModifier(ast, options)
    const itemVarName = resourceItemVarName(options.resource)

    const beforeUpdateHandler = declareResourceHandlerMethod(ast, resourceVarName, 'beforeUpdate', options.resource)
    const beforeCreateHandler = declareResourceHandlerMethod(ast, resourceVarName, 'beforeCreate', options.resource)

    declareValidateMethodCall(beforeUpdateHandler, itemVarName, options)
    declareValidateMethodCall(beforeCreateHandler, itemVarName, options)

    const validateHandler = declareFunction(ast, 'validate' + options.resource, [itemVarName])

    declareValidateMethodBody(validateHandler, itemVarName, options)
}

function declareValidateMethodCall(beforeUpdateHandler: ensureResourceHandlerResult, itemVarName: string, options: ValidatePropertyModifierOptions) {
    const functionAst =
        (((beforeUpdateHandler.statement as ExpressionStatement).expression as CallExpression)
            .arguments[0] as ArrowFunctionExpression).body as BlockStatement


    const matches = astMatcher(functionAst, validateMethodStatement(options.resource, itemVarName))

    if (matches.matches.length > 0) {
        return
    }

    functionAst.body.push(validateMethodStatement(options.resource, itemVarName))
}

function declareValidateMethodBody(beforeUpdateHandler: declareFunctionResult, itemVarName: string, options: ValidatePropertyModifierOptions) {
    const functionAst = beforeUpdateHandler.statement as FunctionDeclaration

    const statement: Statement = {
        "type": "IfStatement",
        "test": {
            "type": "BinaryExpression",
            "left": {
                "type": "MemberExpression",
                "object": {
                    "type": "Identifier",
                    "name": itemVarName
                },
                "property": {
                    "type": "Identifier",
                    "name": options.propertyName
                },
            },
            "operator": options.operator,
            "right": {
                "type": "Literal",
                "value": options.value,
            }
        },
        "consequent": {
            "type": "BlockStatement",
            "body": [
                {
                    "type": "ThrowStatement",
                    "argument": {
                        "type": "NewExpression",
                        "callee": {
                            "type": "Identifier",
                            "name": "Error"
                        },
                        "arguments": [
                            {
                                "type": "Literal",
                                "value": options.errorMessage,
                            }
                        ]
                    }
                }
            ]
        }
    } as Statement

    const matches = astMatcher(functionAst.body, statement)

    if (matches.matches.length > 0) {
        return
    }

    functionAst.body.body.push(statement)
}

export const checkValidatePropertyAlreadyApplied: CodeModifierCheckFunction<ValidatePropertyModifierOptions> = (ast, options) => {
    // return Boolean(locateResourceVariable(ast, options));
    return false
}