import {ArrowLeft, ArrowRight, LogoutOutlined, Person, Settings} from "@mui/icons-material";
import {useState} from "react";
import {MenuItem, menuItems} from "./menu.tsx";
import {Link, useNavigate} from "react-router-dom";
import {getClassName} from "../../util/classes.ts";
import {useActiveMenuItem} from "../hooks/active-menu-item.tsx";
import {getUserDisplayName, useCurrentUser} from "../../context/current-user.tsx";
import {useConfirmation} from "../../components/modal/use-confirmation.tsx";

export function AsideBar() {
    const {activeItem, activeSubItem} = useActiveMenuItem()
    const currentUser = useCurrentUser()
    const navigate = useNavigate()

    const [userSideBarOpen, setUserSideBarOpen] = useState(true)
    const [activeMenu, _] = useState<MenuItem | undefined>(undefined)

    const confirmation = useConfirmation()

    const isActive = (item: MenuItem) => {
        return activeItem === item || activeMenu == item
    }

    const isSubActive = (child: MenuItem) => {
        return activeSubItem == child
    }

    const sideBarOpen = userSideBarOpen && (!activeItem || !activeItem.secondSideBar)

    return <div className={`sidebar ${sideBarOpen ? 'extended' : ''}`}>
        {confirmation.render()}
        <Link to={'/'} className="logo flex-center">
            <img className={sideBarOpen ? 'open' : 'close'}
                 src={sideBarOpen ? '/logo.png' : '/logotip.png'}
                 alt="ApiBrew"/>
        </Link>

        <button className="sidebar-arrow" onClick={() => {
            sideBarOpen ? setUserSideBarOpen(false) : setUserSideBarOpen(true)
        }}>
            {sideBarOpen && <ArrowLeft/>}
            {!sideBarOpen && <ArrowRight/>}
        </button>
        <ul className="ul-buttons">
            {menuItems.map((item) => {
                const active = isActive(item)

                return <li key={item.title}
                           className={getClassName({
                               'active1': active,
                               'dropdown': Boolean(item.children && active)
                           })}>
                    <Link className="flex-center" to={item.path!}>
                        {item.icon}
                        <span>{item.title}</span>
                    </Link>
                    {item.children && <ul>
                        {item.children?.map(child => {
                            const subActive = isSubActive(child)

                            return <li
                                key={child.title}
                                className={getClassName({
                                    'active2': subActive,
                                })}>
                                <Link to={child.path!}>
                                    <span>{child.title}</span>
                                </Link>
                            </li>
                        })}
                    </ul>}
                </li>
            })}
        </ul>

        <Link className="flex-center" to={'/cloud/account'}>
            <Settings/>
            <span>Account Settings</span>
        </Link>

        <hr/>

        <div className="flex-center">
            <button className="sidebar-photo flex-center"
                    onClick={() => {
                        navigate('/cloud/account')
                    }}>
                <Person/>
                <div>
                    <span>{getUserDisplayName(currentUser)}</span>
                    <br/>
                    <span>{currentUser?.username}</span>
                </div>
            </button>

            <div style={{flexGrow: 1}}></div>

            <button onClick={() => {
                confirmation.open({
                    title: 'Logout',
                    kind: 'confirm',
                    message: 'Are you sure you want to logout?',
                    onConfirm: () => {
                        localStorage.removeItem('@apibrew/client/manager/token')
                        window.location.href = '/login'
                    }
                })
            }} className="logout">
                <LogoutOutlined/>
            </button>
        </div>
    </div>
}
