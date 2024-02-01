import {Property, Resource} from "@apibrew/client/model";
import {Type} from "@apibrew/client/model/resource";
import TextField from "@mui/material/TextField";
import React, {useState} from "react";
import Checkbox from "@mui/material/Checkbox";

import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker, DateTimePicker, TimePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {Entity} from "@apibrew/client";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {SxProps} from "@mui/system/styleFunctionSx";
import {FormInputGroup} from "./FormInputGroup";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import {Add, Remove} from "@mui/icons-material";
import {ReferenceValueSelector} from "../ReferenceValueSelector";

export interface FormInputProps<T> {
    resource: Resource
    property: Property
    readOnly: boolean
    required: boolean
    depth: number
    sx?: SxProps

    value?: T | null
    onChange: (value?: T | null) => void
}

type FormInputType<T> = (props: FormInputProps<T>) => JSX.Element

export function FormInput(props: FormInputProps<unknown>) {
    let FormInputElement: FormInputType<any>

    switch (props.property.type) {
        case Type.STRING:
            FormInputElement = StringInput
            break;
        case Type.BOOL:
            FormInputElement = BooleanInput
            break;
        case Type.DATE:
        case Type.TIME:
        case Type.TIMESTAMP:
            FormInputElement = DateTimeInput
            break;
        case Type.INT32:
        case Type.INT64:
            FormInputElement = IntInput
            break;
        case Type.FLOAT32:
        case Type.FLOAT64:
            FormInputElement = FloatInput
            break;
        case Type.BYTES:
            FormInputElement = BytesInput
            break;
        case Type.OBJECT:
            FormInputElement = ObjectInput
            break;
        case Type.REFERENCE:
            FormInputElement = ReferenceInput
            break;
        case Type.UUID:
            FormInputElement = UuidInput
            break;
        case Type.STRUCT:
            FormInputElement = StructInput
            break;
        case Type.ENUM:
            FormInputElement = EnumInput
            break;
        case Type.MAP:
            FormInputElement = MapInput
            break;
        case Type.LIST:
            FormInputElement = ListInput
            break;
    }

    if (props.depth > 5) {
        return <>Too deep (infinity loop detected)</>
    }

    return <FormInputElement {...props}/>
}

const StringInput: FormInputType<string> = props => {
    return <TextField value={props.value ?? ''}
                      sx={props.sx}
                      required={props.required}
                      disabled={props.readOnly}
                      onChange={e => props.onChange(e.target.value)}
    />
}

const UuidInput: FormInputType<string> = props => {
    const [valid, setValid] = useState(true);

    return <TextField value={props.value}
                      sx={props.sx}
                      error={!valid}
                      required={props.required}
                      disabled={props.readOnly}
                      onChange={e => props.onChange(e.target.value)}
    />
}

const BooleanInput: FormInputType<boolean> = props => {
    return <>
        <Checkbox checked={Boolean(props.value)}
                  sx={props.sx}
                  required={props.required}
                  disabled={props.readOnly}
                  onChange={e => props.onChange(e.target.checked)}
        />
    </>
}

const DateTimeInput: FormInputType<string> = props => {
    if (props.property.type === 'TIME') {
        return <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker value={props.value ? dayjs(props.value, 'HH:mm:ss') : null}
                        sx={props.sx}
                        disabled={props.readOnly}
                        onChange={e => {
                            props.onChange(e?.format('HH:mm:00'))
                        }}/>
        </LocalizationProvider>
    } else if (props.property.type === 'DATE') {
        return <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker value={props.value ? dayjs(props.value) : null}
                        sx={props.sx}
                        disabled={props.readOnly}
                        onChange={e => {
                            props.onChange(e?.format('YYYY-MM-DD'))
                        }}/>
        </LocalizationProvider>
    } else if (props.property.type === 'TIMESTAMP') {
        return <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker value={props.value ? dayjs(props.value) : null}
                            sx={props.sx}
                            disabled={props.readOnly}
                            onChange={e => {
                                props.onChange(e?.toISOString())
                            }}/>
        </LocalizationProvider>
    } else {
        return <>Unknown type: {props.property.type}</>
    }
}

const FloatInput: FormInputType<number> = props => {
    const handleInputChange = (event: any) => {
        const input = event.target.value;

        // Validate the input to allow only valid float values
        // You might want to adjust this regex based on your specific needs
        if (input === '') {
            props.onChange(null)
        } else if (/^-?\d*\.?\d*$/.test(input)) {
            props.onChange(parseFloat(input));
        } else {
            props.onChange(input)
        }
    };

    return (
        <TextField
            value={props.value}
            sx={props.sx}
            required={props.required}
            disabled={props.readOnly}
            onChange={handleInputChange}
            type="text"
            inputProps={{pattern: '^[-+]?[0-9]*[.,]?[0-9]+$'}}
        />
    );
};

