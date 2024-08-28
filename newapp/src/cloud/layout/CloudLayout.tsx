import './root.css'
import './dark.scss'
import {AsideBar} from "./AsideBar.tsx";
import {useActiveMenuItem} from "../hooks/active-menu-item.tsx";
import {Outlet} from "react-router-dom";
import Button from "@mui/material/Button";
import {ChatOutlined, HelpOutline, NotificationsNoneOutlined} from "@mui/icons-material";
import {Breadcrumbs} from "../components/Breadcrumbs.tsx";
import {Box} from "@mui/material";

export function CloudLayout() {
    const {activeItem} = useActiveMenuItem()
    const isDarkModeEnabled = false

    return <>
        <div className={`cloud-layout ${isDarkModeEnabled ? 'dark' : ''}`}>
            <AsideBar/>
            {activeItem?.secondSideBar && activeItem.secondSideBar()}
            <div className="main">
                <div className="main-header flex-center">
                    <Breadcrumbs/>
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
                <Box m={3}>
                    <Outlet/>
                </Box>
            </div>
        </div>
    </>

}
