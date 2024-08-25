import {createRoot} from "react-dom/client";

import 'core'
import 'common'
import './registry'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {ThemeProvider} from "@mui/material";
import {theme} from "./theme";

import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {enUS} from "@mui/x-date-pickers";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'

import {Router} from "./router.tsx";
import {RootLayout} from "./layout/RootLayout.tsx";

createRoot(document.getElementById("root")!).render(
    <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}
                              localeText={enUS.components.MuiLocalizationProvider.defaultProps.localeText}
        >
            <RootLayout>
                <Router/>
            </RootLayout>
        </LocalizationProvider>
    </ThemeProvider>
);
