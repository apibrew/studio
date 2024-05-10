import {Property, Resource} from "@apibrew/client/model"

import {Box, Card, CardActions, CardContent, CardHeader} from "@mui/material";
import Button from "@mui/material/Button";
import {getAnnotation} from "../../util/annotation";
import {PropertyEditorAnnotation} from "../../util/base-annotations";
import Editor from "./block-editor/Editor";
import {MonacoNanoForm} from "../nano-form/MonacoNanoForm";
import TextEditor from "./text-editor/TextEditor";
import JsonEditor from "./json-editor/JsonEditor";
import {useState} from "react";

const NanoCodeName = 'Nano Code'
const TextEditorName = 'Text Editor'
const BlockEditorName = 'Block Editor'
const JsonEditorName = 'Json Editor'

export interface PropertyEditorProps {
    resource: Resource
    property: Property
    title: string
    value: any
    onApply: (value: any) => void
    onClose: () => void
}

export function getPropertyEditorList(property: Property): string[] {
    switch (property.type) {
        case 'STRING':
            return [
                NanoCodeName,
                TextEditorName,
            ]
        case 'OBJECT':
            return [
                BlockEditorName,
                JsonEditorName,
            ]
        default:
            return []

    }
}

export function PropertyEditor(props: PropertyEditorProps) {
    const [valid, setValid] = useState(true)
    const [value, setValue] = useState(props.value)
    let propertyEditorAnnotation = getAnnotation(props.property.annotations, PropertyEditorAnnotation)

    if (getPropertyEditorList(props.property).indexOf(propertyEditorAnnotation) === -1) {
        propertyEditorAnnotation = ''
    }

    return <Box display='flex'>
        <Card style={{
            minWidth: '700px',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
        }}>
            <CardHeader title={props.title}/>
            <CardContent style={{
                flexGrow: 1,
            }}>
                <Box p={3}>
                    {propertyEditorAnnotation === BlockEditorName && <Editor value={value || {}} onChange={setValue}/>}
                    {propertyEditorAnnotation === JsonEditorName &&
                        <JsonEditor setIsValid={setValid} value={value || {}} onChange={setValue}/>}
                    {propertyEditorAnnotation === TextEditorName &&
                        <TextEditor value={value || ''} onChange={setValue}/>}
                    {propertyEditorAnnotation === NanoCodeName && <MonacoNanoForm code={value || ''}
                                                                                  language='JAVASCRIPT'
                                                                                  onChange={setValue}/>}
                </Box>
            </CardContent>
            <CardActions>
                <Button disabled={!valid}
                        onClick={() => {
                            props.onApply(value);
                            props.onClose();
                        }}>Apply</Button>
                <Button onClick={() => props.onClose()}>Cancel</Button>
                <Button onClick={() => setValue(props.value)}>Reset</Button>
            </CardActions>
        </Card>
    </Box>
}

