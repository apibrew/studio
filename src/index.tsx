import * as React from "react";
import {createRoot} from "react-dom/client";
import {RouterProvider,} from "react-router-dom";
import {RootLayout} from "./layout/RootLayout";
import './index.css'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {Router, router} from "./router";
import {ThemeProvider} from "@mui/material";
import {theme} from "./theme";

createRoot(document.getElementById("root")!).render(
    <RootLayout>
        <ThemeProvider theme={theme}>
            <Router/>
        </ThemeProvider>
    </RootLayout>
);
