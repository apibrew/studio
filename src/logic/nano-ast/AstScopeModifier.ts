import {BaseNanoAstModifier} from "./BaseNanoAstModifier";
import {Ast} from "./abs";
import {
    BinaryExpression,
    BinaryOperator,
    BlockStatement,
    CallExpression,
    Expression,
    Statement,
    ThrowStatement
} from "acorn";
import {ensureStatement} from "./matcher";
import {appendStatementToSection} from "./positions";

export class AstScopeModifier extends BaseNanoAstModifier {

    constructor(ast: Ast) {
        super(ast);
    }

    if(binaryStatement: Expression, prepare: (scopeModifier: AstScopeModifier) => void, prepareElse?: (scopeModifier: AstScopeModifier) => void) {
        const ast: Ast = {
            type: "BlockStatement",
            body: [] as Statement[]
        } as BlockStatement

        const scopeModifier = new AstScopeModifier(ast)

        prepare(scopeModifier)

        let alternateAst: Ast | undefined

        if (prepareElse) {
            alternateAst = {
                type: "BlockStatement",
                body: [] as Statement[]
            } as BlockStatement

            const elseScopeModifier = new AstScopeModifier(alternateAst)

            prepareElse(elseScopeModifier)
        }

        const statement: Statement = {
            type: "IfStatement",
            test: binaryStatement,
            consequent: ast as Statement,
            alternate: alternateAst as Statement
        } as Statement

        ensureStatement(this.ast, statement, statement)
    }

    binaryStatement(left: Expression, right: Expression, operation: BinaryOperator): BinaryExpression {
        return {
            type: "BinaryExpression",
            left: left,
            right: right,
            operator: operation,
        } as BinaryExpression;
    }

    throwError(message: string): void {
        const statement: Statement = {
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
                        "raw": JSON.stringify(message),
                        "value": message
                    }
                ]
            }
        } as ThrowStatement

        appendStatementToSection(this.ast, statement, 'functions')
    }

    callMethod(methodName: string, ...args: Expression[]) {
        const statement = this.call(this.identifier(methodName), ...args)

        ensureStatement(this.ast, statement, statement)
    }

    call(callee: Expression, ...args: Expression[]): Statement {
        return {
            type: 'ExpressionStatement',
            expression: this.callExpression(callee, ...args)
        } as Statement
    }

    callExpression(callee: Expression, ...args: Expression[]): CallExpression {
        return {
            type: "CallExpression",
            callee: callee,
            arguments: args
        } as CallExpression
    }
}