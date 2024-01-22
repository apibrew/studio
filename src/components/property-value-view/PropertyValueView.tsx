import {Tooltip, Typography} from "@mui/material";
import {Type} from "@apibrew/client/model/resource";
import toast from "react-hot-toast";
import React from "react";
import {Property} from "@apibrew/client/model";
import {label} from "../../util/record";

export interface PropertyValueViewProps {
    property: Property
    value: any
}

export function PropertyValueView(props: PropertyValueViewProps) {
    let value = props.value

    if (value === undefined) {
        return <Typography color='lightgrey'>Null</Typography>
    }

    switch (props.property.type) {
        case Type.BOOL:
            value = value ? 'T' : 'F'
            break;
        case Type.STRING:
            if (value.length > 40) {
                value = value.substring(0, 40) + '...'
            }
            break;
        case Type.LIST:
            value = value.map((item: any) => label(item)).join('; ')
            break;
        case Type.MAP:
            value = Object.keys(value).map((item: string) => {
                return `${item}: ${label(value[item])}`
            }).join(';')
            break;
        case Type.REFERENCE:
        case Type.STRUCT:
        case Type.OBJECT:
            value = label(value)
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