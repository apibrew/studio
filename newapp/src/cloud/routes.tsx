import {RouteObject} from "react-router/dist/lib/context";
import {IndexPage} from "./pages/IndexPage";

import {ProjectsPage} from "./pages/ProjectsPage.tsx";
import {Goto} from "./pages/Goto";
import {Outlet} from "react-router-dom";
import {BillingPage} from "./pages/BillingPage.tsx";
import {InvoicesPage} from "./pages/InvoicePage.tsx";
import {AccountPage} from "./pages/AccountPage.tsx";

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
                element: <ProjectsPage/>
            },
            {
                path: ':id/goto',
                element: <Goto/>,
                handle: {
                    tab: 'goto'
                }
            },
        ]
    },
    {
        path: 'billing',
        element: <BillingPage/>,
    },
    {
        path: 'invoices',
        element: <InvoicesPage/>,
    },
    {
        path: 'account',
        element: <AccountPage/>,
    }
];
