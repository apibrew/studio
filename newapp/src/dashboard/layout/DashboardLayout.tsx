import './root.css'
import {AsideBar} from "./AsideBar.tsx";
import {useActiveMenuItem} from "../hooks/active-menu-item.tsx";
import {Outlet} from "react-router-dom";

export function DashboardLayout() {
    const activeItem = useActiveMenuItem()

    return <>
        <div className="maindiv">
            <AsideBar activeItem={activeItem}/>
            {/*second Side bar*/}
            <div className="main1">
                <div className="main-header">
                    <div className="mh-div1">
                        <button>
                            <img className="mh-icon" src="/smvpic.png" alt="png"/>
                        </button>
                        <img className="mh-arrow" src="/smvpic5.png" alt="png"/>
                        <button className="mh-text">Dashboard</button>
                        <img className="mh-arrow" src="/smvpic5.png" alt="png"/>
                        <span className="mh-text">Overview</span>
                    </div>
                    <div className="mh-div2">
                        <button>
                            <img src="/smvpic6.png" alt="png"/>
                            <span>Notification</span>
                        </button>
                        <button>
                            <img src="/smvpic6.png" alt="png"/>
                            <span>Notification</span>
                        </button>
                        <button>
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
