import React from 'react';
import ReactFlow, {Background, Controls, MarkerType, MiniMap, Node} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from "./CustomNode";

const defaultNodes: Node[] = [
    {
        id: 'node-1',
        type: 'test1',
        position: {x: 500, y: 20},
        data: {label: 'User Registration', additionalDetails: '(username, password, email)'},
    },
    {
        id: 'node-2',
        type: 'test1',
        position: {x: 500, y: 100},
        data: {label: 'Create system/User', additionalDetails: `username = $username; password = $password`},
    },
    {
        id: 'node-3',
        type: 'test1',
        position: {x: 500, y: 180},
        data: {label: 'Create UserProfile', additionalDetails: `username = $username; email = $email`},
    },
];

const defaultEdges = [
    {
        id: 'A->B',
        source: 'node-1',
        target: 'node-2',
        markerEnd: {
            type: MarkerType.Arrow,
        },
    },
    {
        id: 'C->D',
        source: 'node-2',
        target: 'node-3',
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
    },
];

export default function MarkersExample() {
    return (
        <>
            <ReactFlow
                nodeTypes={{
                    test1: CustomNode,
                }}
                fitView={true}
                defaultNodes={defaultNodes}
                defaultEdges={defaultEdges}>
                <Background/>
                <Controls/>
                <MiniMap/>
            </ReactFlow>
        </>
    );
}