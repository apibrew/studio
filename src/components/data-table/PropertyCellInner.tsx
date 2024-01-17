import {Icon, IconButton, Tooltip, Typography} from "@mui/material";
import {Type} from "@apibrew/client/model/resource";
import Button from "@mui/material/Button";
import {UnfoldMore} from "@mui/icons-material";
import React from "react";
import {Property} from "@apibrew/client/model";

export interface PropertyCellInnerProps {
    property: Property
    value: any
    updated: any
}

export function PropertyCellInner(props: PropertyCellInnerProps) {
    let value = props.updated || props.value
    let viewMore = false

    if (props.value === undefined) {
        return <Typography color='lightgrey'>Null</Typography>
    }

    switch (props.property.type) {
        case Type.BOOL:
            value = props.value ? 'true' : 'false'
            break;
        case Type.STRING:
            if (value.length > 40) {
                value = value.substring(0, 20) + '...'
                viewMore = true
            }
            break;
        case Type.LIST:
        case Type.MAP:
        case Type.REFERENCE:
        case Type.STRUCT:
        case Type.OBJECT:
            value = JSON.stringify(props.value)

            if (value.length > 40) {
                value = value.substring(0, 20) + '...'
                viewMore = true
            }
            break;
        case Type.UUID:
            return <Tooltip title={value}>
                <Button variant='text' onClick={() => {
                }}>{value.substring(0, 8)}</Button>
            </Tooltip>
    }

    return <>
        {value}
        {viewMore && <IconButton>
            <Icon fontSize='small'>
                <UnfoldMore/>
            </Icon>
        </IconButton>}
    </>
}
