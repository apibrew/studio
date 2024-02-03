import {RouteObject} from "react-router/dist/lib/context";
import {IndexPage} from "./pages/IndexPage";
import React from "react";
import {LoginPage} from "./pages/LoginPage";
import {PostLoginPage} from "./pages/PostLoginPage";
import {InnerPage} from "./pages/Inner";
import {ListInstance} from "./pages/instance/ListInstance";
import {Goto} from "./pages/instance/Goto";
import {Outlet} from "react-router-dom";

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
                        element: <Goto/>
                    },
                ]
            }
        ]
    }
];
