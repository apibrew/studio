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

    itemName(): string {
        if (this.args.length === 0) {
            throw new Error("Method has 0 args")
        }

        return this.args[0]
    }

    item(): Expression {
        const itemName = this.itemName()

        return {
            type: "Identifier",
            name: itemName,
        } as Identifier
    }
}