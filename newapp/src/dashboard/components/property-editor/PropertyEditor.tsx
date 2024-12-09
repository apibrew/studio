import {Property, Resource} from "@apibrew/client/model"

import {Box} from "@mui/material";
import {useState} from "react";
import {getPropertyFormByProperty, listCustomPropertyForms} from "core";
import toast from "react-hot-toast";
import {StaticDatePicker, StaticDateTimePicker, StaticTimePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";

export interface PropertyEditorProps {
    resource: Resource
    property: Property
    value: any
    onApply: (value: any) => void
}

export function getPropertyEditorList(property: Property): string[] {
    return listCustomPropertyForms(property.type).map(item => item.name!)
}


export function PropertyEditor(props: PropertyEditorProps) {
    const [value, setValue] = useState(props.value)

    if (props.property.type === 'DATE') {
        return <StaticDatePicker
            value={props.value ? dayjs(props.value) : undefined}
            onAccept={(e: any) => {
                props.onApply(e.format('YYYY-MM-DD'))
            }}
        />
    } else if (props.property.type === 'TIME') {
        return <StaticTimePicker
            value={props.value ? dayjs(props.value) : undefined}
            onAccept={(e: any) => {
                props.onApply(e.format('HH:mm:ss'))
            }}
        />
    } else if (props.property.type === 'TIMESTAMP') {
        return <StaticDateTimePicker
            value={props.value ? dayjs(props.value) : undefined}
            onAccept={(e: any) => {
                props.onApply(e.format('YYYY-MM-DDTHH:mm:ssZ'))
            }}
        />
    }

    const Form = getPropertyFormByProperty<unknown>(props.property, props.resource)

    return <Box display='flex' minWidth='400px' minHeight='200px' p={1}>
        <Form
            property={props.property}
            value={value}
            onChange={(updated, isValid) => {
                setValue(updated)
                if (isValid) {
                    props.onApply(updated)
                } else {
                    toast.error('Invalid value')
                }
            }}/>
    </Box>
}

