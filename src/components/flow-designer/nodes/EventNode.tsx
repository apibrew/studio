import {EventParams} from "../../../model/flow";
import {Handle, Position} from "reactflow";
import React from "react";
import './EventNode.scss'
import {ArrowDownward} from "@mui/icons-material";

export interface EventNodeProps {
    data: EventParams,
    isConnectable: boolean,
    selected: boolean
}

export function EventNode(props: EventNodeProps) {
    return <>
        <div className='label'>
            <ArrowDownward className='icon'/>
            <span className='text'>
                <b>{props.data.type}</b>
            </span>
            <span className='text'>({props.data.order.toLowerCase()} - {props.data.action.toLowerCase()})</span>
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