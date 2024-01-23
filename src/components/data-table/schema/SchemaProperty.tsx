import {Box, Checkbox, Stack, TableCell, TableRow, TextField} from "@mui/material";
import {isSpecialProperty} from "../../../util/property";
import {Property} from "@apibrew/client/model";
import {PropertyTypeDropdown} from "../../PropertyTypeDropdown";
import {Type} from "@apibrew/client/model/resource";
import {PropertyExtras} from "../../property-form/PropertyExtras";
import {Resource} from "@apibrew/react";
import {ReactNode} from "react";
import {PropertyCell} from "../table/PropertyCell";

export interface SchemaPropertyProps {
    index: number
    resource: Resource
    propertyName: string
    setPropertyName: (propertyName: string) => void
    property: Property
    onChange: (property: Property) => void
    actions: ReactNode
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
        <TableRow style={{
            backgroundColor: props.index % 2 === 0 ? '#f5f5f5' : '#EEE'
        }}>
            <TableCell>{props.index + 1}</TableCell>
            <TableCell>
                <Stack spacing={1}>
                    <Box>
                        <TextField
                            size='small'
                            label='Property Name'
                            variant='outlined'
                            fullWidth
                            value={props.propertyName}
                            disabled={isSpecialProperty(props.property)}
                            onChange={(event) => {
                                props.setPropertyName(event.target.value)
                            }}
                        />
                    </Box>
                    <Box>
                        <TextField
                            size='small'
                            label='Property Title'
                            variant='outlined'
                            fullWidth
                            value={props.property.title || ''}
                            disabled={isSpecialProperty(props.property)}
                            onChange={(event) => {
                                props.onChange({
                                    ...props.property,
                                    title: event.target.value
                                })
                            }}
                        />
                    </Box>
                </Stack>
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
                <PropertyExtras resource={props.resource}
                                property={props.property}
                                disableHelperText={true}
                                onChange={props.onChange}/>
            </TableCell>
            <TableCell>
                <Box display='flex'>
                     <span style={{
                         width: '100px',
                         fontWeight: 'bold',
                         display: 'inline-block'
                     }}>Required:</span>
                    <Checkbox
                        sx={propertySx}
                        size='small'
                        checked={props.property.required}
                        disabled={isSpecialProperty(props.property)}
                        onClick={() => {
                            props.onChange({
                                ...props.property,
                                required: !props.property.required
                            })
                        }}/>
                </Box>
                <Box display='flex'>
                    <span style={{
                        width: '100px',
                        fontWeight: 'bold',
                        display: 'inline-block'
                    }}>Immutable:</span>
                    <Checkbox
                        sx={propertySx}
                        size='small'
                        checked={props.property.immutable}
                        disabled={isSpecialProperty(props.property)}
                        onClick={() => {
                            props.onChange({
                                ...props.property,
                                immutable: !props.property.immutable
                            })
                        }}/>
                </Box>
                <Box display='flex'>
                     <span style={{
                         width: '100px',
                         fontWeight: 'bold',
                         display: 'inline-block'
                     }}>Unique:</span>
                    <Checkbox
                        sx={propertySx}
                        size='small'
                        checked={props.property.unique}
                        disabled={isSpecialProperty(props.property)}
                        onClick={() => {
                            props.onChange({
                                ...props.property,
                                unique: !props.property.unique
                            })
                        }}/>
                </Box>
            </TableCell>
            <TableCell>
                <Stack spacing={1}>
                    <Box display='flex'>
                         <span style={{
                             width: '100px',
                             fontWeight: 'bold',
                             display: 'inline-block'
                         }}>Default:</span>

                        <PropertyCell
                            resource={props.resource}
                            propertyName={props.propertyName}
                            property={props.property}
                            value={props.property.defaultValue}
                            updated={props.property.defaultValue}
                            onUpdate={updated => {
                                props.onChange({
                                    ...props.property,
                                    defaultValue: updated
                                })
                            }}
                            width={200}
                            new={true}/>
                    </Box>
                    <Box display='flex'>
                        <span style={{
                            width: '100px',
                            fontWeight: 'bold',
                            display: 'inline-block'
                        }}>Example:</span>
                        <PropertyCell
                            resource={props.resource}
                            propertyName={props.propertyName}
                            property={props.property}
                            value={props.property.exampleValue}
                            updated={props.property.exampleValue}
                            onUpdate={example => {
                                props.onChange({
                                    ...props.property,
                                    exampleValue: example
                                })
                            }}
                            width={200}
                            new={true}/>
                    </Box>
                </Stack>
            </TableCell>
            <TableCell>
                {props.actions}
            </TableCell>
        </TableRow>
    )
}
