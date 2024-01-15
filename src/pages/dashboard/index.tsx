import React from "react";
import {DashboardLayout} from "../../layout/DashboardLayout";
import {Outlet} from "react-router-dom";


export function DashboardPage() {
    return <>
        <DashboardLayout>
            <Outlet/>
        </DashboardLayout>
    </>
}
