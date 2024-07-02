import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from "../lib/App.tsx";
import {Server} from "@apibrew/client/config";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App connection={{
            name: 'analytics',
            serverConfig: {
                name: 'analytics',
                host: 'https://analytics.tisserv.net',
                port: 443,
                httpPort: 443,
                authentication: {
                    username: 'admin',
                    password: 'c79161cc6c77341a0a2ccaf879ad9699'
                }
            } as Server,
        }}/>
    </React.StrictMode>,
)
