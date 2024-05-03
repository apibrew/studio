import {Property, Resource} from "@apibrew/client/model"
import React from "react";
import {Box, Card, CardActions, CardContent, CardHeader} from "@mui/material";
import Button from "@mui/material/Button";
import {getAnnotation} from "../../util/annotation";
import {PropertyEditorAnnotation} from "../../util/base-annotations";
import Editor from "./block-editor/Editor";
import {MonacoNanoForm} from "../nano-form/MonacoNanoForm";

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
                'NanoCode',
            ]
        case 'OBJECT':
            return [
                'BlockEditor',
            ]
        default:
            return []

    }
}

export function PropertyEditor(props: PropertyEditorProps) {
    const [value, setValue] = React.useState(props.value)
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
                    {propertyEditorAnnotation === 'BlockEditor' && <Editor value={value || {}} onChange={setValue}/>}
                    {propertyEditorAnnotation === 'NanoCode' && <MonacoNanoForm code={value || ''}
                                                                                language='JAVASCRIPT'
                                                                                onChange={setValue}/>}
                </Box>
            </CardContent>
            <CardActions>
                <Button onClick={() => {
                    props.onApply(value);
                    props.onClose();
                }}>Apply</Button>
                <Button onClick={() => props.onClose()}>Cancel</Button>
                <Button onClick={() => setValue(props.value)}>Reset</Button>
            </CardActions>
        </Card>
    </Box>
}

// <TagInput
//                     autoOpen={Boolean(props.autoOpen)}
//                     value={updated || []}
//                     onChange={e => {
//                         setUpdated(e)
//                     }}
//                     onClose={() => {
//                         props.onChange(updated)
//                     }}
//                     inputPros={{}}/>
