import {Box, FormLabel, Grid, MenuItem, Select, TextField} from "@mui/material";
import {Code} from "@apibrew/client/nano/model/code";
import CodeEditor from "@uiw/react-textarea-code-editor";
import {useMemo, useState} from "react";
import Button from "@mui/material/Button";
import {Resource} from "@apibrew/react";
import {generate, GENERATOR} from "astring";
import {useAnalytics} from "../../hooks/use-analytics";
import {NanoAstModifier} from "../../logic/nano-ast/NanoAstModifier";
import {NanoCodeTemplate, nanoTemplates} from "../../nano-templates/abs";
import {parseNanoCode} from "../../logic/nano-ast/abs";

export interface NanoFormProps {
    resource?: Resource
    code: Code
    onChange: (code: Code) => void
    inline?: boolean
}

export function NanoForm(props: NanoFormProps) {
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
                EmptyStatement(node, _) {
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
