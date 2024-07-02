import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {dashboardRoutes} from "app";
import {DashboardPage} from "./dashboard.tsx";

export const index = createBrowserRouter([
    {
        ...dashboardRoutes,
        path: '/dashboard',
        element: <DashboardPage/>
    },
]);

export function Router() {
    return <RouterProvider router={index}/>
}
