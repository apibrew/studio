import {Flow, FlowEntityInfo} from "../../model/flow";

import React, {useState} from 'react';
import ReactFlow, {Background, Controls, MiniMap} from 'reactflow';
import 'reactflow/dist/style.css';
import {nodeTypes} from "./node-types";
import './Customize.scss';
import {prepare} from "./nodes";
import {useNavigate} from "react-router-dom";
import {useRepository} from "@apibrew/react";
import toast from "react-hot-toast";

export interface FlowDesignerProps {
    flow: Flow
}

export function FlowDesigner(props: FlowDesignerProps) {
    const [flow, setFlow] = useState<Flow>(props.flow)

    const [defaultNodes, defaultEdges] = prepare(flow);

    const navigate = useNavigate()
    const repository = useRepository<Flow>(FlowEntityInfo)

    async function handleSave() {
        toast.promise(repository.create(flow), {
            loading: 'Saving...',
            success: 'Saved',
            error: err => err.message
        }).then(resp => {
            navigate('../' + resp.name)
        })
    }

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
