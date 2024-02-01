import {Tab, Tabs} from "@mui/material";
import {Outlet, useNavigate} from "react-router-dom";
import Container from "@mui/material/Container";
import React from "react";

export default function UsersAndRolesPage() {
    const navigate = useNavigate()

    return (<>
        <Container maxWidth='xl'>
            <Tabs
                value={''}
                onChange={(e, tab) => {
                    navigate('users')
                }}
                aria-label="wrapped label tabs example"
            >
                <Tab value="users"
                     label="Users"/>
                <Tab value="roles"
                     label="Roles"/>
            </Tabs>
        </Container>

        <Outlet/>
    </>)
}