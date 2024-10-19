import {Resource} from "@apibrew/react";
import {useEffect, useState} from "react";
import {Box, Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField} from "@mui/material";
import {Add, DragIndicator, Remove, Search} from "@mui/icons-material";
import {SubType} from "@apibrew/client/model/resource";
import {ResourcePropertiesForm} from "./ResourcePropertiesForm.tsx";

export interface ResourceFormProps {
    value: Resource
    onChange: (Resource: Resource, isValid: boolean) => void
}

const propertyNameRegex = /^[a-z][A-Za-z0-9-]*$/;

export function ResourceTypesFormWrapper(props: ResourceFormProps) {
    function validate(): boolean {
        return true
    }

    useEffect(() => {
        props.onChange(props.value, validate())
    }, [props.value]);

    return (
        <ResourceSchemaForm value={props.value} onChange={props.onChange}/>
    )
}

export function ResourceSchemaForm(props: ResourceFormProps) {
    function validate(): boolean {
        return true
    }

    useEffect(() => {
        props.onChange(props.value, validate())
    }, [props.value]);

    const [selectedType, setSelectedType] = useState<SubType | undefined>(undefined)

    const types = props.value.types || []

    return (
        <Box width='100%'>
            <Box display='flex'
                 flexDirection='row-reverse'>
                <Button size='small'
                        color='primary'
                        onClick={() => {
                            props.onChange({
                                ...props.value,
                                types: [
                                    ...props.value.types || [],
                                    {
                                        name: 'new-type-' + types.length,
                                    } as SubType
                                ],
                            }, validate())
                        }}>
                    <Add/> Add new
                </Button>
            </Box>
            <br/>
            <Table size='small'>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {types.map((type, index) => {
                        return <TableRow key={type.name}>
                            <TableCell padding='none'>
                                <IconButton size='small'
                                            color='secondary'
                                            onClick={() => {

                                            }}>
                                    <DragIndicator/>
                                </IconButton>
                                <IconButton size='small'
                                            color='secondary'
                                            onClick={() => {
                                                setSelectedType(type)
                                            }}>
                                    <Search/>
                                </IconButton>
                                <IconButton size='small'
                                            color='error'
                                            onClick={() => {
                                                props.onChange({
                                                    ...props.value,
                                                    types: types.filter(t => t !== type)
                                                }, validate())
                                            }}>
                                    <Remove/>
                                </IconButton>
                            </TableCell>
                            <TableCell padding='none'>
                                <TextField
                                    size='small'
                                    defaultValue={type.name}
                                    label='Name'
                                    error={!propertyNameRegex.test(type.name)}
                                    variant='outlined'
                                    onBlur={(event) => {
                                        let updatedTypes = [...types]
                                        updatedTypes[index] = {
                                            ...type,
                                            name: event.target.value
                                        }
                                        props.onChange({
                                            ...props.value,
                                            types: updatedTypes
                                        }, validate())
                                    }}/>
                            </TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
            <hr/>
            {selectedType && <Box>
                <ResourcePropertiesForm resource={props.value}
                                        value={selectedType}
                                        onChange={updated => {
                                            let updatedTypes = [...types]
                                            updatedTypes[types.indexOf(selectedType)] = updated
                                            props.onChange({
                                                ...props.value,
                                                types: updatedTypes
                                            }, validate())
                                        }}/>
            </Box>}
        </Box>
    )
}
