import React from "react";
import {Dataset, FunctionsTwoTone, Group, Home, Logout, Person, Settings} from "@mui/icons-material";
import {ResourceSelectorPanel} from "./components/ResourceSelectorPanel";

export interface MenuItem {
    title: string;
    icon?: React.ReactNode;
    path: string;
    secondSideBar?: () => React.ReactNode;
    grow?: boolean;
    delimiter?: boolean;
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
        title: 'Settings',
        path: '/dashboard/settings',
        icon: <Settings/>
    },
    {
        title: 'User Profile',
        path: '/dashboard/user-profile',
        icon: <Person/>
    },
    {
        title: 'Logout',
        path: '/logout',
        icon: <Logout/>
    }
]
