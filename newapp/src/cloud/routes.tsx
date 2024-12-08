import {RouteObject} from "react-router/dist/lib/context";
import {IndexPage} from "./pages/IndexPage";

import {ProjectsPage} from "./pages/ProjectsPage.tsx";
import {BillingPage} from "./pages/BillingPage.tsx";
import {InvoicesPage} from "./pages/InvoicePage.tsx";
import {AccountPage} from "./pages/AccountPage.tsx";
import {PaymentPage} from "./pages/PaymentPage.tsx";
import {Goto} from "./pages/Goto.tsx";

export const cloudRoutes: RouteObject[] = [
    {
        path: '',
        element: <IndexPage/>
    },
    {
        path: 'projects',
        element: <ProjectsPage/>,
        children: [
            {
                path: 'goto/:id',
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
    },
    {
        path: 'payment/:id',
        element: <PaymentPage/>
    }
];
