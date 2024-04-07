import {FlowPage} from "../pages/dashboard/flows";
import {FlowList} from "../pages/dashboard/flows/FlowList";
import {FlowNew} from "../pages/dashboard/flows/FlowNew";
import React from "react";
import {FlowEdit} from "../pages/dashboard/flows/FlowEdit";

export const FlowRoutes = {
    path: "flows",
    element: <FlowPage/>,
    handle: {
        breadcrumb: 'Flows'
    },
    children: [
        {
            path: "",
            element: <FlowList/>,
            handle: {
                breadcrumb: 'List'
            },
        },
        {
            path: "new",
            element: <FlowNew/>,
            handle: {
                breadcrumb: 'New'
            }
        },
        {
            path: ":id",
            element: <FlowEdit/>,
            handle: {
                breadcrumb: 'Edit'
            }
        },
    ]
}