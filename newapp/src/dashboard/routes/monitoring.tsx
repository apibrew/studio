import {Outlet} from "react-router-dom";
import MonitoringPage from "../pages/monitoring/MonitoringPage.tsx";
import {AuditPage} from "../pages/monitoring/AuditPage.tsx";
import {LogsPage} from "../pages/monitoring/Logs.tsx";

export const MonitoringRoutes = {
    path: "monitoring",
    element: <MonitoringPage/>,
    handle: {
        breadcrumb: 'Monitoring'
    },
    children: [
        {
            path: "audit",
            element: <AuditPage/>,
            handle: {
                tab: 'audit',
                breadcrumb: 'Audit Logs'
            }
        },
        {
            path: "logs",
            element: <LogsPage/>,
            handle: {
                tab: 'logs',
                breadcrumb: 'Application Logs'
            }
        },
        {
            path: "metrics",
            element: <Outlet/>,
            handle: {
                tab: 'metrics',
                breadcrumb: 'Metrics'
            }
        },
        {
            path: "stats",
            element: <Outlet/>,
            handle: {
                tab: 'stats',
                breadcrumb: 'Stats'
            }
        }
    ]
}
