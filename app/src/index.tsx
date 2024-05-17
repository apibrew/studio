import {createRoot} from "react-dom/client";
import {RootLayout} from "./layout/RootLayout";
import './index.css'

import 'core'
import 'common'
import './registry'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {Router} from "./router";
import {ThemeProvider} from "@mui/material";
import {theme} from "./theme";

import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {enUS} from "@mui/x-date-pickers";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'


createRoot(document.getElementById("root")!).render(
    <RootLayout>
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}
                                  localeText={enUS.components.MuiLocalizationProvider.defaultProps.localeText}
            >
                <Router/>
            </LocalizationProvider>
        </ThemeProvider>
    </RootLayout>
);