const IntInput: FormInputType<number> = props => {
    return <TextField value={props.value}
                      sx={props.sx}
                      required={props.required}
                      disabled={props.readOnly}
                      type={props.property.type === Type.INT32 || props.property.type === Type.INT64 ? 'number' : 'text'}
                      onChange={e => {
                          props.onChange(parseInt(e.target.value))
                      }}
    />
}

const BytesInput: FormInputType<string> = props => {
    return <TextField value={props.value}
                      sx={props.sx}
                      required={props.required}
                      disabled={props.readOnly}
                      type='text'
                      onChange={e => {
                          props.onChange(e.target.value)
                      }}
    />
}

const ObjectInput: FormInputType<string> = props => {
    return <TextField value={props.value}
                      sx={props.sx}
                      rows={5}
                      required={props.required}
                      disabled={props.readOnly}
                      onChange={e => props.onChange(e.target.value)}
    />
}

const ReferenceInput: FormInputType<Entity> = props => {
    return <>
        {props.property.reference && <ReferenceValueSelector
            reference={props.property.reference}
            sx={props.sx}
            required={props.required}
            readOnly={props.readOnly}
            value={props.value}
            onChange={props.onChange}
        />}
    </>
}

const EnumInput: FormInputType<string> = props => {

    return <Select value={props.value}
                   sx={props.sx}
                   disabled={props.readOnly}
                   onChange={e => props.onChange(e.target.value)}>
        {!props.required && <MenuItem value={undefined}>None</MenuItem>}
        {props.property.enumValues.map(item => <MenuItem key={item}
                                                         value={item}>{item}</MenuItem>)}
    </Select>
}

const StructInput: FormInputType<{ [key: string]: any }> = props => {
    const type = props.resource.types?.find(item => item.name === props.property.typeRef);

    if (!type) {
        throw new Error(`Type not found: ${props.property.typeRef}`)
    }

    return <Box ml={3}>
        <FormInputGroup resource={props.resource}
                        properties={type.properties}
                        errors={{}}
                        depth={props.depth}
                        readOnly={props.readOnly}
                        value={props.value ?? {}}
                        onChange={e => {
                            props.onChange(e)
                        }}
        />
    </Box>
}

const MapInput: FormInputType<{ [key: string]: any }> = props => {
    const mapObject = props.value ?? {}
    return <>
        <Box>
            <IconButton onClick={() => {
                props.onChange({...mapObject, [Math.random().toString(36).substring(7)]: null})
            }}>
                <Add/>
            </IconButton>
        </Box>
        {Object.entries(mapObject).map((entry, index) => <Box m={1}
                                                              key={entry[0]}>
            <TextField defaultValue={entry[0]}
                       onBlur={e => {
                           const newMap = {...mapObject}
                           delete newMap[entry[0]]
                           newMap[e.target.value] = entry[1]
                           props.onChange(newMap)
                       }}/> =&gt; <FormInput key={index}
                                             resource={props.resource}
                                             property={props.property.item}
                                             readOnly={props.readOnly}
                                             required={props.required}
                                             depth={props.depth + 1}
                                             value={mapObject[entry[0]]}
                                             onChange={value => {
                                                 props.onChange({
                                                     ...mapObject,
                                                     [entry[0]]: value
                                                 })
                                             }}/>
            <IconButton onClick={() => {
                const newMap = {...mapObject}
                delete newMap[entry[0]]
                props.onChange(newMap)
            }}><Remove/></IconButton>
        </Box>)}
    </>
}

const ListInput: FormInputType<any[]> = props => {
    const list = props.value ?? []

    return <Box ml={3}>
        <IconButton onClick={() => {
            props.onChange([...list, null])
        }}>
            <Add/>
        </IconButton>

        {list.map((item, index) => <Box key={index}>
            <FormInput key={index}
                       resource={props.resource}
                       property={props.property.item}
                       readOnly={props.readOnly}
                       required={props.required}
                       depth={props.depth + 1}
                       value={item}
                       onChange={value => {
                           const newList = [...list]
                           newList[index] = value
                           props.onChange(newList)
                       }}/>
            <IconButton onClick={() => {
                const newList = [...list]
                newList.splice(index, 1)
                props.onChange(newList)
            }}><Remove/></IconButton>
        </Box>)}
    </Box>
}
