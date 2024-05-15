import {
    Dataset,
    FunctionsTwoTone,
    Group,
    Handyman,
    Home,
    LibraryBooks,
    Logout,
    Monitor,
    Person,
    SettingsEthernet
} from "@mui/icons-material";
import {ConnectionProvider} from "@apibrew/react";
import {ResourceSelectorPanel} from "./components/ResourceSelectorPanel";
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
    {
        title: 'Developer Tools',
        icon: <FunctionsTwoTone/>,
        children: [
            {
                title: 'Nano Code',
                path: '/dashboard/nano-code',
                icon: <FunctionsTwoTone/>
            },
            {
                title: 'Nano Module',
                path: '/dashboard/nano-module',
                icon: <FunctionsTwoTone/>
            },
            {
                title: 'Nano Action',
                path: '/dashboard/nano-action',
                icon: <FunctionsTwoTone/>
            },
            {
                title: 'Nano Cron Job',
                path: '/dashboard/nano-cron-job',
                icon: <FunctionsTwoTone/>
            },
            {
                title: 'Nano Job',
                path: '/dashboard/nano-job',
                icon: <FunctionsTwoTone/>
            },
            {
                title: 'Nano Playground',
                path: '/dashboard/nano-playground',
                icon: <FunctionsTwoTone/>
            },
            {
                title: 'Library',
                path: '/dashboard/library',
                icon: <LibraryBooks/>
            },
        ]
    },
    {
        title: 'Users & Roles',
        path: '/dashboard/users-and-roles',
        icon: <Group/>,
        children: [
            {
                title: 'Users',
                path: '/dashboard/users-and-roles/users',
                icon: <Group/>,
            },
            {
                title: 'Groups',
                path: '/dashboard/users-and-roles/roles',
                icon: <Group/>,
            },
        ]
    },
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
