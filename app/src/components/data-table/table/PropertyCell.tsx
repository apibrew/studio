import {Box} from "@mui/material";
import {useState, MouseEvent} from "react";
import {Property} from "@apibrew/client/model";
import {Resource} from "@apibrew/react";
import toast from "react-hot-toast";
import {PropertyValueView} from "../../property-value-view/PropertyValueView";
import {isInlineEditSupported, PropertyValueEdit} from "../../property-value-edit/PropertyValueEdit";
import {useDrawer} from "../../../hooks/use-drawer";
import {isAnnotationEnabled} from "../../../util/annotation";
import {PropertyNanoDrawer} from "../../property-nano-drawer/PropertyNanoDrawer";
import {FileUploadDrawer} from "../../storage/FileUpload";
import {File} from '../../../model/file'

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
    const drawer = useDrawer()

    const edited = props.updated !== undefined && props.updated !== props.value

    let value = props.updated

    if (props.updated === undefined) {
        value = props.value
    }

    return <>
        {drawer.render()}
        <Box
            className='cell body-cell'
            onContextMenu={props.openContextMenu}
            style={{
                backgroundColor: edited ? 'lightcyan' : 'transparent',
                flexBasis: props.width
            }}
            onBlur={() => {
                // setInlineEdit(false)
            }}
            onDoubleClick={(e) => {
                if (!isInlineEditSupported(props.property)) {
                    if (props.openContextMenu) {
                        props.openContextMenu(e)
                    } else {
                        toast.error('Cannot edit complex types, please expand the row to edit')
                    }
                } else {
                    if (!props.new && (props.property.immutable || props.resource.immutable)) {
                        return
                    }

                    let isNanoProperty = false

                    if (props.property.reference === 'storage/File') {
                        let file = (props.updated || props.value) as File

                        drawer.open(<FileUploadDrawer
                            title={'Upload File'}
                            value={file}
                            onChange={updated => {
                                props.onUpdate(updated)
                            }}
                            onClose={() => {
                                drawer.close()
                            }}/>)
                        return
                    }

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
                        if (props.resource.name === 'Module' && props.propertyName === 'source') {
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
                                props.onUpdate(updated)
                            }}/>)
                        return
                    }

                    setInlineEdit(true)
                }
            }}>
            <Box className='cell-inner'>
                {!inlineEdit && <PropertyValueView
                    property={props.property}
                    value={value}
                />}
                {inlineEdit && <PropertyValueEdit
                    autoOpen={true}
                    property={props.property}
                    value={value}
                    onChange={value => {
                        props.onUpdate(value)
                        setInlineEdit(false)
                    }}
                />}
            </Box>
        </Box>
    </>
}
