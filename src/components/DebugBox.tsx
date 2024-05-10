import {Box, TextField} from "@mui/material";
import {useState} from "react";

export function DebugBox() {
    const [width, setWidth] = useState<number>(0)
    const [height, setHeight] = useState<number>(0)

    return <>
        <TextField label="Width" type="number" value={width} onChange={(e) => setWidth(parseInt(e.target.value))}/>
        <TextField label="Height" type="number" value={height} onChange={(e) => setHeight(parseInt(e.target.value))}/>
        <Box width={width} height={height} style={{
            backgroundColor: '#CACACA',
        }}>
            {width} - {height}
        </Box>
    </>
}
