import {createBrowserRouter, RouterProvider} from "react-router-dom";
import CloudIndex from './cloud/index'
import {cloudRoutes} from "./cloud/routes";
import {dashboardRote} from "./dashboard/routes";
import Redirect from "./cloud/Redirect.tsx";

export const index = createBrowserRouter([
    {
        path: "/",
        element: <Redirect/>,
    },
    {
        path: "/cloud",
        element: <CloudIndex/>,
        children: cloudRoutes,
    },
    dashboardRote,
]);

export function Router() {
    return <RouterProvider router={index}/>
}
