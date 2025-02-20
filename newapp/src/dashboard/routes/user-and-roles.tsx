import UsersAndRolesPage from "../pages/users-and-roles/UsersAndRolesPage";
import {UsersAndRolesPageDefault} from "../pages/users-and-roles/Default";
import {Outlet} from "react-router-dom";
import {ListUser} from "../pages/users-and-roles/users/List";
import NewUser from "../pages/users-and-roles/users/New";
import EditUser from "../pages/users-and-roles/users/Edit";
import {ListRole} from "../pages/users-and-roles/roles/List";
import NewRole from "../pages/users-and-roles/roles/New";
import EditRole from "../pages/users-and-roles/roles/Edit.tsx";

export const UserAndRolesRoutes = {
    path: "users-and-roles",
    element: <UsersAndRolesPage/>,
    handle: {
        breadcrumb: 'Users & Roles'
    },
    children: [
        {
            path: '',
            element: <UsersAndRolesPageDefault/>
        },
        {
            path: "users",
            element: <Outlet/>,
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
            element: <Outlet/>,
            handle: {
                breadcrumb: 'Roles'
            },
            children: [
                {
                    path: "",
                    element: <ListRole/>,
                    handle: {
                        breadcrumb: 'List'
                    }
                },
                {
                    path: "new",
                    element: <NewRole/>,
                    handle: {
                        breadcrumb: 'New'
                    }
                },
                {
                    path: ":id",
                    element: <EditRole/>,
                    handle: {
                        breadcrumb: 'Edit'
                    }
                }
            ]
        },
    ]
}
