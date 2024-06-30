import { ArrowDownward, ArrowLeft, ArrowRight, Person, Settings } from "@mui/icons-material";
import { useState } from "react";
import { MenuItem, menuItems } from "../menu.tsx";
import { useNavigate } from "react-router-dom";

export interface AsideBarProps {
    activeItem?: MenuItem
}

export function AsideBar(props: AsideBarProps) {
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [activeMenu, setActiveMenu] = useState<MenuItem | undefined>(undefined)
    const navigate = useNavigate()
    const items = menuItems

    const isActive = (item: MenuItem) => {
        return props.activeItem === item || activeMenu == item
    }

    return <div className={`sidebar ${sideBarOpen ? 'extended' : ''}`}>
        <button className="logo">
            <img src="tiapi.png" alt="png" />
            <span>APIBREW</span>
        </button>
        <button className="sidebar-arrow" onClick={() => {
            sideBarOpen ? setSideBarOpen(false) : setSideBarOpen(true)
        }}>
            {sideBarOpen && <ArrowLeft />}
            {!sideBarOpen && <ArrowRight />}
        </button>
        <ul className="ul-buttons">
            {menuItems.map((item) => {
                return <li className={'0active ' + (item.children && isActive(item) && 'dropdown')}>
                    <button>
                        {item.icon}
                        <span>{item.title}</span>
                    </button>
                    {item.children && <ul>
                        {item.children?.map(child => <li>
                            <button>
                                <span>{child.title}</span>
                            </button>
                        </li>)}
                    </ul>}
                </li>
            })}
        </ul>


        <button>
            <Settings/>
            <span>Settings</span>
        </button>


        <hr />

        <button className="sidebar-photo">
            <Person/>
            <span>
                Faiza Rzayeva
                <br />
                faiza@apibrew.com
            </span>
            <ArrowDownward/>
        </button>




        {/* <div className="sidebar-foter">
        </div> */}


    </div>
}
