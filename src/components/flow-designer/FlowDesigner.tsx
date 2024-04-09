import {Flow} from "../../model/flow";

import React from 'react';
import ReactFlow, {Background, Controls, MiniMap, Node} from 'reactflow';
import 'reactflow/dist/style.css';
import {nodeTypes} from "./node-types";
import './Customize.scss';
import {prepare} from "./nodes";

export interface FlowDesignerProps {
    flow: Flow
    onChange: (flow: Flow) => void
}

export function FlowDesigner(props: FlowDesignerProps) {
    const [defaultNodes, defaultEdges] = prepare(props.flow);

    return <>
        <ReactFlow
            className='flow-designer'
            nodeTypes={nodeTypes}
            fitView={false}
            nodesDraggable={false}
            nodesConnectable={false}
            defaultNodes={defaultNodes}
            defaultEdges={defaultEdges}>
            <Background/>
            <Controls/>
            <MiniMap/>
        </ReactFlow>
    </>
}
