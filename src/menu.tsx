import React from "react";
import {
    Dataset,
    FunctionsTwoTone,
    Group,
    Handyman,
    Home,
    Logout,
    Monitor,
    Person,
    SettingsEthernet
} from "@mui/icons-material";
import {ConnectionProvider} from "./connection-provider";
import {ResourceSelectorPanel} from "./components/ResourceSelectorPanel";

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
        title: 'Builder',
        path: '/dashboard/builder',
        icon: <Handyman/>
    },
    {
        title: 'Resources',
        path: '/dashboard/resources',
        secondSideBar: () => <ResourceSelectorPanel/>,
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
