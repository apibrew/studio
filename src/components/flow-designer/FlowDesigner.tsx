import {Flow} from "../../model/flow";

import React from 'react';
import ReactFlow, {Background, Controls, MiniMap, Node} from 'reactflow';
import 'reactflow/dist/style.css';
import {prepareNodes} from "./nodes";
import {prepareEdges} from "./edge";
import {nodeTypes} from "./node-types";

export interface FlowDesignerProps {
    flow: Flow
    onChange: (flow: Flow) => void
}

export function FlowDesigner(props: FlowDesignerProps) {
    const defaultNodes: Node[] = prepareNodes(props.flow);

    const defaultEdges = prepareEdges(props.flow)

    console.log(defaultNodes)

    return <>
        <ReactFlow
            nodeTypes={nodeTypes}
            fitView={true}
            defaultNodes={defaultNodes}
            defaultEdges={defaultEdges}>
            <Background/>
            <Controls/>
            <MiniMap/>
        </ReactFlow>
    </>
}
