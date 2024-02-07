import {BaseNanoAstModifier} from "./BaseNanoAstModifier";
import {Ast} from "./abs";
import {
    BinaryExpression,
    BinaryOperator,
    BlockStatement,
    Expression,
    Identifier,
    Statement,
    ThrowStatement
} from "acorn";
import {ensureStatement} from "./matcher";
import {appendStatementToSection} from "./positions";

export class AstScopeModifier extends BaseNanoAstModifier {

    constructor(ast: Ast) {
        super(ast);
    }

    if(binaryStatement: BinaryExpression, prepare: (scopeModifier: AstScopeModifier) => void, prepareElse?: (scopeModifier: AstScopeModifier) => void) {
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

    property(item: Expression, property: string): Expression {
        return {
            type: "MemberExpression",
            object: item,
            property: this.identifier(property)
        } as Expression;
    }

    identifier(name: string) {
        return {
            type: "Identifier",
            name: name,
        } as Identifier
    }

    value(value: any): Expression {
        return {
            type: "Literal",
            value: value,
            raw: value,
        } as Expression;
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
}