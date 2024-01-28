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
                color: 'primary',
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

const inputSx = {
    width: '100%',
    padding: 0,
    margin: 0,
    '& .MuiInputBase-input': {
        padding: '3px',
        margin: 0,
    },
    '& .MuiSelect-select': {
        padding: '3px',
        margin: 0,
    }
}
