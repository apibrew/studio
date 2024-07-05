import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from "../lib/App.tsx";
import {Server} from "@apibrew/client/config";
import {MenuItem, menuItems} from "app";
import {Search, Task} from '@mui/icons-material'
import {routes} from "./router.tsx";

menuItems.splice(5, 10)
menuItems.splice(3, 1)
menuItems.splice(0, 2)

menuItems.splice(0, 0, {
    icon: <Search/>,
    path: '/dashboard/visualizations',
    title: 'Visualizations',
} as MenuItem)

menuItems.splice(1, 0, {
    icon: <Task/>,
    path: '/dashboard/task-scheduler',
    title: 'Task Scheduler',
} as MenuItem)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App
            routes={routes}
            connection={{
                name: 'analytics',
                serverConfig: {
                    name: 'analytics',
                    // host: 'https://analytics.tisserv.net',
                    port: 9009,
                    httpPort: 9009,
                    insecure: true,
                    host: 'http://127.0.0.1',
                    authentication: {
                        username: 'admin',
                        password: 'c79161cc6c77341a0a2ccaf879ad9699'
                    }
                } as Server,
            }}/>
    </React.StrictMode>,
)
