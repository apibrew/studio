import {Control, Flow} from "../../model/flow";

import React, {type MouseEvent as ReactMouseEvent, useMemo, useState} from 'react';
import ReactFlow, {Background, Controls, Edge, MiniMap, Node} from 'reactflow';
import 'reactflow/dist/style.css';
import './Customize.scss';
import './colors.scss';
import toast from "react-hot-toast";
import {Box, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {nodeTypes} from "./node-types";
import {useDrawer} from "../../hooks/use-drawer";
import {ControlFormDrawer} from "./ControlForm";
import {prepare, prepareNodeFromControl} from "./prepare";
import {getLayoutedElements} from "./layout";

export interface FlowDesignerProps {
    flow: Flow
    onSave: (flow: Flow) => void
}

export function FlowDesigner(props: FlowDesignerProps) {
    const [selectedNodes, setSelectedNodes] = useState<Node<Control>[]>([])
    const [name, setName] = useState(props.flow.name || '')
    const drawer = useDrawer()

    const preparedData = useMemo(() => prepare(props.flow), [props.flow])

    const [nodes, setNodes] = useState<Node[]>(preparedData.nodes)
    const [edges, setEdges] = useState<Edge[]>(preparedData.edges)

    async function handleSave() {
        // recreate flow
    }

    const layout = useMemo(() => getLayoutedElements(nodes, edges), [nodes, edges])

    const selectedNode = selectedNodes.length === 1 ? selectedNodes[0] : undefined;
    const selectedControl = selectedNode?.data
    const selectedControlType = selectedControl?.controlType

    async function nodeClick(event: ReactMouseEvent, node: Node) {
        if (node.id === 'start-here') {
            drawer.open(<ControlFormDrawer
                title={'Setup Starting Control'}
                value={{
                    id: 'control-' + Math.random(),
                    params: {}
                } as Control}
                onChange={(control: Control) => {
                    if (!control.controlType) {
                        toast.error('Control is required')
                        return Promise.reject()
                    }
                    if (control.controlType.kind !== 'ENTRY_POINT') {
                        toast.error('Control must be an entry point')
                        return Promise.reject()
                    }
                    setNodes([prepareNodeFromControl(control)])
                    drawer.close()
                }}
                onClose={drawer.close}
            />)
        } else {

        }
    }

    console.log('layout', layout)

    if (nodes.length === 0) {
        const startNode = {
            id: 'start-here',
            position: {x: 0, y: 0},
            data: {label: 'Start Here'},
            ariaLabel: "Start Here",
            connectable: true,
            type: 'startNode',
        }

        setNodes([startNode])
    }

    return <>
        {drawer.render()}
        <Box className='flow-designer-toolbar'>
            <TextField
                title={'Flow Name'}
                value={name || ''}
                onChange={e => {
                    setName(e.target.value)
                }}
            />
            <Button onClick={handleSave} variant='contained'>Save</Button>
            {selectedNode && <>
                <Button onClick={() => {
                    setNodes(nodes.filter(item => item.id !== selectedNode.id))
                    setEdges(edges.filter(item => item.source !== selectedNode.id && item.target !== selectedNode.id))
                }} variant='contained'>Delete</Button>
                <Button onClick={() => {
                    drawer.open(<ControlFormDrawer
                        title={'Update: ' + selectedNode.data.title}
                        value={selectedNode.data as Control}
                        onChange={(control: Control) => {
                            if (!control.controlType) {
                                toast.error('Control is required')
                                return Promise.reject()
                            }

                            setNodes(nodes.map(item => {
                                if (item.id === selectedNode.id) {
                                    return prepareNodeFromControl(control)
                                }
                                return item
                            }))

                            drawer.close()
                        }}
                        onClose={drawer.close}
                    />)
                }} variant='contained'>Edit</Button>

                {selectedControlType?.parameters.filter(item => item.paramKind === 'BLOCK').map(param => {
                    return <Button onClick={() => {
                        drawer.open(<ControlFormDrawer
                            title={'Add: ' + param.name}
                            value={{
                                id: 'control-' + Math.random(),
                                params: {}
                            } as Control}
                            onChange={(control: Control) => {
                                if (!control.controlType) {
                                    toast.error('Control is required')
                                    return Promise.reject()
                                }

                                setNodes([...nodes, prepareNodeFromControl(control)])
                                setEdges([...edges, {
                                    id: 'edge-' + selectedNode.id + '-' + 'control-' + control.id,
                                    source: selectedNode.id,
                                    target: 'control-' + control.id
                                }])

                                drawer.close()
                            }}
                            onClose={drawer.close}
                        />)
                    }} variant='contained'>Add {param.name}</Button>
                })}
            </>}
        </Box>
        <ReactFlow
            className='flow-designer'
            nodeTypes={nodeTypes}
            fitView={false}
            draggable={true}
            onSelectionChange={e => {
                setSelectedNodes(e.nodes)
            }}
            nodesDraggable={true}
            nodesConnectable={false}
            onNodeDoubleClick={nodeClick}
            nodes={layout.nodes}
            edges={layout.edges}>
            <Background/>
            <Controls/>
            <MiniMap/>
        </ReactFlow>
    </>
}
