import MonitoringPage from "../pages/dashboard/monitoring/MonitoringPage";
import {AuditPage} from "../pages/dashboard/monitoring/AuditPage";
import {Outlet} from "react-router-dom";
import * as React from "react";
import {LogsPage} from "../pages/dashboard/monitoring/Logs";

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