import {RouteObject} from "react-router/dist/lib/context";
import {IndexPage} from "./pages/IndexPage";

import {ListInstance} from "./pages/instance/ListInstance";
import {Goto} from "./pages/instance/Goto";
import {Outlet} from "react-router-dom";

export const cloudRoutes: RouteObject[] = [
    {
        path: '',
        element: <IndexPage/>
    },
    {
        path: 'projects',
        element: <Outlet/>,
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
];
