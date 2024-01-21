import {Resource} from "@apibrew/react";
import {Box, Card, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import {SubType} from "@apibrew/client/model/resource-action";

export interface ResourceFormProps {
    resource: Resource
    onChange: (Resource: Resource) => void
}

export function SubTypesForm(props: ResourceFormProps) {
    const [subTypes, setSubTypes] = React.useState<SubType[]>(props.resource.types ?? [])

    const [selectedSubIdx, setSelectedSubTypeIdx] = React.useState<number>(-1)

    const selectedSubType = subTypes[selectedSubIdx]

    return (
        <Box>
            <Button
                onClick={() => {
                    setSelectedSubTypeIdx(subTypes.length)
                    setSubTypes([
                        ...subTypes,
                        {} as SubType
                    ])
                }}
                size='small'
                color='success'>add new</Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {subTypes.map((type, index) => (
                        <TableRow key={type.name}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{type.name}</TableCell>
                            <TableCell>
                                <Button
                                    sx={{
                                        marginRight: 1
                                    }}
                                    size='small'
                                    color='error'>delete</Button>
                                <Button size='small'
                                        color='warning'>edit</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <br/>
            {selectedSubType && (
                <Card sx={{
                    padding: 2
                }}>
                    <TextField
                        label='Name'
                        variant='filled'
                        value={selectedSubType.name ?? ''}
                        onChange={(event) => {
                            setSubTypes([
                                ...subTypes.slice(0, selectedSubIdx),
                                {
                                    ...selectedSubType,
                                    name: event.target.value
                                },
                                ...subTypes.slice(selectedSubIdx + 1)
                            ])
                        }}/>
                    <br/>
                    <br/>
                    <Typography>Properties</Typography>
                    <Button
                        onClick={() => {

                        }}
                        size='small'
                        color='success'>add new</Button>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.keys(selectedSubType.properties ?? {}).map((propertyName, index) => {
                                const property = selectedSubType.properties![propertyName]
                                return (
                                    <TableRow key={propertyName}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{propertyName}</TableCell>
                                        <TableCell>{property.type}</TableCell>
                                        <TableCell>
                                            <Button
                                                sx={{
                                                    marginRight: 1
                                                }}
                                                size='small'
                                                color='error'>delete</Button>
                                            <Button size='small'
                                                    color='warning'>edit</Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </Card>
            )}
        </Box>
    )
}