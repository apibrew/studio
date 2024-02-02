import {NanoPage} from "../pages/dashboard/nano";
import NanoList from "../pages/dashboard/nano/NanoList";
import {NanoNew} from "../pages/dashboard/nano/NanoNew";
import {NanoPlayGround} from "../pages/dashboard/nano/NanoPlayGround";
import {NanoEdit} from "../pages/dashboard/nano/NanoEdit";
import * as React from "react";

export const NanoRoutes = {
    path: "nano",
    element: <NanoPage/>,
    handle: {
        breadcrumb: 'Nano Code'
    },
    children: [
        {
            path: "",
            element: <NanoList/>,
            handle: {
                breadcrumb: 'List'
            },
        },
        {
            path: "new",
            element: <NanoNew/>,
            handle: {
                breadcrumb: 'New'
            }
        },
        {
            path: "playground",
            element: <NanoPlayGround/>,
            handle: {
                breadcrumb: 'PlayGround'
            }
        },
        {
            path: ":id",
            element: <NanoEdit/>,
            handle: {
                breadcrumb: 'Edit'
            }
        },
    ]
}