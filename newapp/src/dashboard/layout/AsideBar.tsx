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
        <Link to={prepareItemPath(connectionName, '')} className="logo flex-center">
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
                    <Link className="flex-center" to={prepareItemPath(connectionName, item.path)}>
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

        <Link className="flex-center" to={prepareItemPath(connectionName, '/dashboard/settings')}>
            <Settings/>
            <span>Settings</span>
        </Link>

        <hr/>

        <div className="flex-center">
            <button className="sidebar-photo flex-center">
                <Person/>
                <div>
                    <span>Faiza Rzayeva</span>
                    <br/>
                    <span>faiza@apibrew.com</span>
                </div>
            </button>

            <div style={{flexGrow: 1}}></div>

            <button className="logout">
                <LogoutOutlined/>
            </button>
        </div>
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
