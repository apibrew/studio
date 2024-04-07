import {Outlet} from "react-router-dom";
import {DiagramJsFlow} from "./DiagramJsFlow";

export const ExperimentsRoutes = {
    path: "experiments",
    element: <Outlet/>,
    handle: {
        breadcrumb: 'Experiments'
    },
    children: [
        {
            path: "diagram-flow",
            element: <DiagramJsFlow/>,
            handle: {
                breadcrumb: 'Diagram-flow'
            },
        },
    ]
}