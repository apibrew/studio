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
import {Type} from "@apibrew/client/model/resource";

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
    propertyType: Type;
}


export const applyValidatePropertyModifier: CodeModifierFunction<ValidatePropertyModifierOptions> = (ast, options) => {
    let resourceVarName = declareUseResourceModifier(ast, options)
    const itemVarName = resourceItemVarName(options.resource)

    const beforeUpdateHandler = declareResourceHandlerMethod(ast, resourceVarName, 'beforeUpdate', itemVarName)
    const beforeCreateHandler = declareResourceHandlerMethod(ast, resourceVarName, 'beforeCreate', itemVarName)

    declareValidateMethodCall(beforeUpdateHandler, itemVarName, options)
    declareValidateMethodCall(beforeCreateHandler, itemVarName, options)

    const validateHandler = declareFunction(ast, 'validate' + options.resource, [itemVarName], 'validators')

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

    let value = options.value as any
    let valueRaw = JSON.stringify(options.value)

    switch (options.propertyType) {
        case Type.BOOL:
            valueRaw = valueRaw === 'true' ? 'true' : 'false'
            value = valueRaw === 'true'
            break;
        case Type.INT32:
        case Type.INT64:
            value = parseInt(options.value)
            valueRaw = options.value
            break;
        case Type.FLOAT32:
        case Type.FLOAT64:
            value = parseFloat(options.value)
            valueRaw = options.value
            break;
    }

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
                "value": value,
                "raw": valueRaw
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
                                "raw": `"${options.errorMessage}:" + ${itemVarName}.${options.propertyName}`,
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

    console.log('checking 1', functionAst.body.body, statement)

    functionAst.body.body.push(statement)
}

export const checkValidatePropertyAlreadyApplied: CodeModifierCheckFunction<ValidatePropertyModifierOptions> = (ast, options) => {
    // return Boolean(locateResourceVariable(ast, options));
    return false
}