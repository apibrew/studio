import {Property, Resource} from "@apibrew/client/model"

import {Box, Card, CardActions, CardContent, CardHeader, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";
import {
    getPropertyFormByProperty,
    listCustomPropertyForms,
    PropertyFormProps,
    registerCustomPropertyForm,
    registerDefaultPropertyForm
} from "core";
import {Type} from "@apibrew/client/model/resource";
import {MonacoNanoForm} from "../nano-form/MonacoNanoForm.tsx";

// const TextEditorName = 'Text Editor'
// const BlockEditorName = 'Block Editor'
// const JsonEditorName = 'Json Editor'

export interface PropertyEditorProps {
    resource: Resource
    property: Property
    title: string
    value: any
    onApply: (value: any) => void
    onClose: () => void
}

export function getPropertyEditorList(property: Property): string[] {
    return listCustomPropertyForms(property.type).map(item => item.name!)
}

const MonacoNanoEditor = (props: PropertyFormProps<string>) => <MonacoNanoForm code={props.value as string || ''}
                                                                               language='JAVASCRIPT'
                                                                               onChange={value => props.onChange(value, true)}/>

const TextEditor = (props: PropertyFormProps<string>) => <TextField
    value={props.value || ''}
    onChange={e => props.onChange(e.target.value, true)}/>


registerDefaultPropertyForm<string>("Text editor", Type.STRING, TextEditor)
registerCustomPropertyForm<string>("Nano Code", Type.STRING, MonacoNanoEditor)

export function PropertyEditor(props: PropertyEditorProps) {
    const [valid, setValid] = useState(true)
    const [value, setValue] = useState(props.value)

    const Form = getPropertyFormByProperty<unknown>(props.property, props.resource)

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
                    <Form value={value} onChange={(updated, isValid) => {
                        setValue(updated)
                        setValid(Boolean(isValid))
                    }}/>
                    {/*{propertyEditorAnnotation === BlockEditorName && <Editor value={value || {}} onChange={setValue}/>}*/}
                    {/*{propertyEditorAnnotation === JsonEditorName &&*/}
                    {/*    <JsonEditor setIsValid={setValid} value={value || {}} onChange={setValue}/>}*/}
                    {/*{propertyEditorAnnotation === TextEditorName &&*/}
                    {/*    <TextEditor value={value || ''} onChange={setValue}/>}*/}
                    {/*{propertyEditorAnnotation === NanoCodeName && <MonacoNanoForm code={value || ''}*/}
                    {/*                                                              language='JAVASCRIPT'*/}
                    {/*                                                              onChange={setValue}/>}*/}
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

