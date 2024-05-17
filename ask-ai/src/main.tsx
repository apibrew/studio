import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {ClientImpl, ClientProvider, LocalStorageTokenStorage} from "@apibrew/react";

const client = new ClientImpl('https://manager.apibrew.io:8443')
client.useTokenStorage(new LocalStorageTokenStorage('manager'))

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ClientProvider value={client}>
            <App/>
        </ClientProvider>
    </React.StrictMode>,
)
