import {Control, Flow, FlowEntityInfo} from "../../model/flow";

import React, {type MouseEvent as ReactMouseEvent, useState} from 'react';
import ReactFlow, {Background, Controls, Edge, MiniMap, Node} from 'reactflow';
import 'reactflow/dist/style.css';
import './Customize.scss';
import './colors.scss';
import {useNavigate} from "react-router-dom";
import {useRepository} from "@apibrew/react";
import toast from "react-hot-toast";
import {Box} from "@mui/material";
import Button from "@mui/material/Button";
import {nodeTypes} from "./node-types";
import {useDrawer} from "../../hooks/use-drawer";
import {ControlFormDrawer} from "./ControlForm";

export interface FlowDesignerProps {
    flow: Flow
}

export function FlowDesigner(props: FlowDesignerProps) {
    const [flow, setFlow] = useState<Flow>(props.flow)
    const drawer = useDrawer()

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

    async function nodeClick(event: ReactMouseEvent, node: Node) {
        if (node.id === 'start-here') {
            drawer.open(<ControlFormDrawer
                title={'Setup Starting Control'}
                value={{
                    params: {}
                } as Control}
                onChange={(control: Control) => {
                    if (!control.control) {
                        toast.error('Control is required')
                        return Promise.reject()
                    }
                    setFlow({
                        ...flow,
                        controls: [control]
                    })
                    drawer.close()
                }}
                onClose={drawer.close}
            />)
        }
    }

    const nodes: Node[] = []
    const edges: Edge[] = []

    if (flow.controls.length == 0) {
        nodes.push({
            id: 'start-here',
            position: {x: 100, y: 100},
            data: {label: 'Start Here'},
            ariaLabel: "Start Here",
            connectable: false,
            type: 'startNode',
        })
    }

    for (const control of flow.controls) {

    }

    return <>
        {drawer.render()}
        <Box className='flow-designer-toolbar'>
            <Button onClick={handleSave} variant='contained'>Save</Button>
        </Box>
        <ReactFlow
            className='flow-designer'
            nodeTypes={nodeTypes}
            fitView={false}
            nodesDraggable={true}
            nodesConnectable={false}
            onClick={e => {
                console.log(e)
            }}
            onNodeClick={nodeClick}
            nodes={nodes}
            edges={edges}>
            <Background/>
            <Controls/>
            <MiniMap/>
        </ReactFlow>
    </>
}

