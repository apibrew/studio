import {createRoot} from "react-dom/client";

import 'core'
import 'common'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {ThemeProvider} from "@mui/material";
import {theme} from "./theme";

import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {enUS} from "@mui/x-date-pickers";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {HomePage} from "./pages/HomePage.tsx";

export const index = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>,
    },
])

export function Router() {
    return <RouterProvider router={index}/>
}

createRoot(document.getElementById("root")!).render(
    <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}
                              localeText={enUS.components.MuiLocalizationProvider.defaultProps.localeText}
        >
            <Router/>
        </LocalizationProvider>
    </ThemeProvider>
);
