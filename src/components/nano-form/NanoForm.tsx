import {Box, Grid, MenuItem, Select, TextField} from "@mui/material";
import {Code} from "@apibrew/client/nano/model/code";
import CodeEditor from "@uiw/react-textarea-code-editor";
import React, {useMemo, useState} from "react";
import {UseResource} from "./templates/use-resource";
import Button from "@mui/material/Button";
import {Resource} from "@apibrew/react";

export interface NanoFormProps {
    resource?: Resource
    code: Code
    onChange: (code: Code) => void
    inline?: boolean
}

export function NanoForm(props: NanoFormProps) {
    const templates = useMemo(() => {
        return [
            new UseResource(props.resource ? (props.resource?.namespace.name + '/' + props.resource?.name) : undefined)
        ]
    }, [props.resource])

    const lineCount = useMemo(() => props.code.content.split("\n").length, [props.code.content]);
    // create array
    const linesArr = useMemo(
        () =>
            Array.from({length: lineCount}, (_, i) => i + 1),
        [lineCount]
    );

    const [selectedTemplate, setSelectedTemplate] = useState<string>()

    const template = useMemo(() => {
        return templates.find(t => t.label === selectedTemplate)
    }, [selectedTemplate, templates])

    return <>
        <Grid container>
            <Grid item xs={12} md={8}>
                <Box display='flex' flexDirection='row' sx={{
                    maxHeight: '600px',
                    overflow: 'auto'
                }}>
                    <Box sx={{
                        paddingTop: '15px',
                        paddingRight: '3px',
                        textAlign: 'right',
                        fontSize: '16px',
                        color: 'rgb(100,100,200)',
                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospac',
                    }}>
                        {linesArr.map(ln => <div>{ln}</div>)}
                    </Box>
                    <Box flexGrow={1}>
                        <CodeEditor
                            value={props.code.content}
                            language="js"
                            placeholder="Please enter JS code."
                            onChange={(evn) => props.onChange({
                                ...props.code,
                                content: evn.target.value
                            })}
                            rows={30}
                            padding={15}
                            style={{
                                minHeight: '600px',
                                // backgroundColor: "#f5f5f5",
                                fontSize: '16px',
                                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                            }}
                        />
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} md={4}>
                <Box m={1}>
                    {!props.inline && <TextField
                        fullWidth
                        value={props.code.name ?? ''}
                        onChange={e => {
                            props.onChange({
                                ...props.code,
                                name: e.target.value
                            })
                        }}
                        label='Name'
                        variant='outlined'
                    />}
                </Box>
                <Box m={1}>
                    Template: <Select
                    size='small'
                    sx={{
                        width: '200px',
                        marginRight: '20px'
                    }}
                    value={selectedTemplate ?? ''}
                    onChange={e => {
                        setSelectedTemplate(e.target.value as string)
                    }}>
                    <MenuItem>---</MenuItem>
                    {templates.map(t => <MenuItem value={t.label}>{t.label}</MenuItem>)}
                </Select>
                </Box>
                {template && <Box m={1}>
                    <Box>
                        {template.renderParams()}
                    </Box>
                    <Box marginTop='20px'>
                        <Button onClick={() => {
                            if (template.apply(props.code, props.onChange)) {
                                setSelectedTemplate(undefined)
                            }
                        }}>Apply Template</Button>
                    </Box>
                </Box>}
            </Grid>
        </Grid>
    </>
}
