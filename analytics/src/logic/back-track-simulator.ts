import {Client} from "@apibrew/client";
import {Result} from "../model/backtrack/result.ts";
import {SymbolMovement} from "../model/backtrack/symbol-movement.ts";

export class BackTrackSimulator {
    result?: Result;
    symbolMovements?: SymbolMovement[];

    public constructor(private client: Client) {
        this.symbolMovements = [];
    }

    async load(id: string): Promise<void> {
    }

    calculate() {
        this.symbolMovements.push({
            date: new Date().toISOString(),
            symbol: 'QQQ',
        } as SymbolMovement)
    }
}
