import React from "react";
import {
    Assistant,
    Dataset,
    FunctionsTwoTone,
    Group,
    Home,
    Logout,
    Monitor, NetworkCell,
    Person,
    SettingsEthernet
} from "@mui/icons-material";
import {ConnectionProvider} from "./connection-provider";

export interface MenuItem {
    title: string;
    icon?: React.ReactNode;
    path: string;
    secondSideBar?: () => React.ReactNode;
    grow?: boolean;
    delimiter?: boolean;
    conditional?: (connectionProvider: ConnectionProvider) => boolean
}

export const menuItems: MenuItem[] = [
    {
        title: 'Home',
        path: '/dashboard',
        icon: <Home/>
    },
    {
        title: 'Resources',
        path: '/dashboard/resources',
        // secondSideBar: () => <ResourceSelectorPanel/>,
        icon: <Dataset/>
    },
    // {
    //     title: 'Designer',
    //     path: '/dashboard/designer',
    //     icon: <DesignServices/>
    // },
    // {
    //     title: 'Flows',
    //     path: '/dashboard/flows',
    //     icon: <NetworkCell/>
    // },
    // {
    //     title: 'AI Assistant',
    //     path: '/dashboard/ai-assistant',
    //     icon: <Assistant/>
    // },
    {
        title: 'Nano Code',
        path: '/dashboard/nano',
        icon: <FunctionsTwoTone/>
    },
    {
        title: 'Users & Roles',
        path: '/dashboard/users-and-roles',
        icon: <Group/>
    },
    // {
    //     title: 'Templates',
    //     path: '/dashboard/templates',
    //     icon: <Pattern/>
    // },
    {
        title: 'delimeter-1',
        path: '',
        grow: true,
        delimiter: true,
    },
    {
        title: 'Monitoring',
        path: '/dashboard/monitoring',
        icon: <Monitor/>
    },
    // {
    //     title: 'Settings',
    //     path: '/dashboard/settings',
    //     icon: <Settings/>
    // },
    {
        title: 'User Profile',
        path: '/dashboard/user-profile',
        icon: <Person/>,
        conditional: (cp) => Boolean(cp.allowUserSwitchConnections)
    },
    {
        title: 'Logout',
        path: '/logout',
        icon: <Logout/>,
        conditional: (cp) => Boolean(cp.allowUserSwitchConnections)
    },
    {
        title: 'delimeter-2',
        path: '',
        grow: true,
        delimiter: true,
    },
    {
        title: 'Other Instances',
        path: '/connections',
        icon: <SettingsEthernet/>,
        conditional: (cp) => Boolean(cp.allowManageConnections)
    }
]
