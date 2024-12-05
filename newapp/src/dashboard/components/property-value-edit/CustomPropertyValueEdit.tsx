import {PropertyValueView} from "../property-value-view/PropertyValueView.tsx";
import {Box, IconButton, Popover} from "@mui/material";
import {EditNote} from "@mui/icons-material";
import {PropertyEditor} from "../property-editor/PropertyEditor.tsx";
import {useDrawer} from "../../../hooks/use-drawer.tsx";
import {useState} from "react";
import {File} from "../../model/file.ts";
import {FileUploadDrawer} from "../storage/FileUpload.tsx";

export interface CustomPropertyValueEditProps {
    resource: any
    property: any
    value: any
    onChange: (value: any) => void
}

export function CustomPropertyValueEdit(props: CustomPropertyValueEditProps) {
    const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement>()

    const drawer = useDrawer()

    return <Box display='flex'
                width='100%'
                justifyContent='space-between'>
        <PropertyValueView
            property={props.property}
            value={props.value}
        />
        {drawer.render()}
        <IconButton onClick={(event) => {
            if (props.property.reference === 'storage/File') {
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
                }}/>
        </Popover>
    </Box>
}
