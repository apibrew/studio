import {Statement} from "acorn";
import {astMatcher} from "./matcher";
import {Ast} from "./abs";
import {resourceHandlerMethodMatcher} from "./matchers";
import {resourceHandlerMethodStatement} from "./statements";
import {appendStatementToSection} from "./positions";

export interface ensureResourceHandlerResult {
    statement: Statement
    itemVarName: string
}

export function declareResourceHandlerMethod(ast: Ast, resourceVarName: string, handlerMethodName: string, resourceItemVarName: string): ensureResourceHandlerResult {
    const matches = astMatcher(ast, resourceHandlerMethodMatcher(resourceVarName, handlerMethodName))

    if (matches.matches.length > 0) {
        return {
            statement: matches.matches[0].statement,
            itemVarName: matches.matches[0].extracted.argumentName
        }
    }

    const statement = resourceHandlerMethodStatement(resourceVarName, handlerMethodName, resourceItemVarName)

    // ast.body.push(statement)

    appendStatementToSection(ast, statement, 'handlers')

    return {
        statement,
        itemVarName: resourceItemVarName
    }
}