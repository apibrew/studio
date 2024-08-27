import {Home, Money, Receipt,} from "@mui/icons-material";
import {ConnectionProvider} from "@apibrew/react";
import {ReactNode} from "react";

export interface MenuItem {
    title: string;
    icon?: ReactNode;
    path?: string;
    secondSideBar?: () => ReactNode;
    grow?: boolean;
    delimiter?: boolean;
    children?: MenuItem[]
    conditional?: (connectionProvider: ConnectionProvider) => boolean
}

export const menuItems: MenuItem[] = [
    {
        title: 'Projects',
        path: '/cloud/projects',
        icon: <Home/>
    },
    {
        title: 'Invoices',
        path: '/cloud/invoices',
        icon: <Receipt/>,
    },
    {
        title: 'Billing',
        path: '/cloud/billing',
        icon: <Money/>,
    }
]
