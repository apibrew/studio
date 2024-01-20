import {MenuItem, Select} from "@mui/material";
import {SelectProps} from "@mui/material/Select/Select";
import {Type} from "@apibrew/client/model/resource";

export interface PropertyTypeDropdownProps extends SelectProps<Type> {
}

export function PropertyTypeDropdown(props: PropertyTypeDropdownProps) {
    return (
        <Select {...props}>
            <MenuItem value={Type.STRING}>String</MenuItem>
            <MenuItem value={Type.INT32}>Int 32</MenuItem>
            <MenuItem value={Type.INT64}>Int 64</MenuItem>
            <MenuItem value={Type.FLOAT32}>Float 32</MenuItem>
            <MenuItem value={Type.FLOAT64}>Float 64</MenuItem>
            <MenuItem value={Type.BOOL}>Bool</MenuItem>
            <MenuItem value={Type.UUID}>UUID</MenuItem>
            <MenuItem value={Type.DATE}>Date</MenuItem>
            <MenuItem value={Type.TIME}>Time</MenuItem>
            <MenuItem value={Type.TIMESTAMP}>Timestamp</MenuItem>
            <MenuItem value={Type.ENUM}>Enum</MenuItem>
            <MenuItem value={Type.LIST}>List</MenuItem>
            <MenuItem value={Type.MAP}>Map</MenuItem>
            <MenuItem value={Type.BYTES}>Bytes</MenuItem>
            <MenuItem value={Type.STRUCT}>Struct</MenuItem>
            <MenuItem value={Type.REFERENCE}>Reference</MenuItem>
            <MenuItem value={Type.OBJECT}>Object</MenuItem>
        </Select>
    )
}
