import React from "react";
import {Dataset, FunctionsTwoTone, Group, Home, Logout, Person, Settings} from "@mui/icons-material";

export interface MenuItem {
    title: string;
    icon?: React.ReactNode;
    path: string;
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
