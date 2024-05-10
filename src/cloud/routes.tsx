import {RouteObject} from "react-router/dist/lib/context";
import {IndexPage} from "./pages/IndexPage";

import {LoginPage} from "./pages/LoginPage";
import {PostLoginPage} from "./pages/PostLoginPage";
import {InnerPage} from "./pages/Inner";
import {ListInstance} from "./pages/instance/ListInstance";
import {Goto} from "./pages/instance/Goto";
import {Outlet} from "react-router-dom";
import {RegisterPage} from "./pages/RegisterPage";
import {GithubSsoPage} from "./pages/GithubSso";

export const cloudRoutes: RouteObject[] = [
    {
        path: '',
        element: <IndexPage/>
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
        path: 'post-login',
        element: <PostLoginPage/>
    },
    {
        path: '',
        element: <InnerPage/>,
        children: [
            {
                path: 'instances',
                element: <Outlet/>,
                handle: {
                    tab: 'instances'
                },
                children: [
                    {
                        path: '',
                        element: <ListInstance/>
                    },
                    {
                        path: ':id/goto',
                        element: <Goto/>,
                        handle: {
                            tab: 'goto'
                        }
                    },
                ]
            }
        ]
    }
];
