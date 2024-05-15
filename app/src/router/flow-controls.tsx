import {FlowControlPage} from "../pages/dashboard/flow-controls";
import {FlowControlTypesList} from "../pages/dashboard/flow-controls/FlowControlTypesList";


export const FlowControlsRoutes = {
    path: "flow-control-types",
    element: <FlowControlPage/>,
    handle: {
        breadcrumb: 'Flow Controls'
    },
    children: [
        {
            path: "",
            element: <FlowControlTypesList/>,
            handle: {
                breadcrumb: 'List'
            },
        },
    ]
}
