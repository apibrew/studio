import {createBrowserRouter, RouterProvider} from "react-router-dom";
import IndexPage from "../pages/IndexPage";
import DashboardIndexPage from "../pages/dashboard/index/IndexPage";
import {DashboardPage} from "../pages/dashboard";
import LogoutPage from "../pages/logout/LogoutPage";
import ResourcesPage from "../pages/dashboard/resources/ResourcesPage";
import UserProfilePage from "../pages/dashboard/user-profile/UserProfilePage";
import {ConnectionsPage} from "../pages/connections/ConnectionsPage";
import {TestPage} from "../pages/test/TestPage";
import {UserAndRolesRoutes} from "./user-and-roles";
import {SettingsRoutes} from "./settings";
import {MonitoringRoutes} from "./monitoring";
import CloudIndex from '../cloud/index.tsx'
import {cloudRoutes} from "../cloud/routes";
import TemplatesPage from "../pages/dashboard/templates/IndexPage";
import {NanoRoutes} from "./nano";
import ResourcePage from "../pages/dashboard/builder/ResourcePage";
import {AIAssistantPage} from "../pages/dashboard/ai-assistant/AIAssistantPage";
import {FlowRoutes} from "./flows";
import BuilderPage from "../pages/dashboard/builder/BuilderPage";
import Library from "../pages/dashboard/library";
import {NanoModuleRoutes} from "./nano-module";
import {FlowControlsRoutes} from "./flow-controls";

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
        path: "/test",
        element: <TestPage/>,
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
                path: "builder",
                element: <BuilderPage/>,
                handle: {
                    breadcrumb: 'Resources'
                }
            },
            {
                path: "builder/:namespace/:resource",
                element: <ResourcePage/>,
                handle: {
                    breadcrumb: ':namespace / :resource'
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
                path: "resources",
                element: <ResourcesPage/>,
                handle: {
                    breadcrumb: 'Resources'
                }
            },
            {
                path: "library",
                element: <Library/>,
                handle: {
                    breadcrumb: 'Library'
                }
            },
            NanoRoutes,
            NanoModuleRoutes,
            UserAndRolesRoutes,
            SettingsRoutes,
            MonitoringRoutes,
            FlowRoutes,
            FlowControlsRoutes,
            {
                path: "user-profile",
                element: <UserProfilePage/>,
                handle: {
                    breadcrumb: 'Users Profile'
                }
            },
            {
                path: "ai-assistant",
                element: <AIAssistantPage/>,
                handle: {
                    breadcrumb: 'AI Assistant'
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
