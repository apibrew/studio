import {HomePage} from "./pages/index/HomePage.tsx";
import {listPageTypes} from "core";
import {createElement} from "react";
import {ThemePage} from "./pages/ThemePage.tsx";
import {DashboardPage} from "./index.tsx";
import ResourcesPage from "./pages/resource/ResourcesPage.tsx";

const pageRoutes = listPageTypes().map(pageType => {
    return {
        path: pageType.routerPath + '/*',
        element: createElement(pageType.component),
        handle: {
            breadcrumb: pageType.breadcrumb
        },
    }
})
export const dashboardRotes = [
    {
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
        ]
    },
]
