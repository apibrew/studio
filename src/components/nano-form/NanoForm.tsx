import {Box, FormLabel, Grid, MenuItem, Select, TextField} from "@mui/material";
import {Code} from "@apibrew/client/nano/model/code";
import CodeEditor from "@uiw/react-textarea-code-editor";
import React, {useMemo, useState} from "react";
import {UseResource} from "./templates/use-resource";
import Button from "@mui/material/Button";
import {Resource} from "@apibrew/react";
import {Comment, Parser} from "acorn";
import {generate, GENERATOR} from "astring";
import {ValidateProperty} from "./templates/validate-property";
import {traverse} from "estraverse";

export interface NanoFormProps {
    resource?: Resource
    code: Code
    onChange: (code: Code) => void
    inline?: boolean
}

export function NanoForm(props: NanoFormProps) {
    const templates = useMemo(() => {
        return [
            new UseResource(props.resource),
            new ValidateProperty(props.resource)
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

    function handleApplyTemplate() {
        if (!template) {
            return
        }

        const parser = Parser.extend()

        const comments: Comment[] = []

        const ast = parser.parse(props.code.content, {
            ecmaVersion: 2020,
            locations: true,
            onComment: comments
        })

        if (!template.check(ast)) {
            return
        }

        const astAny = ast as any

        template.apply(ast)

        insertEmptyStatements(ast)

        astAny.comments = comments

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
                        fontFamily: 'monospace',
                    }}>
                        {linesArr.map(ln => <div key={ln}>{ln}</div>)}
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
                                handleApplyTemplate()
                            }}>Apply Template</Button>
                        </Box>
                    </Box>}
                </Box>
            </Grid>
        </Grid>
    </>
}


function insertEmptyStatements(ast: any) {
    let lastLine = 0;
    traverse(ast, {
        enter: function (node, parent) {
            if (node.type !== 'Program' && parent?.type === 'Program') {
                const currentLine = node.loc?.start.line ?? 0;
                if (currentLine - lastLine > 1) {
                    // Insert an empty statement in the parent body
                    const index = parent.body.indexOf(node as any);
                    parent.body.splice(index, 0, {type: "EmptyStatement"});
                }
                lastLine = node.loc?.end.line || 0;
            }
        }
    });
}
