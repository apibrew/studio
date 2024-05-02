import {NanoNew} from "../pages/dashboard/nano-module/NanoNew";
import {NanoEdit} from "../pages/dashboard/nano-module/NanoEdit";
import {NanoPage} from "../pages/dashboard/nano-module/";
import {NanoList} from "../pages/dashboard/nano-module/NanoList";

export const NanoModuleRoutes = {
    path: "nano-module",
    element: <NanoPage/>,
    handle: {
        breadcrumb: 'Nano Module'
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
            path: ":id",
            element: <NanoEdit/>,
            handle: {
                breadcrumb: 'Edit'
            }
        },
    ]
}
