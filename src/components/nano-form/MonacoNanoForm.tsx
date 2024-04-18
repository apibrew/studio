import {Box, FormLabel, Grid, MenuItem, Select, TextField} from "@mui/material";
import {Code} from "@apibrew/client/nano/model/code";
import React, {useMemo, useRef, useState} from "react";
import Button from "@mui/material/Button";
import {Resource} from "@apibrew/react";
import {generate, GENERATOR} from "astring";
import {useAnalytics} from "../../hooks/use-analytics";
import {NanoAstModifier} from "../../logic/nano-ast/NanoAstModifier";
import {NanoCodeTemplate, nanoTemplates} from "../../nano-templates/abs";
import {parseNanoCode} from "../../logic/nano-ast/abs";
import Editor from '@monaco-editor/react';

export interface NanoFormProps {
    resource?: Resource
    code: Code
    onChange: (code: Code) => void
    inline?: boolean
}

export function MonacoNanoForm(props: NanoFormProps) {
    const templates = useMemo<NanoCodeTemplate[]>(() => {
        return nanoTemplates.map(nanoTemplate => new nanoTemplate(props.resource))
    }, [props.resource])
    const analytics = useAnalytics()

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

    function handleApplyTemplate() {
        if (!template) {
            return
        }

        const ast = parseNanoCode(props.code.content)

        const nanoAstModifier = new NanoAstModifier(ast)

        if (!template.apply(nanoAstModifier)) {
            return
        }

        const generated = generate(ast, {
            comments: true,
            generator: {
                ...GENERATOR,
                EmptyStatement(node, state) {
                    console.log('EmptyStatement', node)
                }
            }
        })

        console.log('generated', generated, ast)

        props.onChange({
            ...props.code,
            content: generated
        })

        // setSelectedTemplate(undefined)
    }

    const editorRef = useRef<any>(null);

    function handleEditorDidMount(editor: any, monaco: any) {
        editorRef.current = editor;
    }

    function showValue() {
        alert(editorRef.current!.getValue());
    }

    return <>
        <Grid container>
            <Grid item xs={12} md={8}>
                <Box display='flex' flexDirection='row' sx={{
                    maxHeight: '600px',
                    overflow: 'auto'
                }}>
                    <Box flexGrow={1}>
                        <Editor
                            height="90vh"
                            language="javascript"
                            onMount={handleEditorDidMount}
                            value={props.code.content}
                            onChange={(evn) => props.onChange({
                                ...props.code,
                                content: evn!
                            })}
                        />
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} md={4}>
                <Box marginLeft={2}>
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
                        <FormLabel>Templates:</FormLabel>
                        <Select
                            size='small'
                            fullWidth
                            value={selectedTemplate ?? ''}
                            onChange={e => {
                                setSelectedTemplate(e.target.value as string)
                                analytics.click('choose-template', e.target.value as string)
                            }}>
                            <MenuItem>---</MenuItem>
                            {templates.map(t => <MenuItem key={t.label} value={t.label}>{t.label}</MenuItem>)}
                        </Select>
                    </Box>
                    {template && <Box m={1} marginTop={3}>
                        <Box>
                            {template.renderParams()}
                        </Box>
                        <Box marginTop='20px'>
                            <Button onClick={() => {
                                analytics.click('apply-template', selectedTemplate)
                                handleApplyTemplate()
                            }}>Apply Template</Button>
                        </Box>
                    </Box>}
                </Box>
            </Grid>
        </Grid>
    </>
}
