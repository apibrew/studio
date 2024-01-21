import {Box, CircularProgress} from "@mui/material";
import React from "react";

export function LoadingOverlay() {
    return <Box sx={{
        width: '100%',
        height: '100%',
        textAlign: 'center',
        verticalAlign: 'middle',
        alignContent: 'center',
        justifyContent: 'center',
    }}>
        <CircularProgress sx={{}}/>
    </Box>
}