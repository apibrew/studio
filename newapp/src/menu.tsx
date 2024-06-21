import {
    Dataset,
    FunctionsTwoTone,
    Group,
    Handyman,
    Home,
    LibraryBooks,
    Monitor,
    PsychologyAlt,
    SettingsEthernet,
    Storage
} from "@mui/icons-material";
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
        icon: <Dataset/>
    },
    // {
    //     title: 'Action Pages',
    //     path: '/dashboard/action-pages',
    //     icon: <Commit/>
    // },
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
        // children: [
        //     {
        //         title: 'Users',
        //         path: '/dashboard/users-and-roles/users',
        //         icon: <Group/>,
        //     },
        //     {
        //         title: 'Groups',
        //         path: '/dashboard/users-and-roles/roles',
        //         icon: <Group/>,
        //     },
        // ]
    },
    {
        title: 'Storage',
        path: '/dashboard/storage',
        icon: <Storage/>
    },
    {
        title: 'Ask AI',
        path: '/dashboard/ask-ai',
        icon: <PsychologyAlt/>
    },
    {
        title: 'Monitoring',
        path: '/dashboard/monitoring',
        icon: <Monitor/>
    },
    {
        title: 'Other Instances',
        path: '/connections',
        icon: <SettingsEthernet/>,
        conditional: (cp) => Boolean(cp.allowManageConnections)
    }
]
