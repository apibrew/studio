import {createBrowserRouter, RouterProvider} from "react-router-dom";
import CloudIndex from './cloud/index'
import {cloudRoutes} from "./cloud/routes";
import {dashboardRote} from "./dashboard/routes";
import {LoginPage} from "./pages/LoginPage.tsx";
import {RegisterPage} from "./pages/RegisterPage.tsx";
import {GithubSsoPage} from "./pages/GithubSso.tsx";
import {NotFoundPage} from "./pages/NotFoundPage.tsx";
import Index from "./pages/Index.tsx";
import {Goto} from "./cloud/pages/Goto.tsx";
import {GoogleSsoPage} from "./pages/GoogleSso.tsx";

export const index = createBrowserRouter([
    {
        path: "/",
        element: <Index/>,
    },
    {
        path: "/cloud",
        element: <CloudIndex/>,
        children: cloudRoutes,
    },
    {
        path: 'goto/:id',
        element: <Goto/>,
        handle: {
            tab: 'goto'
        }
    },
    {
        path: 'login',
        element: <LoginPage/>
    },
    {
        path: 'register',
        element: <RegisterPage/>
    },
    {
        path: 'github-sso',
        element: <GithubSsoPage/>
    },
    {
        path: 'google-sso',
        element: <GoogleSsoPage/>
    },
    dashboardRote,
    // 404
    {
        path: '*',
        element: <NotFoundPage/>
    },
]);

export function Router() {
    return <RouterProvider router={index}/>
}
