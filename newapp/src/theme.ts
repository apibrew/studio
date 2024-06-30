import {createTheme} from "@mui/material";

export const theme = createTheme({
    typography: {
        button: {
            textTransform: 'none',
        },
    },
    palette: {
        primary: {
            main: '#7F56D9',
        },
        secondary: {
            main: '#FFF',
            contrastText: '#000',
        },
        text: {
            primary: '#667085',
            secondary: '#667085',
        },
        background: {
            default: '#f5f5f5', // your desired backdrop color
        },
    },
    components: {
        MuiButton: {
            defaultProps: {
                size: 'small',
                variant: 'contained',
                color: 'secondary',
            },
            styleOverrides: {
                outlinedSecondary: {
                    color: '#000', // Set text color to black for outlined secondary buttons
                },
                textSecondary: {
                    color: '#000', // Set text color to black for text secondary buttons
                },
            },
        },
        MuiFilledInput: {
            defaultProps: {
                margin: 'dense',
            },
        },
        MuiFormControl: {
            defaultProps: {
                margin: 'dense',
            },
        },
        MuiFormHelperText: {
            defaultProps: {
                margin: 'dense',
            },
        },
        MuiIconButton: {
            defaultProps: {
                size: 'small',
            },
        },
        MuiInputBase: {
            defaultProps: {
                margin: 'dense',
            },
        },
        MuiInputLabel: {
            defaultProps: {
                margin: 'dense',
            },
        },
        MuiListItem: {
            defaultProps: {
                dense: true,
            },
        },
        MuiOutlinedInput: {
            defaultProps: {
                margin: 'dense',
            },
        },
        MuiFab: {
            defaultProps: {
                size: 'small',
            },
        },
        MuiTable: {
            defaultProps: {
                size: 'small',
                padding: 'normal',
            },
        },
        MuiTextField: {
            defaultProps: {
                size: 'small',
                color: 'primary',
                margin: 'dense',
                style: {
                    padding: '3px',
                    margin: 0,
                }
            },
        },
        MuiToolbar: {
            defaultProps: {
                variant: 'dense',
            },
        },
    },
});
