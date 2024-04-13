import {Handle, Position} from "reactflow";
import React, {ReactNode} from "react";

export interface SingleNodeProps {
    data: {
        label: string
        text: string
        icon: ReactNode
    },
    isConnectable: boolean,
    selected: boolean
}

export function SingleNode(props: SingleNodeProps) {
    return <>
        <Handle
            type="target"
            position={Position.Top}
            id="a"
            style={{background: '#555'}}
            isConnectable={props.isConnectable}
        />
        <div className='label'>
            {props.data.icon}
            <span className='text'>
                <b>{props.data.label}</b>
                {props.data.text}
            </span>
        </div>
        <Handle
            type="source"
            position={Position.Bottom}
            id="a"
            style={{background: '#555'}}
            isConnectable={props.isConnectable}
        />
    </>
}