import {ArrowLeft, ArrowRight, LogoutOutlined, Person, SettingsEthernet} from "@mui/icons-material";
import {useState} from "react";
import {MenuItem, menuItems} from "./menu.tsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import {getClassName} from "../../util/classes.ts";
import {useActiveMenuItem} from "../hooks/active-menu-item.tsx";
import {getUserDisplayName, useCurrentUser} from "../../context/current-user.tsx";
import {useConfirmation} from "../../components/modal/use-confirmation.tsx";
import {Collapse} from "@mui/material";

export function AsideBar() {
    const {activeItem, activeSubItem} = useActiveMenuItem()
    const currentUser = useCurrentUser()
    const navigate = useNavigate()

    const [userSideBarOpen, setUserSideBarOpen] = useState(true)
    const [activeMenu, _] = useState<MenuItem | undefined>(undefined)
    const params = useParams()

    const connectionName = params['connectionName']!
    const confirmation = useConfirmation()

    const isActive = (item: MenuItem) => {
        return activeItem === item || activeMenu == item
    }

    const isSubActive = (child: MenuItem) => {
        return activeSubItem == child
    }

    const [secondSideBarOpen, setSecondSideBarOpen] = useState<{ [key: string]: boolean }>({})

    const sideBarOpen = userSideBarOpen && ((!activeItem || !activeItem.secondSideBar)
        || Object.keys(secondSideBarOpen).some(key => secondSideBarOpen[key])
    )

    return <div className={`sidebar ${sideBarOpen ? 'extended' : ''}`}>
        {confirmation.render()}
        <Link to={prepareItemPath(connectionName, '')} className="logo flex-center">
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
                           onMouseEnter={() => {
                               if (item.children && item.children.length > 0) {
                                   setSecondSideBarOpen({
                                       ...secondSideBarOpen,
                                       [item.title]: true
                                   })
                               }
                           }}
                           onMouseLeave={() => {
                               if (item.children && item.children.length > 0) {
                                   setSecondSideBarOpen({
                                       ...secondSideBarOpen,
                                       [item.title]: false
                                   })
                               }
                           }}
                           className={getClassName({
                               'active1': secondSideBarOpen[item.title] || active,
                               'dropdown': secondSideBarOpen[item.title] || active,
                           })}>
                    <Link className="flex-center"
                          onClick={(e) => {
                              if (item.children && item.children.length > 0) {
                                  e.preventDefault()
                                  e.stopPropagation()
                              }
                          }}
                          to={prepareItemPath(connectionName, item.path)}>
                        {item.icon}
                        <span>{item.title}</span>
                    </Link>
                    {item.children && <Collapse in={secondSideBarOpen[item.title] || active}>
                        <ul>
                            {item.children?.map(child => {
                                const subActive = isSubActive(child)

                                return <li
                                    key={child.title}
                                    className={getClassName({
                                        'active2': subActive,
                                    })}>
                                    <Link to={prepareItemPath(connectionName, child.path)}>
                                        <span>{child.title}</span>
                                    </Link>
                                </li>
                            })}
                        </ul>
                    </Collapse>}
                </li>
            })}
        </ul>

        <Link className="flex-center" to={prepareItemPath(connectionName, '/cloud/projects')}>
            <SettingsEthernet/>
            <span>Back to projects</span>
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


function prepareItemPath(connectionName: string, path: string | undefined): string {
    if (path) {
        if (!connectionName || path.startsWith('/cloud')) {
            return path
        } else {
            return `/${connectionName}${path}`
        }
    } else {
        return `/${connectionName}/dashboard`
    }
}
