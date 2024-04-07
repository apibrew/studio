import {Node} from "reactflow";
import {Flow, Statement} from "../../model/flow";

function prepareNode(statement: Statement, index: number): Node {
    return {
        id: 'node-' + index,
        type: statement.kind,
        position: {x: 500, y: 20 + index * 80},
        data: statement.params,
    };
}

export function prepareNodes(flow: Flow): Node[] {
    return flow.statements.map((statement, index) => prepareNode(statement, index))
}