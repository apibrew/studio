import type {NodeProps} from "@reactflow/core/dist/esm/types/nodes";
import {Box, Table, TableBody, TableCell, TableRow} from "@mui/material";
import {Control} from "../../../model/flow";
import React from "react";
import {Handle, Position} from "reactflow";

export const ControlNodeCompact = (props: NodeProps<Control>) => {
    let title = props.data.title || props.data.controlType?.name
    const controlType = props.data.controlType

    if (controlType === undefined) {
        return <Box width='200px'
                    className='node start-node'>
            <Handle type="target" position={Position.Top}/>
            <Box className='node-header'>
                {title}
            </Box>
        </Box>
    }

    return <Box width='200px'
                className='node start-node'>
        {controlType.kind !== 'ENTRY_POINT' && <>
            <Handle type="target" position={Position.Top}/>
        </>}
        <Box className='node-header'>
            <span style={{
                marginRight: '5px'
            }}>
                <b>{controlType.name}</b>
            </span>
            <span>
                {title}
            </span>
            {/*<span>[{props.id}]</span>*/}
        </Box>
        <Handle type="source" position={Position.Bottom}/>
    </Box>
}
