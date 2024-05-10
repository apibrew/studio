import {Box, CircularProgress} from "@mui/material";


export function LoadingOverlay() {
    return <Box sx={{
        width: '100%',
        height: '100%',
        marginTop: '200px',
        textAlign: 'center',
        verticalAlign: 'middle',
        alignContent: 'center',
        justifyContent: 'center',
    }}>
        <CircularProgress sx={{}}/>
    </Box>
}
