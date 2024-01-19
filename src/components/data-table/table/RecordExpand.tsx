import {Resource} from "@apibrew/react";
import {Box} from "@mui/material";
import {InteractiveYaml} from "../../interactive-yaml/InteractiveYaml";

export interface RecordExpandProps {
    resource: Resource
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
        <InteractiveYaml
            resource={props.resource}
            schema={props.resource}
            value={value}
            onChange={props.onUpdate}
        />
    </Box>
}