import {createBrowserRouter, RouterProvider} from "react-router-dom";
import IndexPage from "../pages/IndexPage";
import LogoutPage from "../pages/logout/LogoutPage";
import {ConnectionsPage} from "../pages/connections/ConnectionsPage";
import {TestPage} from "../pages/test/TestPage";
import CloudIndex from '../cloud'
import {cloudRoutes} from "../cloud/routes";
import {dashboardRoutes} from "./dashboard-routes";

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
    dashboardRoutes,
]);

export function Router() {
    return <RouterProvider router={index}/>
}
