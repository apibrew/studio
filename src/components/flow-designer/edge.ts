import {Flow, Statement} from "../../model/flow";
import {Edge, MarkerType} from "reactflow";

function prepareEdge(statement: Statement, index: number): Edge {
    return {
        id: 'A->B',
        source: 'node-' + index,
        target: 'node-' + (index + 1),
        markerEnd: {
            type: MarkerType.Arrow,
        },
    };
}

export function prepareEdges(flow: Flow): Edge[] {
    return flow.statements.map((statement, index) => prepareEdge(statement, index))
}