import type {NodeProps} from "@reactflow/core/dist/esm/types/nodes";
import {Box, Table, TableBody, TableCell, TableRow} from "@mui/material";
import {Control} from "../../../model/flow";
import React from "react";
import {Handle, Position} from "reactflow";
import Button from "@mui/material/Button";


export const ControlNode = (props: NodeProps<Control>) => {
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
            {title}
        </Box>
        <Box className='node-content'>
            <Table className='node-parameter'>
                <TableBody>
                    {controlType.parameters.map(item => {
                        let value = props.data.params[item.name] as any

                        if (item.paramKind === 'BLOCK') {
                            value = <>
                                <Handle type="source" position={Position.Right}/>
                            </>
                        } else if (item.paramKind === 'BOOLEAN') {
                            value = Boolean(value) ? 'True' : 'False'
                        }

                        return <TableRow key={item.name}>
                            <TableCell className='node-parameter-label'>
                                {item.name}
                            </TableCell>
                            <TableCell className='node-parameter-value'>
                                {value}
                            </TableCell>
                        </TableRow>
                    })}

                </TableBody>
            </Table>
        </Box>
    </Box>
}
