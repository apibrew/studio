import {FlowControlType, Kind, Parameter, ParamKind} from "../../../model/flow-control-type";
import {
    Box,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Tooltip
} from "@mui/material";
import React from "react";
import Editor from "@monaco-editor/react";
import {Add, Delete} from "@mui/icons-material";
import {TagInput} from "../../../components/TagInput";
import Checkbox from "@mui/material/Checkbox";

export interface FlowControlFormProps {
    value: FlowControlType;
    onChange: (value: FlowControlType) => void;
}

export function FlowControlForm(props: FlowControlFormProps) {
    return <Box width='800px'>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel shrink={true} id="flow-control-name">Name</InputLabel>
                    <TextField
                        variant="outlined"
                        value={props.value.name || ''}
                        InputLabelProps={{shrink: true}}
                        onChange={e => {
                            props.onChange({
                                ...props.value,
                                name: e.target.value
                            })
                        }}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={5}>
                <FormControl fullWidth>
                    <InputLabel shrink={true} id="flow-control-name">Kind</InputLabel>
                    <Select
                        variant="outlined"
                        value={props.value.kind || ''}
                        onChange={e => {
                            props.onChange({
                                ...props.value,
                                kind: e.target.value as Kind
                            })
                        }}
                    >
                        <MenuItem value="STATEMENT">Statement</MenuItem>
                        <MenuItem value="EXPRESSION">Expression</MenuItem>
                        <MenuItem value="ENTRY_POINT">Entry Point</MenuItem>
                        <MenuItem value="EXIT_POINT">Exit Point</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={1}>
                Result: <Checkbox
                checked={props.value.hasReturn || false}
                onChange={e => {
                    props.onChange({
                        ...props.value,
                        hasReturn: e.target.checked
                    })
                }}
            />
            </Grid>
            <Grid item xs={12}>
                <b>Parameters:</b>
                <br/>
                <IconButton onClick={() => {
                    props.onChange({
                        ...props.value,
                        parameters: [...props.value.parameters, {
                            name: 'newParam-' + props.value.parameters.length,
                            paramKind: ParamKind.INPUT,
                            description: '',
                            enumValues: [],
                            required: false,
                        }]
                    })
                }}>
                    <Add/>
                </IconButton>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Kind</TableCell>
                            <TableCell>Options</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.value.parameters.map(param => <TableRow key={param.name}>
                            <ParameterComponent
                                value={param}
                                onChange={updated => {
                                    props.onChange({
                                        ...props.value,
                                        parameters: props.value.parameters.map(p => p.name === param.name ? updated : p)
                                    })
                                }}/>
                            <TableCell>
                                <IconButton onClick={() => {
                                    props.onChange({
                                        ...props.value,
                                        parameters: props.value.parameters.filter(p => p.name !== param.name)
                                    })
                                }}>
                                    <Delete/>
                                </IconButton>
                            </TableCell>
                        </TableRow>)}
                    </TableBody>
                </Table>
            </Grid>
            <Grid item xs={12}>
                <Editor
                    height="300px"
                    language='javascript'
                    theme='vs-dark'
                    options={{
                        fontSize: 12,
                        tabSize: 4,
                    }}

                    value={props.value.code || ''}
                    onChange={(evn) => props.onChange({
                        ...props.value,
                        code: evn!
                    })}
                />
            </Grid>
        </Grid>
    </Box>
}

interface ParameterProps {
    value: Parameter;
    onChange: (value: Parameter) => void;
}

function ParameterComponent(props: ParameterProps) {
    const [value, setValue] = React.useState(props.value)

    const blur = () => {
        props.onChange(value)
    }

    return <>
        <TableCell>
            <TextField
                size='small'
                variant="outlined"
                value={value.name}
                onChange={e => {
                    setValue({
                        ...value,
                        name: e.target.value
                    })
                }}
                onBlur={blur}
            />
        </TableCell>

        <TableCell>
            <Select
                size='small'
                sx={{
                    width: '150px'
                }}
                variant="outlined"
                value={value.paramKind}
                onBlur={blur}
                onChange={e => {
                    setValue({
                        ...value,
                        paramKind: e.target.value as ParamKind
                    })
                }}>
                <MenuItem value="INPUT">Input</MenuItem>
                <MenuItem value="BLOCK">Block</MenuItem>
                <MenuItem value="RESOURCE">Resource</MenuItem>
                <MenuItem value="PROPERTY">Property</MenuItem>
                <MenuItem value="ENUM">Enum</MenuItem>
                <MenuItem value="BOOLEAN">Boolean</MenuItem>
            </Select>
        </TableCell>

        <TableCell>
            <Tooltip title="Required">
                <Checkbox
                    checked={value.required}
                    onChange={e => {
                        setValue({
                            ...value,
                            required: e.target.checked
                        })
                    }}
                    onBlur={blur}
                />
            </Tooltip>
            {value.paramKind === ParamKind.ENUM && <TagInput
                value={value.enumValues || []}
                onChange={updated => {
                    props.onChange({
                        ...value,
                        enumValues: updated as string[]
                    })
                }}
                inputPros={{}}/>}
        </TableCell>
    </>;
}
