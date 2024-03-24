import {Resource} from "@apibrew/react";
import {Box} from "@mui/material";
import React from "react";
import JSONInput from 'react-json-editor-ajrm';
import {localeEn} from "./json-input";

export interface RecordExpandProps {
    resource: Resource
    new: boolean
    value: any
    updated: any
    onUpdate: (updated: any) => void
}

export function RecordExpand(props: RecordExpandProps) {
    const value = {
        ...props.value,
        ...props.updated
    }

    return <Box>
        {/*<InteractiveYaml*/}
        {/*    new={props.new}*/}
        {/*    resource={props.resource}*/}
        {/*    schema={props.resource}*/}
        {/*    value={value}*/}
        {/*    onChange={props.onUpdate}*/}
        {/*/>*/}
        <JSONInput
            id='a_unique_id'
            placeholder={value}
            onChange={(e: any) => {
                props.onUpdate(e.jsObject)
            }}
            locale={localeEn}
            height='550px'
        />
    </Box>
}