import React from "react";
import {
    Dataset,
    FunctionsTwoTone,
    Group,
    Home,
    Logout,
    Monitor,
    Person,
    Settings,
    SettingsEthernet
} from "@mui/icons-material";
import {ResourceSelectorPanel} from "./components/ResourceSelectorPanel";
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
        secondSideBar: () => <ResourceSelectorPanel/>,
        icon: <Dataset/>
    },
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
    {
        title: '',
        path: '',
        grow: true,
        delimiter: true,
    },
    {
        title: 'Monitoring',
        path: '/dashboard/monitoring',
        icon: <Monitor/>
    },
    {
        title: 'Settings',
        path: '/dashboard/settings',
        icon: <Settings/>
    },
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
        title: '',
        path: '',
        grow: true,
        delimiter: true,
    },
    {
        title: 'Connections',
        path: '/connections',
        icon: <SettingsEthernet/>,
        conditional: (cp) => Boolean(cp.allowManageConnections)
    }
]
