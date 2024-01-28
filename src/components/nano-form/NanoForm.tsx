import {Box, Grid, TextField} from "@mui/material";
import {Code} from "@apibrew/client/nano/model/code";
import CodeEditor from "@uiw/react-textarea-code-editor";
import {useMemo} from "react";

export interface NanoFormProps {
    code: Code
    onChange: (code: Code) => void
    inline?: boolean
}

export function NanoForm(props: NanoFormProps) {
    const lineCount = useMemo(() => props.code.content.split("\n").length, [props.code.content]);
    // create array
    const linesArr = useMemo(
        () =>
            Array.from({length: lineCount}, (_, i) => i + 1),
        [lineCount]
    );

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
            </Grid>
        </Grid>
    </>
}
