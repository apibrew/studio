//default types
import {getPropertyFormByProperty, PropertyFormProps, registerDefaultPropertyForm} from "core";
import {Box, IconButton, MenuItem, Select, TextField} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import {DatePicker, DateTimePicker, TimePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {ReferenceValueSelector} from "../../components/ReferenceValueSelector.tsx";
import {Add, Delete} from "@mui/icons-material";
import {Type} from "@apibrew/client/model/resource";
import JsonEditor from "../../components/property-editor/json-editor/JsonEditor.tsx";

const TextEditor = (props: PropertyFormProps<string>) => <TextField
    fullWidth
    disabled={props.disabled}
    value={props.value || ''}
    onChange={e => props.onChange(e.target.value, true)}/>

const EnumEditor = (props: PropertyFormProps<string>) => <Select
    fullWidth
    disabled={props.disabled}
    value={props.value || ''}
    onChange={e => props.onChange(e.target.value, true)}>
    {props.property.enumValues?.map(item => <MenuItem value={item}>{item}</MenuItem>)}
</Select>

const IntegerEditor = (props: PropertyFormProps<number>) => <TextField
    fullWidth
    disabled={props.disabled}
    type='number'
    value={props.value || ''}
    onChange={e => props.onChange(parseInt(e.target.value), true)}/>

const FloatEditor = (props: PropertyFormProps<number>) => <TextField
    fullWidth
    disabled={props.disabled}
    type='number'
    value={props.value || ''}
    onChange={e => props.onChange(parseFloat(e.target.value), true)}/>


const BooleanEditor = (props: PropertyFormProps<boolean>) => <Checkbox
    sx={{width: '100%'}}
    disabled={props.disabled}
    checked={Boolean(props.value)}
    onChange={e => props.onChange(e.target.checked, true)}/>

const DateEditor = (props: PropertyFormProps<string>) => <DatePicker
    sx={{width: '100%'}}
    disabled={props.disabled}
    value={props.value ? dayjs(props.value) : undefined}
    onChange={(e: any) => {
        console.log(e)
        props.onChange(e.format('YYYY-MM-DD'), true)
    }}/>

const TimeEditor = (props: PropertyFormProps<string>) => <TimePicker
    sx={{width: '100%'}}
    disabled={props.disabled}
    value={props.value ? dayjs(props.value) : undefined}
    onChange={(e: any) => {
        console.log(e)
        props.onChange(e.format('HH:mm:ss'), true)
    }}/>

const TimestampEditor = (props: PropertyFormProps<string>) => <DateTimePicker
    sx={{width: '100%'}}
    disabled={props.disabled}
    value={props.value ? dayjs(props.value) : undefined}
    onChange={(e: any) => {
        console.log(e)
        props.onChange(e.format('YYYY-MM-DDTHH:mm:ssZ'), true)
    }}/>

const ReferenceEditor = (props: PropertyFormProps<object>) => <ReferenceValueSelector
    sx={{width: '100%'}}
    disabled={props.disabled}
    required={false}
    reference={props.property.reference!}
    value={props.value}
    onChange={value => props.onChange(value, true)}/>

const ListEditor = (props: PropertyFormProps<any[]>) => {
    const ItemForm = getPropertyFormByProperty<unknown>(props.property.item)

    return <Box>
        <IconButton onClick={() => {
            props.onChange([...(props.value || []), props.property.item.defaultValue], true)
        }}>
            <Add/>
        </IconButton>
        {props.value?.map(item => <Box m={1} style={{
            border: '1px solid #ccc',
        }}>
            <ItemForm
                property={props.property.item}
                value={item}
                onChange={(updated, isValid) => {
                    props.onChange(props.value.map((i, index) => index === props.value.indexOf(item) ? updated : i), isValid)
                }}/>
            <IconButton onClick={() => {
                props.onChange(props.value.filter(i => i !== item), true)
            }}>
                <Delete/>
            </IconButton>
        </Box>)}
    </Box>
}

const MapEditor = (props: PropertyFormProps<{ [key: string]: any }>) => {
    const ItemForm = getPropertyFormByProperty<unknown>(props.property.item)

    const value = props.value || {}

    return <Box>
        <IconButton onClick={() => {
            props.onChange({...value, 'new': props.property.item.defaultValue}, true)
        }}>
            <Add/>
        </IconButton>
        {Object.keys(value).map(key => <Box m={1} style={{
            border: '1px solid #ccc',
        }}>
            <TextField value={key}
                       onChange={e => {
                           const updated = {...value}
                           delete updated[key]
                           updated[e.target.value] = value[key]
                           props.onChange(updated, true)
                       }}/>
            <ItemForm
                property={props.property.item}
                value={value[key]}
                onChange={(updated, isValid) => {
                    props.onChange({...value, [key]: updated}, isValid)
                }}/>
            <IconButton onClick={() => {
                const updated = {...value}
                delete updated[key]
                props.onChange(updated, true)
            }}>
                <Delete/>
            </IconButton>
        </Box>)}
    </Box>
}

registerDefaultPropertyForm<boolean>("Bool", Type.BOOL, BooleanEditor)
registerDefaultPropertyForm<string>("Bytes", Type.BYTES, TextEditor)
registerDefaultPropertyForm<string>("Date", Type.DATE, DateEditor)
registerDefaultPropertyForm<string>("Time", Type.TIME, TimeEditor)
registerDefaultPropertyForm<string>("Timestamp", Type.TIMESTAMP, TimestampEditor)
registerDefaultPropertyForm<string>("Enum", Type.ENUM, EnumEditor)
registerDefaultPropertyForm<string>("UUID", Type.UUID, TextEditor)
registerDefaultPropertyForm<any[]>("List", Type.LIST, ListEditor)
registerDefaultPropertyForm<{ [key: string]: any }>("Map", Type.MAP, MapEditor)

registerDefaultPropertyForm<string>("String", Type.STRING, TextEditor)
registerDefaultPropertyForm<number>("Int32", Type.INT32, IntegerEditor)
registerDefaultPropertyForm<number>("Int64", Type.INT64, IntegerEditor)
registerDefaultPropertyForm<number>("Float32", Type.FLOAT32, FloatEditor)
registerDefaultPropertyForm<number>("Float64", Type.FLOAT64, FloatEditor)
registerDefaultPropertyForm<object>("Object", Type.OBJECT, JsonEditor)
registerDefaultPropertyForm<object>("STRUCT", Type.STRUCT, JsonEditor) //fixme
registerDefaultPropertyForm<object>("ReferenceEditor", Type.REFERENCE, ReferenceEditor)
