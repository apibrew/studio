import './root.css'
import {ReactNode} from "react";
import {menuItems} from "./menu.tsx";

export function RootLayout(props: { children: ReactNode }) {
    return <>
        <div className="maindiv">
            <div className="sidebar extended">
                <button className="logo">
                    <img src="tiapi.png" alt="png"/>
                    <span>APIBREW</span>
                </button>
                <button className="sidebar-arrow">
                    <img className="active" src="smvpic3.png" alt="png"/>
                    <img src="smvpic3e.png" alt="png"/>
                </button>
                <ul className="ul-buttons">
                    {menuItems.map((item) => {
                        return <li className={'0active ' + (item.children && 'dropdown')}>
                            <button>
                                {item.icon}
                                <span>{item.title}</span>
                            </button>
                            <ul>
                                {item.children?.map(child => <li>
                                    <button>
                                        <span>{child.title}</span>
                                    </button>
                                </li>)}
                            </ul>
                        </li>
                    })}
                </ul>
                <div className="sidebar-foter">
                    <button>
                        <img className="sidebar-icon" src="smvpic.png" alt="png"/>
                        <span>Settings</span>
                    </button>
                    <hr/>
                    <button>
                        <img className="sidebar-photo" src="photo.png" alt="photo"/>
                        <span>
            Faiza Rzayeva
            <br/>
            faiza@apibrew.com
          </span>
                        <img className="arrow" src="smvpic1.png" alt="png"/>
                    </button>
                </div>
            </div>
            <div className="main1">
                <div className="main-header">
                    <div className="mh-div1">
                        <button>
                            <img className="mh-icon" src="smvpic.png" alt="png"/>
                        </button>
                        <img className="mh-arrow" src="smvpic5.png" alt="png"/>
                        <button className="mh-text">Dashboard</button>
                        <img className="mh-arrow" src="smvpic5.png" alt="png"/>
                        <span className="mh-text">Overview</span>
                    </div>
                    <div className="mh-div2">
                        <button>
                            <img src="smvpic6.png" alt="png"/>
                            <span>Notification</span>
                        </button>
                        <button>
                            <img src="smvpic6.png" alt="png"/>
                            <span>Notification</span>
                        </button>
                        <button>
                            <img src="smvpic6.png" alt="png"/>
                            <span>Notification</span>
                        </button>
                    </div>
                </div>
                <div>
                    <hr/>
                </div>
                {props.children}
            </div>
        </div>
    </>

}
