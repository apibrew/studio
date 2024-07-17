import './root.css'
import {AsideBar} from "./AsideBar.tsx";
import {useActiveMenuItem} from "../hooks/active-menu-item.tsx";
import {Outlet} from "react-router-dom";

export function DashboardLayout() {
    const activeItem = useActiveMenuItem()

    return <>
        <div className="maindiv">
            <AsideBar activeItem={activeItem}/>
            {activeItem?.secondSideBar && activeItem.secondSideBar()}
            <div className="main">
                <div className="main-header flex-center">
                    <div className="mh-div1 flex-center">
                        <button>
                            <img className="mh-icon" src="/smvpic.png" alt="png"/>
                        </button>
                        <img className="mh-arrow" src="/smvpic5.png" alt="png"/>
                        <button className="mh-text">Dashboard</button>
                        <img className="mh-arrow" src="/smvpic5.png" alt="png"/>
                        <span className="mh-text">Overview</span>
                    </div>
                    <div className="mh-div2 flex-center">
                        <button className="flex-center">
                            <img src="/smvpic6.png" alt="png"/>
                            <span>Notification</span>
                        </button>
                        <button className="flex-center">
                            <img src="/smvpic6.png" alt="png"/>
                            <span>Notification</span>
                        </button>
                        <button className="flex-center">
                            <img src="/smvpic6.png" alt="png"/>
                            <span>Notification</span>
                        </button>
                    </div>
                </div>
                <Outlet/>
            </div>
        </div>
    </>

}
