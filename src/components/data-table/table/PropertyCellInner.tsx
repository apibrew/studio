import {Tooltip, Typography} from "@mui/material";
import {Type} from "@apibrew/client/model/resource";
import React from "react";
import {Property} from "@apibrew/client/model";
import toast from "react-hot-toast";

export interface PropertyCellInnerProps {
    property: Property
    value: any
    updated: any
}

export function PropertyCellInner(props: PropertyCellInnerProps) {
    let value = props.updated || props.value

    if (value === undefined) {
        return <Typography color='lightgrey'>Null</Typography>
    }

    switch (props.property.type) {
        case Type.BOOL:
            value = value ? 'true' : 'false'
            break;
        case Type.STRING:
            if (value.length > 40) {
                value = value.substring(0, 40) + '...'
            }
            break;
        case Type.LIST:
        case Type.MAP:
        case Type.REFERENCE:
        case Type.STRUCT:
        case Type.OBJECT:
            value = JSON.stringify(value)

            if (value.length > 40) {
                value = value.substring(0, 40) + '...'
            }
            break;
        case Type.UUID:
            return <Tooltip title={value}>
                <Typography className='cell-text cell-hand'
                            onClick={() => {
                                navigator.clipboard.writeText(value)
                                toast.success('Copied to clipboard')
                            }}>{value.substring(0, 8)}</Typography>
            </Tooltip>
    }

    return <>
        <Typography className='cell-text'>{value}</Typography>
    </>
}
