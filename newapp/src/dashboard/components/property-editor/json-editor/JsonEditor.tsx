import {JsonEditor as JE} from 'json-edit-react'
import 'jsoneditor-react/es/editor.min.css';
import {FC} from "react";
import {PropertyFormProps} from "core";
import {Box} from "@mui/material";

const JsonEditor: FC<PropertyFormProps<object>> = (props: PropertyFormProps<object>) => {
    return <>
        <Box height='500px'>
            <JE
                rootName={''}
                data={props.value || {}}
                setData={data => {
                    props.onChange(data as any, true)
                }}
                enableClipboard={true}
            />
        </Box>
    </>
};

export default JsonEditor;
