import {FlowControlPage} from "../pages/dashboard/flow-controls";
import {FlowControlList} from "../pages/dashboard/flow-controls/FlowControlList";
import React from "react";

export const FlowControlsRoutes = {
    path: "flow-controls",
    element: <FlowControlPage/>,
    handle: {
        breadcrumb: 'Flow Controls'
    },
    children: [
        {
            path: "",
            element: <FlowControlList/>,
            handle: {
                breadcrumb: 'List'
            },
        },
    ]
}
