import {Handle, Position} from "reactflow";
import React, {ReactNode} from "react";

export interface EntryNodeProps {
    data: {
        icon: ReactNode
        label: string
        text: string
    },
    isConnectable: boolean,
    selected: boolean
}

export function EntryNode(props: EntryNodeProps) {
    return <>
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