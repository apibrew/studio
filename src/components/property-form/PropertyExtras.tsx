import {Resource} from "@apibrew/react";
import {Property} from "@apibrew/client/model";
import {Type} from "@apibrew/client/model/resource";
import {Box, FormControl, FormHelperText, MenuItem, Select, Typography} from "@mui/material";
import React, {useEffect} from "react";
import {PropertyTypeDropdown} from "../PropertyTypeDropdown";
import {ResourceSelect} from "../ResourceSelect";
import {TagInput} from "../TagInput";

export interface PropertyExtrasProps {
    resource: Resource
    property: Property
    onChange: (updated: Property) => void
    disableHelperText?: boolean
}

export function PropertyExtras(props: PropertyExtrasProps) {
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

    useEffect(() => {
        if (props.property.type === Type.LIST) {
            if (props.property.item === undefined) {
                props.onChange({
                    ...props.property,
                    item: {
                        type: Type.STRING
                    } as Property
                })
            }
        }
    }, [props.property]);

    switch (props.property.type) {
        case Type.MAP:
        case Type.LIST:
            if (props.property.item === undefined) {
                return <>Loading...</>
            }
            return <>
                <Box marginLeft={1}
                     display='flex'
                     border={'1 px solid black'}>
                    <FormControl fullWidth>
                        <PropertyTypeDropdown
                            sx={propertySx}
                            value={props.property.item?.type}
                            label='Type'
                            title='Type'
                            variant='filled'
                            onChange={(event) => {
                                props.onChange({
                                    ...props.property,
                                    item: {
                                        ...props.property.item,
                                        type: event.target.value as Type
                                    }
                                })
                            }}/>
                    </FormControl>
                    <PropertyExtras
                        resource={props.resource}
                        property={props.property.item}
                        disableHelperText={props.disableHelperText}
                        onChange={item => {
                            props.onChange({
                                ...props.property,
                                item: item
                            })
                        }}
                    />
                </Box>
            </>
        case Type.STRUCT:
            return <>
                <Box marginLeft={1} border={'1 px solid black'}>
                    <FormControl fullWidth>
                        <Select
                            value={props.property.typeRef}
                            label='Sub Type'
                            title='Sub Type'
                            variant='filled'
                            sx={propertySx}
                            onChange={(event) => {
                                props.onChange({
                                    ...props.property,
                                    typeRef: event.target.value as string
                                })
                            }}>
                            {(props.resource.types || []).map(type => (
                                <MenuItem key={type.name} value={type.name}>{type.name}</MenuItem>
                            ))}
                        </Select>
                        {!props.disableHelperText && <FormHelperText>
                            <Typography variant='caption'>
                                For creating a new type, you need to go to the types of resource from the left menu.
                            </Typography>
                        </FormHelperText>}
                    </FormControl>
                </Box>
            </>
        case Type.ENUM:
            return <>
                <TagInput
                    value={props.property.enumValues || []}
                    onChange={(newValue: any) => {
                        props.onChange({
                            ...props.property,
                            enumValues: newValue as any
                        })
                    }}
                    inputPros={{
                    }}
                />
            </>
        case Type.REFERENCE:
            return <Box marginLeft={1}
                        display='flex'
                        border={'1 px solid black'}>
                <FormControl fullWidth>
                    <ResourceSelect
                        sx={propertySx}
                        value={props.property.reference}
                        label='Resource'
                        title='Resource'
                        variant='filled'
                        onChange={(event) => {
                            props.onChange({
                                ...props.property,
                                reference: event.target.value
                            })
                        }}/>
                </FormControl>
            </Box>

    }

    return <>

    </>
}