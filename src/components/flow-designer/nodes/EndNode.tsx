import {EventParams} from "../../../model/flow";
import {Handle, Position} from "reactflow";
import React from "react";
import './EndNode.scss'

export interface EventNodeProps {
    data: EventParams,
    isConnectable: boolean,
    selected: boolean
}

export function EndNode(props: EventNodeProps) {
    return <>
        <Handle
            type="target"
            position={Position.Top}
            id="a"
            style={{background: '#555'}}
            isConnectable={props.isConnectable}
        />
        <div className='label'>
            <b>End</b>
        </div>
    </>
}