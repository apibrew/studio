import {Handle, Position} from "reactflow";
import React from "react";
import {ArrowDownward} from "@mui/icons-material";

export interface SingleNodeProps {
    data: {
        label: string
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
            <ArrowDownward className='icon'/>
            <span className='text'>
                <b>{props.data.label}</b>
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