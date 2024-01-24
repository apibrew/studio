import * as React from "react";
import {createRoot} from "react-dom/client";
import {RouterProvider,} from "react-router-dom";
import {RootLayout} from "./layout/RootLayout";
import './index.css'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {router} from "./router";
import {ThemeProvider} from "@mui/material";
import {theme} from "./theme";
import {ClientImpl} from "@apibrew/client";
import {ClientProvider, LocalStorageTokenStorage} from "@apibrew/react";

const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tL2FwaWJyZXcvYXBpYnJldyIsInN1YiI6ImFkbWluQGFkbWluLmNvbSIsImF1ZCI6WyJnaXRodWIuY29tL2FwaWJyZXcvYXBpYnJldyJdLCJleHAiOjE3MTAxNzMzMDEsIm5iZiI6MTcwNDk4OTMwMSwiaWF0IjoxNzA0OTg5MzAxLCJqdGkiOiIyNzYxMjcxYS1iMDVlLTRkMjYtOTYwNC01YjI2ODgzMGQyOWEiLCJ1c2VybmFtZSI6ImFkbWluQGFkbWluLmNvbSIsInVpZCI6IjRhNmEyOGU1LWUzZjItNGU2OC04YjI0LWRkOTUwOTdiNDhmMyIsInBlcm1pc3Npb25zIjpbeyJpZCI6Ijc4Njc5MjFjLTA4YjUtNDY5MS1hODJmLTljZGViZDY2ZWEzNiIsInZlcnNpb24iOjEsImF1ZGl0RGF0YSI6eyJjcmVhdGVkQnkiOiJzeXN0ZW0iLCJjcmVhdGVkT24iOiIyMDIzLTEyLTA1VDIyOjA2OjIwWiJ9LCJvcGVyYXRpb24iOiJGVUxMIiwidXNlciI6eyJpZCI6IjRhNmEyOGU1LWUzZjItNGU2OC04YjI0LWRkOTUwOTdiNDhmMyIsInZlcnNpb24iOjEsImF1ZGl0RGF0YSI6eyJjcmVhdGVkQnkiOiJzeXN0ZW0iLCJjcmVhdGVkT24iOiIyMDIzLTEyLTA1VDIyOjA2OjIwWiJ9LCJ1c2VybmFtZSI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJERabDFKV1l4VnhiSG52VWlXZnBwbGU0WHROVGFUV0JmLnBYdURVc2VVL1J2VWV5ajU2LkNDIn0sInBlcm1pdCI6IkFMTE9XIn0seyJpZCI6Ijc4Njc5MjFjLTA4YjUtNDY5MS1hODJmLTljZGViZDY2ZWEzNiIsInZlcnNpb24iOjEsImF1ZGl0RGF0YSI6eyJjcmVhdGVkQnkiOiJzeXN0ZW0iLCJjcmVhdGVkT24iOiIyMDIzLTEyLTA1VDIyOjA2OjIwWiJ9LCJvcGVyYXRpb24iOiJGVUxMIiwidXNlciI6eyJpZCI6IjRhNmEyOGU1LWUzZjItNGU2OC04YjI0LWRkOTUwOTdiNDhmMyIsInZlcnNpb24iOjEsImF1ZGl0RGF0YSI6eyJjcmVhdGVkQnkiOiJzeXN0ZW0iLCJjcmVhdGVkT24iOiIyMDIzLTEyLTA1VDIyOjA2OjIwWiJ9LCJ1c2VybmFtZSI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJERabDFKV1l4VnhiSG52VWlXZnBwbGU0WHROVGFUV0JmLnBYdURVc2VVL1J2VWV5ajU2LkNDIn0sInBlcm1pdCI6IkFMTE9XIn1dfQ.BBKhcv_QMwqNrJ5Jy8p3Wp1gTFX0brar5GfHnzmswrpAdWaTu26h2Pnv8yQezp_Swg6zsKy55M3uwUd_axMWok1nzgNyl3R3FvopyzFJ0gmAtEwU8-5iGotOfQGCMCwz04g-a6o90EHlfzlf5cBOkD9j4dNikCRgXSY8jm1BgfM"

// const client = new ClientImpl('https://manager.apibrew.io:8443')
// const client = new ClientImpl('http://localhost:9001')
const client = new ClientImpl('http://localhost:9017')
client.useTokenStorage(new LocalStorageTokenStorage())
client.authenticateWithToken(token)

createRoot(document.getElementById("root")!).render(
    <RootLayout>
        <ThemeProvider theme={theme}>
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <ClientProvider value={client}>
                <RouterProvider router={router}/>
            </ClientProvider>
        </ThemeProvider>
    </RootLayout>
);
