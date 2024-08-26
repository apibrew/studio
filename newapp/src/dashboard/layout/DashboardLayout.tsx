import './root.css'
import './dark.scss'
import {AsideBar} from "./AsideBar.tsx";
import {useActiveMenuItem} from "../hooks/active-menu-item.tsx";
import {Outlet} from "react-router-dom";
import Button from "@mui/material/Button";
import {
    ArrowForward,
    ArrowForwardIos,
    ChatOutlined,
    HelpOutline,
    Home,
    NotificationsNoneOutlined
} from "@mui/icons-material";

export function DashboardLayout() {
    const activeItem = useActiveMenuItem()
    const isDarkModeEnabled = false

    return <>
        <div className={`maindiv ${isDarkModeEnabled ? 'dark' : ''}`}>
            <AsideBar activeItem={activeItem}/>
            {activeItem?.secondSideBar && activeItem.secondSideBar()}
            <div className="main">
                <div className="main-header flex-center">
                    <div className="mh-div1 flex-center">
                        <Button variant='text'>
                            <Home/>
                        </Button>
                        <ArrowForwardIos/>
                        <button className="mh-text">Dashboard</button>
                        <ArrowForwardIos/>
                        <span className="mh-text">Overview</span>
                    </div>
                    <div className="mh-div2 flex-center">
                        <Button variant='text'>
                            <NotificationsNoneOutlined/> Notifications
                        </Button>
                        <Button variant='text'>
                            <ChatOutlined/> Feedback
                        </Button>
                        <Button variant='text'>
                            <HelpOutline/> Help
                        </Button>
                    </div>
                </div>
                <Outlet/>
            </div>
        </div>
    </>

}
