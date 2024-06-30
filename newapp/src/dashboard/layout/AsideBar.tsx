import {ArrowLeft, ArrowRight} from "@mui/icons-material";
import {useState} from "react";
import {MenuItem, menuItems} from "./menu.tsx";
import {Link, useParams} from "react-router-dom";

export interface AsideBarProps {
    activeItem?: MenuItem
}

export function AsideBar(props: AsideBarProps) {
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [activeMenu, _] = useState<MenuItem | undefined>(undefined)
    const params = useParams()

    const connectionName = params['connectionName']!

    const isActive = (item: MenuItem) => {
        return props.activeItem === item || activeMenu == item
    }

    return <div className={`sidebar ${sideBarOpen ? 'extended' : ''}`}>
        <button className="logo">
            <img src="/tiapi.png" alt="png"/>
            <span>APIBREW</span>
        </button>
        <button className="sidebar-arrow" onClick={() => {
            sideBarOpen ? setSideBarOpen(false) : setSideBarOpen(true)
        }}>
            {sideBarOpen && <ArrowLeft/>}
            {!sideBarOpen && <ArrowRight/>}
        </button>
        <ul className="ul-buttons">
            {menuItems.map((item) => {
                return <li key={item.title} className={'0active ' + (item.children && isActive(item) && 'dropdown')}>
                    <Link to={prepareItemPath(connectionName, item.path) as string}>
                        {item.icon}
                        <span>{item.title}</span>
                    </Link>
                    {item.children && <ul>
                        {item.children?.map(child => <li key={child.title}>
                            <Link to={prepareItemPath(connectionName, child.path) as string}>
                                <span>{child.title}</span>
                            </Link>
                        </li>)}
                    </ul>}
                </li>
            })}
        </ul>
        <div className="sidebar-foter">
            <button>
                <img className="sidebar-icon" src="/smvpic.png" alt="png"/>
                <span>Settings</span>
            </button>
            <hr/>
            <button>
                <img className="sidebar-photo" src="/photo.png" alt="photo"/>
                <span>
            Faiza Rzayeva
            <br/>
            faiza@apibrew.com
          </span>
                <img className="arrow" src="/smvpic1.png" alt="png"/>
            </button>
        </div>
    </div>
}

function prepareItemPath(connectionName: string, path: string | undefined): string | undefined {
    if (path) {
        if (!connectionName || path === '/connections') {
            return path
        } else {
            return `/${connectionName}${path}`
        }
    }
}
