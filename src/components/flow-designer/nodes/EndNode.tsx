import {Handle, Position} from "reactflow";
import React from "react";

export interface EventNodeProps {
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