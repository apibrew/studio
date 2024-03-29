import {createBrowserRouter, RouterProvider} from "react-router-dom";
import IndexPage from "../pages/IndexPage";
import DashboardIndexPage from "../pages/dashboard/index/IndexPage";
import {DashboardPage} from "../pages/dashboard";
import LogoutPage from "../pages/logout/LogoutPage";
import ResourcesPage from "../pages/dashboard/resources/ResourcesPage";
import UserProfilePage from "../pages/dashboard/user-profile/UserProfilePage";
import {ConnectionsPage} from "../pages/connections/ConnectionsPage";
import TestPage from "../pages/dashboard/test/TestPage";
import {UserAndRolesRoutes} from "./user-and-roles";
import {SettingsRoutes} from "./settings";
import {MonitoringRoutes} from "./monitoring";
import CloudIndex from '../cloud'
import {cloudRoutes} from "../cloud/routes";
import TemplatesPage from "../pages/dashboard/templates/IndexPage";
import {NanoRoutes} from "./nano";
import OldResourcesPage from "../pages/dashboard/resources/OldResourcesPage";
import ResourcePage from "../pages/dashboard/resources/ResourcePage";

export const index = createBrowserRouter([
    {
        path: "/",
        element: <IndexPage/>,
    },
    {
        path: "/connections",
        element: <ConnectionsPage/>,
    },
    {
        path: "/logout",
        element: <LogoutPage/>,
    },
    {
        path: "/cloud",
        element: <CloudIndex/>,
        children: cloudRoutes,
    },
    {
        path: "/:connectionName/dashboard",
        element: <DashboardPage/>,
        handle: {
            breadcrumb: 'Dashboard'
        },
        children: [
            {
                path: "",
                element: <DashboardIndexPage/>,
                handle: {
                    breadcrumb: 'Home'
                },
            },
            {
                path: "resources",
                element: <ResourcesPage/>,
                handle: {
                    breadcrumb: 'Resources'
                }
            },
            {
                path: "resources/:namespace/:resource",
                element: <ResourcePage/>,
                handle: {
                    breadcrumb: ':namespace / :resource'
                }
            },
            {
                path: "resources-old/:namespace/:resource",
                element: <OldResourcesPage/>,
                handle: {
                    breadcrumb: 'Resources'
                }
            },
            NanoRoutes,
            UserAndRolesRoutes,
            SettingsRoutes,
            MonitoringRoutes,
            {
                path: "user-profile",
                element: <UserProfilePage/>,
                handle: {
                    breadcrumb: 'Users Profile'
                }
            },
            {
                path: "templates",
                element: <TemplatesPage/>,
                handle: {
                    breadcrumb: 'Templates'
                }
            },
            {
                path: "test",
                element: <TestPage/>,
                handle: {
                    breadcrumb: 'Test Page 2'
                }
            }
        ]
    },
]);

export function Router() {
    return <RouterProvider router={index}/>
}