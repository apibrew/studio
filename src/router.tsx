import {createBrowserRouter, RouterProvider} from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import DashboardIndexPage from "./pages/dashboard/index/IndexPage";
import {DashboardPage} from "./pages/dashboard";
import * as React from "react";
import LogoutPage from "./pages/logout/LogoutPage";
import ResourcesPage from "./pages/dashboard/resources/ResourcesPage";
import NanoList from "./pages/dashboard/nano/NanoList";
import UsersAndRolesPage from "./pages/dashboard/users-and-roles/UsersAndRolesPage";
import SettingsPage from "./pages/dashboard/settings/SettingsPage";
import UserProfilePage from "./pages/dashboard/user-profile/UserProfilePage";
import TestPage from "./pages/TestPage";
import {ConnectionsPage} from "./pages/connections/ConnectionsPage";
import {NanoEdit} from "./pages/dashboard/nano/NanoEdit";
import {NanoNew} from "./pages/dashboard/nano/NanoNew";
import {NanoPage} from "./pages/dashboard/nano";
import {NanoPlayGround} from "./pages/dashboard/nano/NanoPlayGround";
import {UsersPage} from "./pages/dashboard/users-and-roles/users/UsersPage";
import NewUser from "./pages/dashboard/users-and-roles/users/New";
import EditUser from "./pages/dashboard/users-and-roles/users/Edit";
import {ListUser} from "./pages/dashboard/users-and-roles/users/List";

const dashboardChildren = [
    {
        path: "",
        element: <DashboardIndexPage/>,
        handle: {
            breadcrumb: 'Home'
        },
    },
    {
        path: "resources",
        element: <ResourcesPage/>,
        handle: {
            breadcrumb: 'Resources'
        }
    },
    {
        path: "resources/:namespace/:resource",
        element: <ResourcesPage/>,
        handle: {
            breadcrumb: 'Resources'
        }
    },
    {
        path: "nano",
        element: <NanoPage/>,
        handle: {
            breadcrumb: 'Nano Code'
        },
        children: [
            {
                path: "",
                element: <NanoList/>,
                handle: {
                    breadcrumb: 'List'
                },
            },
            {
                path: "new",
                element: <NanoNew/>,
                handle: {
                    breadcrumb: 'New'
                }
            },
            {
                path: "playground",
                element: <NanoPlayGround/>,
                handle: {
                    breadcrumb: 'PlayGround'
                }
            },
            {
                path: ":id",
                element: <NanoEdit/>,
                handle: {
                    breadcrumb: 'Edit'
                }
            },
        ]
    },
    {
        path: "users-and-roles",
        element: <UsersAndRolesPage/>,
        handle: {
            breadcrumb: 'Users & Roles'
        },
        children: [
            {
                path: "users",
                element: <UsersPage/>,
                handle: {
                    breadcrumb: 'Users'
                },
                children: [
                    {
                        path: "",
                        element: <ListUser/>,
                        handle: {
                            breadcrumb: 'List'
                        }
                    },
                    {
                        path: "new",
                        element: <NewUser/>,
                        handle: {
                            breadcrumb: 'New'
                        }
                    },
                    {
                        path: ":id",
                        element: <EditUser/>,
                        handle: {
                            breadcrumb: 'Edit'
                        }
                    }
                ]
            },
            {
                path: "roles",
                element: <UsersAndRolesPage/>,
                handle: {
                    breadcrumb: 'Roles'
                }
            }
        ]
    },
    {
        path: "settings",
        element: <SettingsPage/>,
        handle: {
            breadcrumb: 'Users & Roles'
        }
    },
    {
        path: "user-profile",
        element: <UserProfilePage/>,
        handle: {
            breadcrumb: 'Users Profile'
        }
    },
    {
        path: "test",
        element: <TestPage/>,
        handle: {
            breadcrumb: 'Test Page 2'
        }
    }
]


export const router = createBrowserRouter([
    {
        path: "/",
        element: <IndexPage/>,
    },
    {
        path: "/connections",
        element: <ConnectionsPage/>,
    },
    {
        path: "/logout",
        element: <LogoutPage/>,
    },
    {
        path: "/dashboard",
        element: <DashboardPage/>,
        handle: {
            breadcrumb: 'Dashboard'
        },
        children: dashboardChildren
    },
    {
        path: "/:connectionName/dashboard",
        element: <DashboardPage/>,
        handle: {
            breadcrumb: 'Dashboard'
        },
        children: dashboardChildren
    },
]);

export function Router() {
    return <RouterProvider router={router}/>
}