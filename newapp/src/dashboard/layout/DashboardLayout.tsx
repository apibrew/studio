import './root.css'
import './dark.scss'
import {AsideBar} from "./AsideBar.tsx";
import {useActiveMenuItem} from "../hooks/active-menu-item.tsx";
import {Outlet} from "react-router-dom";
import Button from "@mui/material/Button";
import {ChatOutlined} from "@mui/icons-material";
import {Breadcrumbs} from "../components/Breadcrumbs.tsx";
import {Theme} from "../../cloud/model/account.ts";
import {useCurrentAccount} from "../../context/current-account.tsx";
import {HelpButton} from "../components/help/HelpButton.tsx";

export function DashboardLayout() {
    const {activeItem} = useActiveMenuItem()
    const account = useCurrentAccount()
    let isDarkModeEnabled = account?.theme === Theme.DARK

    if (account?.theme === Theme.SYSTEM && window.matchMedia) {
        isDarkModeEnabled = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    isDarkModeEnabled = false

    return <>
        <div className={`maindiv ${isDarkModeEnabled ? 'dark' : ''}`}>
            <AsideBar/>
            {activeItem?.secondSideBar && activeItem.secondSideBar()}
            <div className="main">
                <div className="main-header flex-center">
                    <Breadcrumbs/>
                    <div className="mh-div2 flex-center">
                        {/*<Button variant='text'>*/}
                        {/*    <NotificationsNoneOutlined/> <span>Notifications</span>*/}
                        {/*</Button>*/}
                        <Button variant='text'>
                            <ChatOutlined/> <span>Feedback</span>
                        </Button>
                        <HelpButton category='general'/>
                    </div>
                </div>
                <Outlet/>
            </div>
        </div>
    </>

}
