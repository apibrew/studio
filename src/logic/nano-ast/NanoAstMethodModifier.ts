import {Expression, Identifier} from 'acorn'
import {Ast} from "./abs";
import {AstScopeModifier} from "./AstScopeModifier";

export class NanoAstMethodModifier extends AstScopeModifier {

    constructor(ast: Ast) {
        super(ast);
    }

    args: string[] = []

    setArgs(args: string[]) {
        this.args = args
    }

    item(): Expression {
        if (this.args.length === 0) {
            throw new Error("Method has 0 args")
        }

        return {
            type: "Identifier",
            name: this.args[0],
        } as Identifier
    }
}