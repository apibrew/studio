import React from 'react'
import ReactDOM from 'react-dom/client'
import {MenuItem, menuItems, StandaloneApp} from "app";
import {Calculate, InventorySharp, Search, Task} from '@mui/icons-material'
import {localConfig, prodConfig} from "./config.ts";
import {Router} from "./router.tsx";

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
        <StandaloneApp
            connection={{
                name: 'analytics',
                serverConfig: prodConfig,
            }}>
            <Router/>
        </StandaloneApp>
    </React.StrictMode>,
)
