import {PropertyValueView} from "../property-value-view/PropertyValueView.tsx";
import {Box, IconButton, Popover} from "@mui/material";
import {EditNote} from "@mui/icons-material";
import {PropertyEditor} from "../property-editor/PropertyEditor.tsx";
import {useDrawer} from "../../../hooks/use-drawer.tsx";
import {useState} from "react";
import {File} from "../../model/file.ts";
import {FileUploadDrawer} from "../storage/FileUpload.tsx";
import {isAnnotationEnabled} from "../../../util/annotation.ts";
import {PropertyNanoDrawer} from "../property-nano-drawer/PropertyNanoDrawer.tsx";
import {isFileProperty} from "../../../util/property.ts";

export interface CustomPropertyValueEditProps {
    resource: any
    property: any
    propertyName: string
    value: any
    onChange: (value: any) => void
}

export function CustomPropertyValueEdit(props: CustomPropertyValueEditProps) {
    const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement>()

    const drawer = useDrawer()

    return <Box display='flex'
                width='100%'
                onClick={ e => {
                    e.stopPropagation()
                }}
                onContextMenu={ e => {
                    e.stopPropagation()
                }}
                justifyContent='space-between'>
        <PropertyValueView
            sx={{
                marginTop: '6px'
            }}
            property={props.property}
            value={props.value}
        />
        {drawer.render()}
        <IconButton onClick={(event) => {
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
                if (props.resource.name === 'Module' && props.propertyName === 'source') {
                    isNanoProperty = true
                }
            }

            if (isNanoProperty) {
                drawer.open(<PropertyNanoDrawer
                    code={props.value}
                    onClose={() => {
                        drawer.close()
                    }}
                    onChange={updated => {
                        props.onChange(updated)
                    }}/>)
                return
            }
            if (isFileProperty(props.property)) {
                let file = (props.value) as File

                drawer.open(<FileUploadDrawer
                    title={'Upload File'}
                    value={file}
                    onChange={updated => {
                        props.onChange(updated)
                    }}
                    onClose={() => {
                        drawer.close()
                    }}/>)
            } else {
                setPopoverAnchor(event.currentTarget)
            }
        }}>
            <EditNote/>
        </IconButton>
        <Popover
            open={Boolean(popoverAnchor)}
            anchorEl={popoverAnchor}
            onClose={() => setPopoverAnchor(undefined)}
            anchorPosition={{
                top: 200,
                left: 200
            }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <PropertyEditor
                resource={props.resource}
                property={props.property}
                value={props.value}
                onApply={updated => {
                    props.onChange(updated)
                    setPopoverAnchor(undefined)
                }}/>
        </Popover>
    </Box>
}
