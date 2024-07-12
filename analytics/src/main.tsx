import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from "../lib/App.tsx";
import {MenuItem, menuItems} from "app";
import {Calculate, InventorySharp, Search, Task} from '@mui/icons-material'
import {routes} from "./router.tsx";
import {localConfig, prodConfig} from "./config.ts";

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

menuItems.splice(1, 0, {
    icon: <Calculate/>,
    path: '/dashboard/calculator',
    title: 'Calculator',
} as MenuItem)

menuItems.splice(1, 0, {
    icon: <InventorySharp/>,
    path: '/dashboard/portfolio-analysis',
    title: 'Portfolio Analysis',
} as MenuItem)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App
            routes={routes}
            connection={{
                name: 'analytics',
                serverConfig: prodConfig,
            }}/>
    </React.StrictMode>,
)
