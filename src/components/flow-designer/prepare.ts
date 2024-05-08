import {Edge, Node} from "reactflow";
import {Control, Flow} from "../../model/flow";
import {Parameter} from "../../model/flow-control-type";

export interface DesignerData {
    nodes: Node[];
    edges: Edge[];
}

export function prepareNodeFromControl(control: Control): Node {
    return {
        id: 'control-' + control.id,
        position: {x: 500, y: 0},
        data: control,
        ariaLabel: control.title,
        connectable: true,
        type: 'controlNode',
    };
}

export function prepare(flow: Flow): DesignerData {
    let nodes: Node[] = []
    let edges: Edge[] = []
    let index = 0;

    for (let i = 0; i < flow.controls.length; i++) {
        let control = flow.controls[i];

        index++;
        nodes.push(prepareNodeFromControl(control))

        for (const param of control.controlType.parameters) {
            if (param.paramKind === 'BLOCK') {
                const subData = prepareSub(control, param, index)

                nodes.push(...subData.nodes)
                edges.push(...subData.edges)
            }
        }
    }

    return {
        nodes,
        edges
    }
}

export function prepareSub(control: Control, param: Parameter, index: number): DesignerData {
    let nodes: Node[] = []
    let edges: Edge[] = []

    let fromNodeId = 'node-' + index

    let statements = control.params[param.name] as Control[] || []

    for (const statement of statements) {
        index++;
        nodes.push({
            id: 'node-' + index,
            position: {x: 500, y: 100 * (index)},
            data: statement,
            ariaLabel: statement.title,
            connectable: true,
            type: 'controlNode',
        })

        edges.push({
            id: 'edge-' + fromNodeId + '-' + 'node-' + index,
            source: fromNodeId,
            target: 'node-' + index,
            animated: true,
        })

        for (const param of statement.controlType.parameters) {
            if (param.paramKind === 'BLOCK') {
                const subData = prepareSub(statement, param, index)

                nodes.push(...subData.nodes)
                edges.push(...subData.edges)
            }
        }
    }

    return {
        nodes,
        edges
    }
}
