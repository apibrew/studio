import {Property, Resource} from "@apibrew/client/model"

import {Box, Card, CardActions, CardContent, CardHeader, MenuItem, Select, TextField} from "@mui/material";
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
import Checkbox from "@mui/material/Checkbox";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import JsonEditor from "./json-editor/JsonEditor.tsx";

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

const EnumEditor = (props: PropertyFormProps<string>) => <Select
    fullWidth
    value={props.value || ''}
    onChange={e => props.onChange(e.target.value, true)}>
    {props.property.enumValues?.map(item => <MenuItem value={item}>{item}</MenuItem>)}
</Select>

const IntegerEditor = (props: PropertyFormProps<number>) => <TextField
    type='number'
    value={props.value || ''}
    onChange={e => props.onChange(parseInt(e.target.value), true)}/>

const FloatEditor = (props: PropertyFormProps<number>) => <TextField
    type='number'
    value={props.value || ''}
    onChange={e => props.onChange(parseFloat(e.target.value), true)}/>


const BooleanEditor = (props: PropertyFormProps<boolean>) => <Checkbox checked={Boolean(props.value)}
                                                                       onChange={e => props.onChange(e.target.checked, true)}/>
const DateEditor = (props: PropertyFormProps<string>) => <DatePicker
    value={props.value ? dayjs(props.value) : undefined}
    onChange={(e: any) => {
        console.log(e)
        props.onChange(e.format('YYYY-MM-DD'), true)
    }}/>
//default types
registerDefaultPropertyForm<boolean>("Bool", Type.BOOL, BooleanEditor)
registerDefaultPropertyForm<string>("Bytes", Type.BYTES, TextEditor)
registerDefaultPropertyForm<string>("Date", Type.DATE, DateEditor)
registerDefaultPropertyForm<string>("Enum", Type.ENUM, EnumEditor)

registerDefaultPropertyForm<string>("String", Type.STRING, TextEditor)
registerDefaultPropertyForm<number>("Int32", Type.INT32, IntegerEditor)
registerDefaultPropertyForm<number>("Int64", Type.INT64, IntegerEditor)
registerDefaultPropertyForm<number>("Float32", Type.FLOAT32, FloatEditor)
registerDefaultPropertyForm<number>("Float64", Type.FLOAT64, FloatEditor)
registerDefaultPropertyForm<object>("Object", Type.OBJECT, JsonEditor)

// custom types
registerCustomPropertyForm<string>("Nano Code", Type.STRING, MonacoNanoEditor)
registerCustomPropertyForm<object>("Json Editor", Type.OBJECT, JsonEditor)


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
                    <Form
                        property={props.property}
                        value={value}
                        onChange={(updated, isValid) => {
                            setValue(updated)
                            setValid(Boolean(isValid))
                        }}/>
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

