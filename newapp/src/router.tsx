import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ConnectionsPage} from "./pages/connections/ConnectionsPage";
import CloudIndex from './cloud/index.tsx'
import {cloudRoutes} from "./cloud/routes";
import {dashboardRotes} from "./dashboard/routes.tsx";
import IndexPage from "./pages/IndexPage.tsx";

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
        path: "/cloud",
        element: <CloudIndex/>,
        children: cloudRoutes,
    },
    ...dashboardRotes,
]);

export function Router() {
    return <RouterProvider router={index}/>
}
