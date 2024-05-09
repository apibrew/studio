import {ValueDrawerComponent, ValueDrawerComponentFormProps} from "../common/ValueDrawerComponent";
import {Control} from "../../model/flow";
import {useRecords} from "@apibrew/react";
import {FlowControlType, FlowControlTypeEntityInfo, Kind, Parameter} from "../../model/flow-control-type";
import {LoadingOverlay} from "../LoadingOverlay";
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import React from "react";
import {label} from "@apibrew/client/util/record";
import Checkbox from "@mui/material/Checkbox";
import {ResourceSelect} from "../ResourceSelect";

export const ControlForm = (props: ValueDrawerComponentFormProps<Control>) => {
    const flowControls = useRecords<FlowControlType>(FlowControlTypeEntityInfo)

    if (flowControls === undefined) {
        return <LoadingOverlay/>
    }

    let selectedControlType: FlowControlType | undefined = flowControls.find(item => item.id === props.value?.controlType?.id)

    return <Box width='600px'>
        <FormControl fullWidth>
            <InputLabel shrink={true}>Title</InputLabel>
            <TextField
                value={props.value.title || ''}
                onChange={e => {
                    props.onChange({
                        ...props.value,
                        title: e.target.value
                    })
                }}
            />
        </FormControl>
        <FormControl fullWidth>
            <InputLabel shrink={true}>Control*</InputLabel>
            <Select
                size='small'
                value={props.value?.controlType?.id || ''}
                onChange={e => {
                    props.onChange({
                        ...props.value,
                        controlType: flowControls.find(item => item.id === e.target.value)!
                    })
                }}
            >
                {flowControls.map(item => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
            </Select>
        </FormControl>
        {selectedControlType && <>
            <b>Parameters:</b>
            <br/>
            <Table>
                <TableHead>
                   <TableRow>
                       <TableCell>Name</TableCell>
                       <TableCell>Current</TableCell>
                       <TableCell>Update</TableCell>
                   </TableRow>
                </TableHead>
                <TableBody>
                    {selectedControlType.parameters.map(param => {
                        return <ParameterRow
                            param={param}
                            key={param.name}
                            value={props.value.params[param.name]}
                            onChange={newValue => {
                                props.onChange({
                                    ...props.value,
                                    params: {
                                        ...props.value.params,
                                        [param.name]: newValue
                                    }
                                })
                            }}
                        />
                    })}
                </TableBody>
            </Table>
        </>}
    </Box>
}

interface ParameterRowProps {
    param: Parameter
    value?: any

    onChange(value: any): void
}

function ParameterRow({param, value, onChange}: ParameterRowProps) {
    return <TableRow>
        <TableCell>{param.name}</TableCell>
        <TableCell>
            <span>
            {!value && 'Null'} {value && label(value) || ''}
            </span>
        </TableCell>
        <TableCell>
            {param.paramKind === 'ENUM' && <Select
                sx={{width: '100%'}}
                size='small'
                value={value || ''}
                onChange={e => {
                    onChange(e.target.value)
                }}
            >
                {param.enumValues.map(value => <MenuItem key={value} value={value}>{value}</MenuItem>)}
            </Select>}
            {param.paramKind === 'BOOLEAN' && <Checkbox
                sx={{width: '100%'}}
                size='small'
                checked={Boolean(value)}
                onChange={e => {
                    onChange(e.target.checked)
                }}
            />}
            {param.paramKind === 'RESOURCE' && <ResourceSelect
                sx={{width: '100%'}}
                value={value}
                onChange={(e, resource) => {
                    if (!resource) {
                        onChange(undefined)
                        return
                    }

                    if (resource.namespace && resource.namespace.name !== 'default') {
                        onChange(resource?.namespace.name + '/' + resource?.name)
                    } else {
                        onChange(resource?.name)
                    }
                }}/>}
        </TableCell>
    </TableRow>
}

export interface ControlFormDrawerProps {
    title: string
    value: Control
    onChange: (value: Control) => void
    onClose: () => void
}

export function ControlFormDrawer(props: ControlFormDrawerProps) {
    return <ValueDrawerComponent
        title={props.title}
        value={props.value}
        onChange={props.onChange}
        onClose={props.onClose}
        component={ControlForm}/>
}
