import {Dataset, FunctionsTwoTone, Group, Home, Monitor, Pages, Settings, Storage} from "@mui/icons-material";
import {ReactNode} from "react";
import {ResourcePageSideBar} from "../components/ResourcePageSideBar";

export interface MenuItem {
    title: string;
    icon?: ReactNode;
    hidden?: boolean;
    key?: string;
    path?: string;
    secondSideBar?: () => ReactNode;
    grow?: boolean;
    delimiter?: boolean;
    children?: MenuItem[]
}

export const menuItems: MenuItem[] = [
    {
        title: 'Home',
        path: '/dashboard',
        icon: <Home/>
    },
    {
        title: 'Builder',
        path: '/dashboard/resources',
        secondSideBar: () => <ResourcePageSideBar/>,
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
            // {
            //     title: 'Library',
            //     path: '/dashboard/library',
            //     icon: <LibraryBooks/>
            // },
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
                title: 'Roles',
                path: '/dashboard/users-and-roles/roles',
                icon: <Group/>,
            },
        ]
    },
    {
        title: 'Storage',
        path: '/dashboard/storage',
        icon: <Storage/>
    },
    {
        title: 'Monitoring',
        path: '/dashboard/monitoring',
        icon: <Monitor/>,
    },
    {
        title: 'Custom Pages',
        path: '/dashboard/pages',
        hidden: true,
        key: 'custom-pages',
        icon: <Pages/>,
        children: []
    },
    {
        title: 'Settings',
        path: '/dashboard/settings',
        icon: <Settings/>,
    }
]


