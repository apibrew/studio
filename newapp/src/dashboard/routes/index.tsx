import {listPageTypes} from "core";
import {createElement} from "react";
import {DashboardPage} from "../index.tsx";
import HomePage from "../pages/index/HomePage.tsx";
import ResourcesPage from "../pages/resource/ResourcesPage.tsx";
import {ThemePage} from "../pages/ThemePage.tsx";
import {NanoPlayGround} from "../pages/nano/NanoPlayGround.tsx";
import UserProfilePage from "../pages/user-profile/UserProfilePage.tsx";
import {UserAndRolesRoutes} from "./user-and-roles.tsx";
import {SettingsRoutes} from "./settings.tsx";
import {MonitoringRoutes} from "./monitoring.tsx";
import {CustomPagesPage} from "../pages/custom-pages/CustomPagesPage.tsx";

const pageRoutes = listPageTypes().map(pageType => {
    return {
        path: pageType.routerPath + '/*',
        element: createElement(pageType.component),
        handle: {
            breadcrumb: pageType.breadcrumb
        },
    }
})

export const dashboardRote = {
    path: "/:connectionName/dashboard",
    element: <DashboardPage/>,
    handle: {
        breadcrumb: 'Dashboard'
    },
    children: [
        {
            path: "",
            element: <HomePage/>,
            handle: {
                breadcrumb: 'Home'
            },
        },
        ...pageRoutes,
        {
            path: "builder/:namespace/:resource",
            element: <ResourcesPage/>,
            handle: {
                breadcrumb: ':namespace / :resource'
            }
        },
        {
            path: "resources/:namespace/:resource",
            element: <ResourcesPage/>,
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
            path: "theme",
            element: <ThemePage/>,
            handle: {
                breadcrumb: 'Theme elements'
            }
        },
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
        UserAndRolesRoutes,
        SettingsRoutes,
        MonitoringRoutes,
        {
            path: 'custom-pages/:route',
            element: <CustomPagesPage/>,
            handle: {
                breadcrumb: 'Custom Pages'
            }
        }
    ]
}
