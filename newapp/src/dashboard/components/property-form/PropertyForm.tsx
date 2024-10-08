import {FormControl, Stack, TextField} from "@mui/material";
import {PropertyTypeDropdown} from "../PropertyTypeDropdown";
import {Type} from "@apibrew/client/model/resource";

import {Property} from "@apibrew/client/model";
import {Resource} from "@apibrew/react";
import {useState} from "react";
import {PropertyExtras} from "./PropertyExtras.tsx";

export interface PropertyFormProps {
    resource: Resource
    propertyName: string
    property: Property;
    onChange: (propertyName: string, property: Property) => void
}

export function PropertyForm(props: PropertyFormProps) {
    const [propertyName, setPropertyName] = useState(props.propertyName)

    return (
        <Stack spacing={2}>
            <FormControl fullWidth>
                <TextField
                    size='small'
                    value={propertyName}
                    label='Name'
                    variant='outlined'
                    onChange={(event) => {
                        setPropertyName(event.target.value)
                        props.onChange(event.target.value, props.property)
                    }}/>
            </FormControl>
            <FormControl fullWidth>
                <PropertyTypeDropdown
                    size='small'
                    value={props.property.type}
                    label='Type'
                    title='Type'
                    variant='outlined'
                    onChange={(event) => {
                        props.onChange(propertyName, {
                            ...props.property,
                            type: event.target.value as Type,
                            defaultValue: undefined as any,
                            exampleValue: undefined as any,
                        })
                    }}/>
            </FormControl>
            <PropertyExtras
                resource={props.resource}
                property={props.property}
                onChange={change => {
                    props.onChange(propertyName, change)
                }}/>
        </Stack>
    )
}
