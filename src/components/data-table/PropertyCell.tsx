import {Icon, IconButton, TableCell, Typography} from "@mui/material";
import React from "react";
import {Property} from "@apibrew/client/model";
import {Type} from "@apibrew/client/model/resource";
import {UnfoldMore} from "@mui/icons-material";

export interface PropertyCellProps {
    property: Property
    value: any
}

export function PropertyCell(props: PropertyCellProps) {
    let value = props.value
    let viewMore = false

    if (props.value === undefined) {
        return <TableCell>
            <Typography color='lightgrey'>Null</Typography>
        </TableCell>
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
    }

    return <TableCell>
        {value}
        {viewMore && <IconButton>
            <Icon fontSize='small'>
                <UnfoldMore/>
            </Icon>
        </IconButton>}
    </TableCell>
}