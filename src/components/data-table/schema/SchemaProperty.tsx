import {Checkbox, TableCell, TableRow, TextField} from "@mui/material";
import {isSpecialProperty} from "../../../util/property";
import {Property} from "@apibrew/client/model";
import {PropertyTypeDropdown} from "../../PropertyTypeDropdown";
import {Type} from "@apibrew/client/model/resource";
import {PropertyExtras} from "../../property-form/PropertyExtras";
import {Resource} from "@apibrew/react";

export interface SchemaPropertyProps {
    index: number
    resource: Resource
    propertyName: string
    setPropertyName: (propertyName: string) => void
    property: Property
    onChange: (property: Property) => void
}

export function SchemaProperty(props: SchemaPropertyProps) {
    const propertySx = {
        width: '100%',
        padding: 0,
        margin: 0,
        '& .MuiInputBase-input': {
            padding: '3px',
            margin: 0,
        },
        '& .MuiSelect-select': {
            padding: '3px',
            margin: 0,
        }
    }

    return (
        <TableRow>
            <TableCell>{props.index + 1}</TableCell>
            <TableCell>
                <TextField
                    size='small'
                    sx={propertySx}
                    value={props.propertyName}
                    disabled={isSpecialProperty(props.property)}
                    onChange={(event) => {
                        props.setPropertyName(event.target.value)
                    }}
                />
            </TableCell>
            <TableCell>
                <PropertyTypeDropdown
                    sx={{
                        ...propertySx,
                        width: '130px'
                    }}
                    value={props.property.type}
                    disabled={isSpecialProperty(props.property)}
                    onChange={(event) => {
                        props.onChange({
                            ...props.property,
                            type: event.target.value as Type
                        })
                    }}
                />
            </TableCell>
            <TableCell>
                <PropertyExtras resource={props.resource}
                                property={props.property}
                                disableHelperText={true}
                                onChange={props.onChange}/>
            </TableCell>
            <TableCell>
                <Checkbox
                    sx={propertySx}
                    size='small'
                    checked={props.property.required}
                    disabled={isSpecialProperty(props.property)}
                    onClick={() => {
                        // props.property.required = !props.property.required
                        // props.setResource(props.resource)
                        // props.onTriggerUpdate()
                    }}/>
            </TableCell>
            <TableCell>
                <Checkbox
                    sx={propertySx}
                    size='small'
                    checked={props.property.immutable}
                    disabled={isSpecialProperty(props.property)}
                    onClick={() => {
                        // property.immutable = !property.immutable
                        // props.setResource(props.resource)
                        // props.onTriggerUpdate()
                    }}/>
            </TableCell>
            <TableCell>
                <Checkbox
                    sx={propertySx}
                    size='small'
                    checked={props.property.unique}
                    disabled={isSpecialProperty(props.property)}
                    onClick={() => {
                        // property.unique = !property.unique
                        // props.setResource(props.resource)
                        // props.onTriggerUpdate()
                    }}/>
            </TableCell>
            <TableCell></TableCell>
        </TableRow>
    )
}
