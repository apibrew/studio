import {Flow, FlowEntityInfo} from "../../model/flow";

import React, {useState} from 'react';
import ReactFlow, {Background, Controls, MiniMap} from 'reactflow';
import 'reactflow/dist/style.css';
import './Customize.scss';
import './colors.scss';
import {useNavigate} from "react-router-dom";
import {useRepository} from "@apibrew/react";
import toast from "react-hot-toast";
import {Box} from "@mui/material";
import Button from "@mui/material/Button";

export interface FlowDesignerProps {
    flow: Flow
}

export function FlowDesigner(props: FlowDesignerProps) {
    const [flow, setFlow] = useState<Flow>(props.flow)


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
        <Box className='flow-designer-toolbar'>
            <Button onClick={handleSave} variant='contained'>Save</Button>
        </Box>
        <ReactFlow
            className='flow-designer'
            nodeTypes={{}}
            fitView={false}
            nodesDraggable={true}
            nodesConnectable={false}
            defaultNodes={[]}
            defaultEdges={[]}>
            <Background/>
            <Controls/>
            <MiniMap/>
        </ReactFlow>
    </>
}
