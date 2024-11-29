import {Box} from "@mui/material";
import {MouseEvent, useState} from "react";
import {Property} from "@apibrew/client/model";
import {Resource} from "@apibrew/react";
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
    new?: boolean
    openContextMenu?: (e: MouseEvent<HTMLDivElement>) => void
}

export function PropertyCell(props: PropertyCellProps) {
    const [inlineEdit, setInlineEdit] = useState<boolean>(false)

    const edited = props.updated !== undefined && props.updated !== props.value

    let value = props.updated

    if (props.updated === undefined) {
        value = props.value
    }

    if (props.property.type === 'FLOAT32' || props.property.type === 'FLOAT64') {
        if (value !== undefined) {
            value = Math.round(value * 100000) / 100000
        }
    }

    let alwaysInlineEdit = false

    switch (props.property.type) {
        // case 'TIMESTAMP':
        // case 'TIME':
        // case 'DATE':
        case 'BOOL':
        case 'OBJECT':
        case 'BYTES':
        case 'STRUCT':
        case 'LIST':
        case 'MAP':
            alwaysInlineEdit = true
            break
    }

    return <>
        <Box
            className='cell body-cell'
            onContextMenu={props.openContextMenu}
            style={{
                backgroundColor: edited ? 'lightcyan' : 'transparent',
                flexBasis: props.width,
                flexShrink: 0
            }}
            onMouseEnter={() => {
                if (!props.new && (props.property.immutable || props.resource.immutable)) {
                    return false;
                }

                setInlineEdit(true)
            }}
            onMouseLeave={() => {
                setInlineEdit(false)
            }}>
            <Box className='cell-inner'>
                {!(inlineEdit || alwaysInlineEdit) && <PropertyValueView
                    property={props.property}
                    value={value}
                />}
                {(inlineEdit || alwaysInlineEdit) && <PropertyValueEdit
                    resource={props.resource}
                    autoOpen={true}
                    property={props.property}
                    propertyName={props.propertyName}
                    value={value}
                    onChange={value => {
                        props.onUpdate(value)
                    }}
                />}
            </Box>
        </Box>
    </>
}
