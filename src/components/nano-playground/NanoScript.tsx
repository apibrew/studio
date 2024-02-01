import CodeEditor from "@uiw/react-textarea-code-editor";
import {Script, ScriptEntityInfo} from "../../model/script";
import {PlayArrow, Remove} from "@mui/icons-material";
import React, {useMemo} from "react";
import {Box, IconButton, Stack} from "@mui/material";
import {useRepository} from "@apibrew/react";
import {useConfirmation} from "../modal/use-confirmation";
import toast from "react-hot-toast";

export interface NanoScriptProps {
    script: Script
    onRemove: () => void
    onOutput: (output: any) => void
    onError: (error: any) => void
}

export function NanoScript(props: NanoScriptProps) {
    const confirmation = useConfirmation()
    const scriptRepository = useRepository<Script>(ScriptEntityInfo)
    const [script, setScript] = React.useState<Script>(props.script)

    const lineCount = useMemo(() => script.content.split("\n").length, [script.content]);
    // create array
    const linesArr = useMemo(
        () =>
            Array.from({length: lineCount}, (_, i) => i + 1),
        [lineCount]
    );

    function handleDelete() {
        confirmation.open({
            kind: 'confirm',
            message: 'Are you sure you want to delete these records?',
            buttonMessage: 'Delete',
            onConfirm: () => {
                toast.promise(
                    scriptRepository.delete(script.id),
                    {
                        loading: 'Deleting line...',
                        success: 'deleted',
                        error: 'Failed to delete records'
                    })
                    .then(() => {
                        props.onRemove()
                    })
            }
        })
    }

    return <>
        {confirmation.render()}
        <Box display='flex' flexGrow={1}>
            <Box
                width='100%'
                marginRight={1}
                display='flex'>
                <Box sx={{
                    paddingTop: '15px',
                    paddingRight: '3px',
                    textAlign: 'right',
                    fontSize: '16px',
                    color: 'rgb(100,100,200)',
                    fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospac',
                }}>
                    {linesArr.map(ln => <div key={ln}>{ln}</div>)}
                </Box>
                <CodeEditor
                    value={script.content}
                    language="js"
                    placeholder="Please enter JS code."
                    onChange={(evn) => {
                        const updated = {
                            ...script,
                            content: evn.target.value
                        } as Script

                        setScript(updated)
                    }}
                    onBlur={() => {
                        scriptRepository.update({
                            ...script,
                            run: false
                        })
                    }}
                    rows={30}
                    padding={15}
                    style={{
                        width: '100%',
                        minHeight: '100px',
                        // backgroundColor: "#f5f5f5",
                        fontSize: '16px',
                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                    }}
                />
            </Box>
            <Stack>
                <IconButton
                    onClick={() => {
                        handleDelete()
                    }}
                    size='small'>
                    <Remove/>
                </IconButton>
                <IconButton
                    onClick={() => {
                        scriptRepository.update({
                            ...script,
                            run: true
                        }).then(script => {
                            props.onOutput(script.output ? JSON.parse(script.output as any): '')
                            props.onError(script.error)
                        }, err => {
                            props.onError(err.message)
                        })
                    }}
                    size='small'>
                    <PlayArrow/>
                </IconButton>
            </Stack>
        </Box>
    </>
}
