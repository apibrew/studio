import {createTheme} from "@mui/material";

export const theme = createTheme({
    typography: {
        button: {
            textTransform: 'none',
        },
    },
    palette: {
        // primary: {
        //     main: '#FbFeF0',
        // },
        text: {
            primary: '#1E3C50FF',
            secondary: '#0a1414',
        }
    },
    components: {
        MuiButton: {
            defaultProps: {
                size: 'small',
                variant: 'contained',
                color: 'primary',
            }
        }
    }
});