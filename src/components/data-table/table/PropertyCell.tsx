import {Box} from "@mui/material";
import React, {ReactNode, useState} from "react";
import {Property} from "@apibrew/client/model";
import {PropertyCellInner} from "./PropertyCellInner";
import {PropertyCellEdit} from "./PropertyCellEdit";
import {PropertyExpand} from "./PropertyExpand";
import {Resource} from "@apibrew/react";
import toast from "react-hot-toast";

export interface PropertyCellProps {
    resource: Resource
    propertyName: string
    property: Property
    value: any
    updated: any
    onUpdate: (updated: any) => void
    width: number
    record: any

}

export function PropertyCell(props: PropertyCellProps) {
    const [inlineEdit, setInlineEdit] = useState<boolean>(false)

    const edited = props.updated !== undefined && props.updated !== props.value

    const isComplex = props.property.type === 'LIST' || props.property.type === 'MAP' || props.property.type === 'STRUCT'

    return <Box
        className='cell body-cell'
        style={{
            backgroundColor: edited ? 'lightcyan' : 'transparent',
            flexBasis: props.width
        }}
        onBlur={() => {
            setInlineEdit(false)
        }}
        onDoubleClick={() => {
            if (isComplex) {
                toast.error('Cannot edit complex types, please expand the row to edit')
            } else {
                if (props.property.immutable) {
                    return
                }
                setInlineEdit(true)
            }
        }}>
        <Box className='cell-inner'>
            {!inlineEdit && <PropertyCellInner {...props}/>}
            {inlineEdit && <PropertyCellEdit {...props}/>}
        </Box>
    </Box>
}