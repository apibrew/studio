import {DashboardLayout} from "app";
import {Outlet} from 'react-router-dom';


export function DashboardPage() {
    return <>
        <DashboardLayout>
            <Outlet/>
        </DashboardLayout>
    </>
}
