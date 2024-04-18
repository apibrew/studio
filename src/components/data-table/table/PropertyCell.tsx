import {Box} from "@mui/material";
import React, {useState} from "react";
import {Property} from "@apibrew/client/model";
import {Resource} from "@apibrew/react";
import toast from "react-hot-toast";
import {PropertyValueView} from "../../property-value-view/PropertyValueView";
import {PropertyValueEdit} from "../../property-value-edit/PropertyValueEdit";
import {useDrawer} from "../../../hooks/use-drawer";
import {isAnnotationEnabled} from "../../../util/annotation";
import {PropertyNanoDrawer} from "../../property-nano-drawer/PropertyNanoDrawer";

export interface PropertyCellProps {
    resource: Resource
    propertyName: string
    property: Property
    value: any
    updated: any
    onUpdate: (updated: any) => void
    width: number
    new?: boolean

}

export function PropertyCell(props: PropertyCellProps) {
    const [inlineEdit, setInlineEdit] = useState<boolean>(false)
    const drawer = useDrawer()

    const edited = props.updated !== undefined && props.updated !== props.value

    const isComplex = (
        props.property.type === 'LIST' && props.property.item?.type !== 'STRING'
    ) || props.property.type === 'MAP' || props.property.type === 'STRUCT' || props.property.type === 'OBJECT'

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
                if (!props.new && (props.property.immutable || props.resource.immutable)) {
                    return
                }

                let isNanoProperty = false

                if (props.property.type === 'STRING' && isAnnotationEnabled(props.property.annotations, 'NanoCode')) {
                    isNanoProperty = true
                }

                if (props.resource.namespace.name === 'nano') {
                    if (props.resource.name === 'Function' && props.propertyName === 'source') {
                        isNanoProperty = true
                    }
                    if (props.resource.name === 'Function' && props.propertyName === 'source') {
                        isNanoProperty = true
                    }
                    if (props.resource.name === 'CronJob' && props.propertyName === 'source') {
                        isNanoProperty = true
                    }
                }

                if (isNanoProperty) {
                    drawer.open(<PropertyNanoDrawer
                        code={props.updated || props.value}
                        onClose={() => {
                            drawer.close()
                        }}
                        onChange={updated => {
                            if (JSON.stringify(updated) !== JSON.stringify(props.value)) {
                                props.onUpdate(updated)
                            }
                        }}/>)
                    return
                }

                setInlineEdit(true)
            }
        }}>
        {drawer.render()}
        <Box className='cell-inner'>
            {!inlineEdit && <PropertyValueView
                property={props.property}
                value={props.updated || props.value}
            />}
            {inlineEdit && <PropertyValueEdit
                autoOpen={true}
                property={props.property}
                value={props.updated || props.value}
                onChange={value => {
                    if (JSON.stringify(value) !== JSON.stringify(props.value)) {
                        props.onUpdate(value)
                    }
                    setInlineEdit(false)
                }}
            />}
        </Box>
    </Box>
}
