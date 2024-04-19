import {Box, Grid} from "@mui/material";
import React, {useEffect, useRef} from "react";
import Editor, {Monaco} from '@monaco-editor/react';
import {Resource, useClient, useRecords} from "@apibrew/react";
import {LoadingOverlay} from "../LoadingOverlay";
import {ResourceEntityInfo} from "@apibrew/client/model/resource";

export interface NanoFormProps {
    code: string
    onChange: (code: string) => void
}

export function MonacoNanoForm(props: NanoFormProps) {
    const client = useClient();
    // const [types, setTypes] = React.useState<string>('');
    const [apibrewTypes, setApibrewTypes] = React.useState<string>('');
    const [nanoDefinitions, setNanoDefinitions] = React.useState<string>('')

    // const typesUrl = client.getUrl() + '/docs/typescript-types.d.ts';
    const resources = useRecords<Resource>(ResourceEntityInfo)

    useEffect(() => {
        // fetch(typesUrl)
        //     .then((response) => response.text())
        //     .then((text) => {
        //         setTypes(text);
        //     });

        fetch('/types.d.ts')
            .then((response) => response.text())
            .then((text) => {
                setApibrewTypes(text);
            });

        fetch('/nano.d.ts')
            .then((response) => response.text())
            .then((text) => {
                setNanoDefinitions(text);
            });
    }, [client]);

    const editorRef = useRef<any>(null);

    function handleEditorDidMount(editor: any, monaco: any) {
        editorRef.current = editor;
    }

    function handleEditorWillMount(monaco: Monaco) {
        // prepare resources.d.t
        let resourceDefinitions = ''

        for (const resource of resources!) {
            resourceDefinitions += `declare const ${resource.name}: ResourceOps<${resource.name}>;\n`
        }

        monaco.languages.typescript.javascriptDefaults.addExtraLib(apibrewTypes, 'local-types.d.ts');
        monaco.languages.typescript.javascriptDefaults.addExtraLib(nanoDefinitions, 'nano.d.ts');
        monaco.languages.typescript.javascriptDefaults.addExtraLib(resourceDefinitions, 'resources.d.ts');


    }

    if (!nanoDefinitions || !resources) {
        return <LoadingOverlay/>
    }

    return <>
        <Grid container>
            <Grid item xs={12} md={12}>
                <Box display='flex' flexDirection='row' sx={{
                    maxHeight: '600px',
                    overflow: 'auto'
                }}>
                    <Box flexGrow={1}>
                        <Editor
                            height="90vh"
                            language="javascript"
                            theme='vs-dark'
                            options={{
                                // wordWrap: 'on',
                                // minimap: {enabled: true},
                                fontSize: 12,
                                tabSize: 4,
                                // insertSpaces: true,
                                // automaticLayout: true,
                                // scrollBeyondLastLine: false,
                                // scrollbar: {
                                //     vertical: 'auto',
                                //     horizontal: 'auto',
                                //     useShadows: false,
                                //     verticalHasArrows: false,
                                //     horizontalHasArrows: false,
                                //     verticalScrollbarSize: 17,
                                //     horizontalScrollbarSize: 17,
                                //     arrowSize: 30
                                // },
                            }}

                            beforeMount={handleEditorWillMount}
                            onMount={handleEditorDidMount}
                            value={props.code}
                            onChange={(evn) => props.onChange(evn!)}
                        />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    </>
}
