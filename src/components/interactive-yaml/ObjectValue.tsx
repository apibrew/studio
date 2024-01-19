import {PropertyValueProps} from "./PropertyValue";
import {dump} from "js-yaml";
import {Box} from "@mui/material";

export function ObjectValue(props: PropertyValueProps) {
    return <Box>
        <pre style={{
            margin: 0
        }}>
            {dump(props.value)}
        </pre>
    </Box>
}