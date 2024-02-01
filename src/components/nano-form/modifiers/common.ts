import {Program, Statement} from "acorn";
import {astMatcher, capture} from "./matcher";
import {Ast} from "./abs";

export interface declareFunctionResult {
    statement: Statement
    args: string[]
}

export function declareFunction(ast: Ast, functionName: string, args: string[]): declareFunctionResult {
    const matches = astMatcher(ast, {
        "type": "FunctionDeclaration",
        "id": {
            "type": "Identifier",
            "name": functionName
        },
        "params": args.map(arg => ({
            "type": "Identifier",
            "name": capture(arg)
        })),
    } as Statement)

    if (matches.matches.length > 0) {
        return {
            statement: matches.matches[0].statement,
            args: args.map(item => matches.matches[0].extracted[item])
        }
    }

    const statement = {
        "type": "FunctionDeclaration",
        "id": {
            "type": "Identifier",
            "name": functionName
        },
        "params": args.map(arg => ({
            "type": "Identifier",
            "name": arg
        })),
        body: {
            "type": "BlockStatement",
            "body": [] as Statement[]
        }
    } as Statement

    ast.body.push(statement)

    return {
        statement: statement,
        args
    }
}