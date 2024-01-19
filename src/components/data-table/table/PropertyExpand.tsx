import {Resource} from "@apibrew/react";
import {Box} from "@mui/material";
import {dump} from "js-yaml";

export interface PropertyExpandProps {
    resource: Resource
    value: any
    updated: any
    onUpdate: (updated: any) => void
}

export function PropertyExpand(props: PropertyExpandProps) {
    const value = {
        ...props.value,
        ...props.updated
    }

    return <Box>
        <pre>
            {dump(value)}
        </pre>
    </Box>
}