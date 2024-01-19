import {Schema} from "../../types/schema";
import React from "react";
import {Box} from "@mui/material";
import './InteractiveYaml.scss'
import {dump} from "js-yaml";
import {Resource} from "@apibrew/react";
import {StructValue} from "./StructValue";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";

export interface InteractiveYamlProps {
    resource: Resource
    schema: Schema
    value: any
    onChange: (updated: any) => void
}

export function InteractiveYaml(props: InteractiveYamlProps) {
    return <>
        <Box display='flex' flexDirection='row'>
            <Box className='interactive-yaml'
                 display='flex'
                 flexDirection='column'>
                <StructValue
                    resource={props.resource}
                    schema={props.schema}
                    value={props.value}
                    path='$'
                    depth={0}
                    onChange={updated => {
                        props.onChange(updated)
                    }}
                />
            </Box>
            <Box width='200px'/>
            <Box m={1}>
                <Button size='small'
                        variant='text'
                        onClick={() => {
                            navigator.clipboard.writeText(dump({
                                type: props.resource.name,
                                ...props.value
                            }))
                            toast.success('Copied to clipboard')
                        }}
                        sx={{
                            marginRight: '200px',
                        }}>copy</Button>
            </Box>
        </Box>
        <hr/>
        <pre>
            {dump(props.value)}
        </pre>
    </>
}