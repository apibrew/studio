import {ArrowLeft, ArrowRight, LogoutOutlined, Person, Settings} from "@mui/icons-material";
import {useState} from "react";
import {MenuItem, menuItems} from "./menu.tsx";
import {Link, useParams} from "react-router-dom";

export interface AsideBarProps {
    activeItem?: MenuItem
}
export function AsideBar(props: AsideBarProps) {
    const [userSideBarOpen, setUserSideBarOpen] = useState(true)
    const [activeMenu, _] = useState<MenuItem | undefined>(undefined)
    const params = useParams()

    const connectionName = params['connectionName']!

    const isActive = (item: MenuItem) => {
        return props.activeItem === item || activeMenu == item
    }

    const sideBarOpen = userSideBarOpen && (!props.activeItem || !props.activeItem.secondSideBar)

    return <div className={`sidebar ${sideBarOpen ? 'extended' : ''}`}>
        <Link to={prepareItemPath(connectionName, '')} className="logo">
            <img src="/tiapi.png" alt="png"/>
            <span>APIBREW</span>
        </Link>
        <button className="sidebar-arrow" onClick={() => {
            sideBarOpen ? setUserSideBarOpen(false) : setUserSideBarOpen(true)
        }}>
            {sideBarOpen && <ArrowLeft/>}
            {!sideBarOpen && <ArrowRight/>}
        </button>
        <ul className="ul-buttons">
            {menuItems.map((item) => {
                return <li key={item.title} className={'0active ' + (item.children && isActive(item) && 'dropdown')}>
                    <Link to={prepareItemPath(connectionName, item.path)}>
                        {item.icon}
                        <span>{item.title}</span>
                    </Link>
                    {item.children && <ul>
                        {item.children?.map(child => <li key={child.title}>
                            <Link to={prepareItemPath(connectionName, child.path)}>
                                <span>{child.title}</span>
                            </Link>
                        </li>)}
                    </ul>}
                </li>
            })}
        </ul>

        <Link to={prepareItemPath(connectionName, '/dashboard/settings')}>
            <Settings/>
            <span>Settings</span>
        </Link>

        <hr/>

        <button className="sidebar-photo">
            <Person/>
            <span>
                Faiza Rzayeva
                <br/>
                faiza@apibrew.com
            </span>
        </button>
        <button className="sidebar-photo">
            <LogoutOutlined/>
        </button>
    </div>
}

function prepareItemPath(connectionName: string, path: string | undefined): string {
    if (path) {
        if (!connectionName || path === '/connections') {
            return path
        } else {
            return `/${connectionName}${path}`
        }
    } else {
        return `/${connectionName}/dashboard`
    }
}
