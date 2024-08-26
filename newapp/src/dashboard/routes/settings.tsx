import {Outlet} from "react-router-dom";
import SettingsPage from "../pages/settings/SettingsPage.tsx";
import {GeneralSettingsPage} from "../pages/settings/GeneralSettingsPage.tsx";

export const SettingsRoutes = {
    path: "settings",
    element: <SettingsPage/>,
    handle: {
        breadcrumb: 'Users & Roles'
    },
    children: [
        {
            path: "general",
            element: <GeneralSettingsPage/>,
            handle: {
                tab: 'general',
                breadcrumb: 'General'
            }
        },
        {
            path: "resource",
            element: <Outlet/>,
            handle: {
                tab: 'resource',
                breadcrumb: 'Resource'
            }
        },
        {
            path: "nano",
            element: <Outlet/>,
            handle: {
                tab: 'nano',
                breadcrumb: 'Nano'
            }
        },
        {
            path: "custom-attributes",
            element: <Outlet/>,
            handle: {
                tab: 'custom-attributes',
                breadcrumb: 'Custom Attributes'
            }
        },
        {
            path: "extensions",
            element: <Outlet/>,
            handle: {
                tab: 'extensions',
                breadcrumb: 'Extensions'
            }
        }
    ]
}
