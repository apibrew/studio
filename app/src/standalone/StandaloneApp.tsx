import 'app/dist/style.css'
import 'core'
import 'common'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {ThemeProvider} from "@mui/material";

import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {enUS} from "@mui/x-date-pickers";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {ClientProvider, Connection, LocalStorageTokenStorage} from "@apibrew/react";
import {newClientByServerConfig} from "@apibrew/client/client";
import toast from "react-hot-toast";
import {ReactNode, useEffect, useState} from "react";
import {Client} from "@apibrew/client";
import {LoadingOverlay} from "common";
import {RootLayout} from "../layout/RootLayout";
import {theme} from "../theme";
import {ConnectionContext} from "../context/ConnectionContext";

export interface AppProps {
    connection: Connection
    children: ReactNode
}

export function StandaloneApp(props: AppProps) {
    const [client, setClient] = useState<Client>()

    useEffect(() => {
        newClientByServerConfig(props.connection.serverConfig).then(cl => {
            setClient(cl)
            cl.useTokenStorage(new LocalStorageTokenStorage(props.connection.name))
        }, err => {
            toast.error(err.message)
            return;
        })
    }, [props.connection.name, props.connection.serverConfig]);

    if (!client) {
        return <LoadingOverlay/>
    }

    return (
        <ClientProvider value={client}>
            <ConnectionContext.Provider value={props.connection}>
                <RootLayout>
                    <ThemeProvider theme={theme}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}
                                              localeText={enUS.components.MuiLocalizationProvider.defaultProps.localeText}
                        >
                            {props.children}
                        </LocalizationProvider>
                    </ThemeProvider>
                </RootLayout>
            </ConnectionContext.Provider>
        </ClientProvider>
    )
}
