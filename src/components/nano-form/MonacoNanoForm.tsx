import {Box, Grid} from "@mui/material";
import React, {useEffect, useRef} from "react";
import Editor, {Monaco} from '@monaco-editor/react';
import {Resource, useClient, useRecords} from "@apibrew/react";
import {LoadingOverlay} from "../LoadingOverlay";
import {ResourceEntityInfo} from "@apibrew/client/model/resource";

export interface NanoFormProps {
    code: string
    language: 'JAVASCRIPT' | 'TYPESCRIPT'
    onChange: (code: string) => void
}

export function MonacoNanoForm(props: NanoFormProps) {
    const client = useClient();
    const [types, setTypes] = React.useState<string>('');
    const [apibrewTypes, setApibrewTypes] = React.useState<string>('');
    const [nanoDefinitions, setNanoDefinitions] = React.useState<string>('')

    const typesUrl = client.getUrl() + '/docs/typescript-types.d.ts';
    const resources = useRecords<Resource>(ResourceEntityInfo)

    useEffect(() => {
        fetch(typesUrl)
            .then((response) => response.text())
            .then((text) => {
                setTypes(text);
            });

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
        let adjustedTypes = types;
        for (const resource of resources!) {
            adjustedTypes = adjustedTypes.replaceAll(resource.name, resource.name + 'Resource')
        }

        monaco.languages.typescript.javascriptDefaults.addExtraLib(apibrewTypes, 'local-types.d.ts');
        monaco.languages.typescript.javascriptDefaults.addExtraLib(nanoDefinitions, 'nano.d.ts');

        monaco.languages.typescript.typescriptDefaults.addExtraLib(adjustedTypes, 'types.d.ts');
        monaco.languages.typescript.typescriptDefaults.addExtraLib(apibrewTypes, 'local-types.d.ts');
        monaco.languages.typescript.typescriptDefaults.addExtraLib(nanoDefinitions, 'nano.d.ts');
    }

    if (!types || !nanoDefinitions || !resources) {
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
                            language={props.language === 'JAVASCRIPT' ? 'javascript' : 'typescript'}
                            theme='vs-dark'
                            options={{
                                fontSize: 12,
                                tabSize: 4,
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
