import {Schema} from "../../types/schema";
import React from "react";
import {Box} from "@mui/material";
import './InteractiveYaml.scss'
import {dump} from "js-yaml";
import {Resource} from "@apibrew/react";
import {StructValue} from "./StructValue";

export interface InteractiveYamlProps {
    resource: Resource
    schema: Schema
    value: any
    onChange: (updated: any) => void
}

export function InteractiveYaml(props: InteractiveYamlProps) {
    return <>
        <Box className='interactive-yaml'
             display='flex'
             flexDirection='column'>
            <StructValue
                resource={props.resource}
                schema={props.schema}
                value={props.value}
                onChange={updated => {
                    props.onChange(updated)
                }}
            />
        </Box>
        <hr/>
        <pre>
            {dump(props.value)}
        </pre>
    </>
}