import {Resource} from "@apibrew/react";
import {Box, Table, TableBody, TableCell, TableHead, TableRow, Tooltip,} from "@mui/material";
import {useEffect} from "react";
import Button from "@mui/material/Button";
import {Add, DragIndicator} from "@mui/icons-material";
import {Property} from "@apibrew/client/model";
import TextField from "@mui/material/TextField";
import {PropertyTypeDropdown} from "../PropertyTypeDropdown.tsx";

export interface ResourceFormProps {
    value: Resource
    onChange: (Resource: Resource, isValid: boolean) => void
}

const propertyNameRegex = /^[a-z][A-Za-z0-9-]*$/;

export function ResourcePropertiesForm(props: ResourceFormProps) {

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
        <Box width='600px'>
            <Box display='flex'
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
            <Table size='small'>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Modifiers</TableCell>
                        <TableCell>Actions</TableCell>
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
                                <DragIndicator/>
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
                                <PropertyTypeDropdown
                                    size='small'
                                    value={property.type}
                                    onChange={e => {
                                        updateProperty({type: e.target.value as Property['type']})
                                    }}/>
                            </TableCell>
                            <TableCell padding='none'>
                                <Tooltip title='Immutable'>
                                    <input type='checkbox'
                                           checked={property.immutable}
                                           onChange={(e) => {
                                               updateProperty({immutable: e.target.checked})
                                           }}/>
                                </Tooltip>
                                <Tooltip title='Required'>
                                    <input type='checkbox'
                                           checked={property.required}
                                           onChange={(e) => {
                                               updateProperty({required: e.target.checked})
                                           }}/>
                                </Tooltip>
                                <Tooltip title='Unique'>
                                    <input type='checkbox'
                                           checked={property.unique}
                                           onChange={(e) => {
                                               updateProperty({unique: e.target.checked})
                                           }}/>
                                </Tooltip>
                            </TableCell>
                            <TableCell padding='none'>
                                <Button size='small'
                                        color='primary'
                                        onClick={() => {

                                        }}>
                                    Edit
                                </Button>
                                <Button size='small'
                                        color='primary'
                                        onClick={() => {
                                            let currentProperties = {...props.value.properties}
                                            delete currentProperties[propertyName]
                                            props.onChange({
                                                ...props.value,
                                                properties: currentProperties
                                            }, validate())
                                        }}>
                                    Remove
                                </Button>
                            </TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </Box>
    )
}
