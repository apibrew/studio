import {TableCell} from "@mui/material";
import React, {useState} from "react";
import {Property} from "@apibrew/client/model";
import {PropertyCellInner} from "./PropertyCellInner";
import {PropertyCellEdit} from "./PropertyCellEdit";

export interface PropertyCellProps {
    property: Property
    value: any
    updated: any
    onUpdate: (updated: any) => void
}

export function PropertyCell(props: PropertyCellProps) {
    const [inlineEdit, setInlineEdit] = useState<boolean>(false)

    const edited = props.updated !== undefined && props.updated !== props.value

    return <TableCell
        style={{
            backgroundColor: edited ? 'lightcyan' : 'transparent'
        }}
        onBlur={() => {
            setInlineEdit(false)
        }}
        onDoubleClick={() => {
            if (props.property.immutable) {
                return
            }
            setInlineEdit(true)
        }}>
        {!inlineEdit && <PropertyCellInner {...props}/>}
        {inlineEdit && <PropertyCellEdit {...props}/>}
    </TableCell>
}