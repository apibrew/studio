import {Box} from "@mui/material";
import React, {useState} from "react";
import {Property} from "@apibrew/client/model";
import {Resource} from "@apibrew/react";
import toast from "react-hot-toast";
import {PropertyValueView} from "../../property-value-view/PropertyValueView";
import {PropertyValueEdit} from "../../property-value-edit/PropertyValueEdit";

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

    const isComplex = (
        props.property.type === 'LIST' && props.property.item?.type !== 'STRING'
    ) || props.property.type === 'MAP' || props.property.type === 'STRUCT'

    return <Box
        className='cell body-cell'
        style={{
            backgroundColor: edited ? 'lightcyan' : 'transparent',
            flexBasis: props.width
        }}
        onBlur={() => {
            // setInlineEdit(false)
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
            {!inlineEdit && <PropertyValueView
                property={props.property}
                value={props.updated || props.value}
            />}
            {inlineEdit && <PropertyValueEdit
                property={props.property}
                value={props.updated || props.value}
                onChange={props.onUpdate}
                onForceClose={() => {
                    setInlineEdit(false)
                }}
            />}
        </Box>
    </Box>
}