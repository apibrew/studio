import {Control, Flow} from "../../model/flow";

import React, {useEffect, useState} from 'react';
import ReactFlow, {Background, Controls, Edge, MiniMap, Node, Panel} from 'reactflow';
import 'reactflow/dist/style.css';
import './Customize.scss';
import './colors.scss';
import toast from "react-hot-toast";
import {IconButton, Stack, TextField, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {nodeTypes} from "./node-types";
import {useDrawer} from "../../hooks/use-drawer";
import {ControlFormDrawer} from "./ControlForm";
import {getLayoutedElements} from "./layout";
import {FlowController} from "./FlowController";
import {Delete, Edit, LastPage, Save, ViewArray, ViewCompact} from "@mui/icons-material";

export interface FlowDesignerProps {
    flow: Flow
    onSave: (flow: Flow) => void
}

const controller = new FlowController();

export function FlowDesigner(props: FlowDesignerProps) {
    const [selectedNode, setSelectedNode] = useState<Node<Control>>()
    const drawer = useDrawer()
    const [nodes, setNodes] = useState<Node<Control>[]>([])
    const [edges, setEdges] = useState<Edge[]>([])
    const [mode, setMode] = useState<'compact' | 'detailed'>('compact')

    const triggerUpdate = () => {
        const layout = getLayoutedElements(controller.getNodes().map(node => {
            return {
                ...node,
                type: mode == 'compact' ? 'controlNodeCompact' : 'controlNode'
            }
        }), controller.getEdges())

        console.log('Trigger Update', layout)

        setNodes([...layout.nodes])
        setEdges([...layout.edges])

        if (layout.nodes.length === 0) {
            drawer.open(<ControlFormDrawer
                title={'Setup Starting Control'}
                value={controller.newControl()}
                onChange={(control: Control) => {
                    if (!control.controlType) {
                        toast.error('Control is required')
                        return Promise.reject()
                    }
                    if (control.controlType.kind !== 'ENTRY_POINT') {
                        toast.error('Control must be an entry point')
                        return Promise.reject()
                    }
                    controller.clear()
                    controller.addRootControl(control)
                    drawer.close()
                    triggerUpdate()
                }}
                onClose={() => {
                    if (controller.getNodes().length == 0) {
                        toast.error('You must choose initial control')
                    }
                }}
            />, {
                allowClose: false
            })
        }
    }

    useEffect(() => {
        controller.setFlow(props.flow)
        triggerUpdate()
    }, [props.flow]);

    async function handleSave() {
        // recreate flow
        props.onSave(controller.getFlow())
    }

    const selectedControl = selectedNode?.data
    const selectedControlType = selectedControl?.controlType

    console.log('Render: ')

    return <>
        {drawer.render()}
        <ReactFlow
            className='flow-designer'
            nodeTypes={nodeTypes}
            fitView={true}
            draggable={true}
            onNodeClick={(e, node) => {
                setSelectedNode(node as Node<Control>)
                e.preventDefault()
                e.stopPropagation()
            }}
            onClick={e => {
                setSelectedNode(undefined)
            }}
            nodesDraggable={true}
            nodesConnectable={true}
            nodes={nodes}
            edges={edges}>
            <Background/>
            <Controls/>
            <MiniMap/>
            <Panel position={'top-right'}>
                <Stack spacing={2} direction='row'>
                    <TextField
                        title={'Flow Name'}
                        size='small'
                        value={controller.getFlow().name || ''}
                        onChange={e => {
                            controller.setFlowName(e.target.value)
                            triggerUpdate()
                        }}
                    />
                    <IconButton onClick={handleSave} size='small'>
                        <Save/>
                    </IconButton>
                    {selectedNode && <>
                        <IconButton onClick={() => {
                            controller.removeNode(selectedNode)
                            triggerUpdate()
                        }}><Delete/></IconButton>
                        <IconButton onClick={() => {
                            drawer.open(<ControlFormDrawer
                                title={'Update: ' + selectedNode.data.title}
                                value={selectedNode.data as Control}
                                onChange={(control: Control) => {
                                    if (!control.controlType) {
                                        toast.error('Control is required')
                                        return Promise.reject()
                                    }

                                    controller.updateNode(selectedNode, control)
                                    triggerUpdate()

                                    drawer.close()
                                }}
                                onClose={drawer.close}
                            />)
                        }}><Edit/></IconButton>

                        {selectedControlType?.parameters
                            .filter(item => item.paramKind === 'BLOCK')
                            .map(param => {
                                return <IconButton
                                    key={param.name}
                                    onClick={() => {
                                        drawer.open(<ControlFormDrawer
                                            title={'Add: ' + param.name}
                                            value={controller.newControl()}
                                            onChange={(control: Control) => {
                                                if (!control.controlType) {
                                                    toast.error('Control is required')
                                                    return Promise.reject()
                                                }

                                                controller.addNodeToLastPlaceOfBase(selectedNode, param, control)
                                                triggerUpdate()

                                                drawer.close()

                                                toast.success('Control added')
                                            }}
                                            onClose={() => {
                                                drawer.close()
                                            }}
                                        />)
                                    }}><LastPage/></IconButton>
                            })}
                    </>}
                    <ToggleButtonGroup value={mode} exclusive onChange={(e, value) => {
                        setMode(value)
                    }}>
                        <ToggleButton size='small' value={'compact'}>
                            <ViewCompact/>
                        </ToggleButton>
                        <ToggleButton size='small' value={'detailed'}>
                            <ViewArray/>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Stack>
            </Panel>
        </ReactFlow>
    </>
}
