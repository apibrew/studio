import {DashboardPage} from "../pages/dashboard";
import DashboardIndexPage from "../pages/dashboard/index/IndexPage.tsx";
import BuilderPage from "../pages/dashboard/builder/BuilderPage.tsx";
import ResourcePage from "../pages/dashboard/builder/ResourcePage.tsx";
import ResourcesPage from "../pages/dashboard/resources/ResourcesPage.tsx";
import Library from "../pages/dashboard/library";
import {UserAndRolesRoutes} from "./user-and-roles.tsx";
import {SettingsRoutes} from "./settings.tsx";
import {MonitoringRoutes} from "./monitoring.tsx";
import {FlowRoutes} from "./flows.tsx";
import {FlowControlsRoutes} from "./flow-controls.tsx";
import {NanoPlayGround} from "../pages/dashboard/nano/NanoPlayGround.tsx";
import UserProfilePage from "../pages/dashboard/user-profile/UserProfilePage.tsx";
import {AIAssistantPage} from "../pages/dashboard/ai-assistant/AIAssistantPage.tsx";
import TemplatesPage from "../pages/dashboard/templates/IndexPage.tsx";
import {TestPage} from "../pages/test/TestPage.tsx";
import {listPageTypes} from "core";
import {createElement} from "react";

const pageRoutes = listPageTypes().map(pageType => {
    return {
        path: pageType.routerPath + '/*',
        element: createElement(pageType.component),
        handle: {
            breadcrumb: pageType.breadcrumb
        },
    }
})

export const dashboardRoutes = {
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
        ...pageRoutes,
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
        UserAndRolesRoutes,
        SettingsRoutes,
        MonitoringRoutes,
        FlowRoutes,
        FlowControlsRoutes,
        {
            path: 'nano-playground',
            element: <NanoPlayGround/>,
            handle: {
                breadcrumb: 'Nano Playground'
            }
        },
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
};
