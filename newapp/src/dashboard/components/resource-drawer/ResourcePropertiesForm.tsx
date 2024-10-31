import {Resource} from "@apibrew/react";
import {Box, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip,} from "@mui/material";
import {useEffect} from "react";
import Button from "@mui/material/Button";
import {Add, DragIndicator, Remove} from "@mui/icons-material";
import {Property} from "@apibrew/client/model";
import TextField from "@mui/material/TextField";
import {PropertyTypeDropdown} from "../PropertyTypeDropdown.tsx";
import {PropertyExtras} from "../property-form/PropertyExtras.tsx";
import {SubType} from "@apibrew/client/model/resource";

export interface ResourceFormProps<T extends Resource | SubType> {
    resource: Resource
    value: T
    onChange: (Resource: T, isValid: boolean) => void
}

const propertyNameRegex = /^[a-z][A-Za-z0-9-]*$/;

export function ResourcePropertiesForm<T extends Resource | SubType>(props: ResourceFormProps<T>) {
    useEffect(() => {
        props.onChange(props.value, validate())
    }, [props.value]);

    const properties = Object.keys(props.value.properties || {})

    function validate(): boolean {
        if (properties.some(propertyName => !propertyNameRegex.test(propertyName))) {
            return false
        }
        return true
    }

    return (
        <Box className="MD-pf-dv1" width='100%'>
            <Box className="MD-pf-dv1-1" display='flex'
                 flexDirection='row-reverse'>
                <Button size='small'
                        color='primary'
                        onClick={() => {
                            props.onChange({
                                ...props.value,
                                properties: {
                                    ...props.value.properties,
                                    ['new-property-' + properties.length]: {
                                        type: 'STRING',
                                        required: false,
                                        immutable: false,
                                        unique: false,
                                    } as Property
                                }
                            }, validate())
                        }}>
                    <Add/> Add new
                </Button>
            </Box>

            <Table className="MD-pf-tbl" size='small'>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Modifiers</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {properties.map(propertyName => {
                        const property = props.value.properties![propertyName]

                        function updateProperty(update: Partial<Property>) {
                            let updatedProperties = {...props.value.properties}

                            updatedProperties[propertyName] = {
                                ...property,
                                ...update,
                            }

                            props.onChange({
                                ...props.value,
                                properties: updatedProperties
                            }, validate())
                        }

                        return <TableRow key={propertyName}>
                            <TableCell padding='none'>
                                <IconButton size='small'
                                            color='secondary'
                                            onClick={() => {

                                            }}>
                                    <DragIndicator/>
                                </IconButton>
                                <IconButton size='small'
                                            color='error'
                                            onClick={() => {
                                                let currentProperties = {...props.value.properties}
                                                delete currentProperties[propertyName]
                                                props.onChange({
                                                    ...props.value,
                                                    properties: currentProperties
                                                }, validate())
                                            }}>
                                    <Remove/>
                                </IconButton>
                            </TableCell>
                            <TableCell padding='none'>
                                <TextField
                                    size='small'
                                    defaultValue={propertyName}
                                    label='Name'
                                    error={!propertyNameRegex.test(propertyName)}
                                    variant='outlined'
                                    onBlur={(event) => {
                                        if (event.target.value !== propertyName) {
                                            let currentProperties = {...props.value.properties}
                                            delete currentProperties[propertyName]
                                            props.onChange({
                                                ...props.value,
                                                properties: {
                                                    ...currentProperties,
                                                    [event.target.value]: property
                                                }
                                            }, validate())
                                        }
                                    }}/>
                            </TableCell>

                            <TableCell padding='none'>
                                <Box display='flex'>
                                    <PropertyTypeDropdown className="MD-pf-tbl-tp1"
                                        variant='outlined'
                                        size='small'
                                        value={property.type}
                                        onChange={e => {
                                            updateProperty({type: e.target.value as Property['type']})
                                        }}/>
                                    <Box className="MD-pf-tbl-tp2" maxWidth='200px'>
                                        <PropertyExtras
                                            sx={{
                                                maxWidth: '150px'
                                            }}
                                            resource={props.resource}
                                            property={property}
                                            onChange={change => {
                                                updateProperty(change)
                                            }}/>
                                    </Box>
                                </Box>
                            </TableCell>


                            <TableCell padding='none'>

                                <div className="MD-pf-tbl-mdfr">

                                    <Tooltip title='Immutable'>
                                        <input type='checkbox'
                                            checked={property.immutable}
                                            onChange={(e) => {
                                                updateProperty({ immutable: e.target.checked })
                                            }} />
                                    </Tooltip>
                                    <Tooltip title='Required'>
                                        <input type='checkbox'
                                            checked={property.required}
                                            onChange={(e) => {
                                                updateProperty({ required: e.target.checked })
                                            }} />
                                    </Tooltip>
                                    <Tooltip title='Unique'>
                                        <input type='checkbox'
                                            checked={property.unique}
                                            onChange={(e) => {
                                                updateProperty({ unique: e.target.checked })
                                            }} />
                                    </Tooltip>

                                </div>

                            </TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </Box>
    )
}
