import {
    ArrowLeft,
    ArrowRight,
    ExpandLess,
    ExpandMore,
    LogoutOutlined,
    Person,
    SettingsEthernet
} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {MenuItem, menuItems} from "./menu.tsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import {getClassName} from "../../util/classes.ts";
import {useActiveMenuItem} from "../hooks/active-menu-item.tsx";
import {getUserDisplayName, useCurrentUser} from "../../context/current-user.tsx";
import {useConfirmation} from "../../components/modal/use-confirmation.tsx";
import {Collapse} from "@mui/material";
import {useStudioSettings} from "../context/studio-settings.tsx";

export function AsideBar() {
    const {activeItem, activeSubItem} = useActiveMenuItem()
    const currentUser = useCurrentUser()
    const navigate = useNavigate()
    const settings = useStudioSettings()

    const [sideBarOpen, setSideBarOpen] = useState(true)
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

    useEffect(() => {
        if (activeItem?.secondSideBar) {
            setSideBarOpen(false)
        }
    }, [activeItem?.secondSideBar]);

    useEffect(() => {
        if (activeItem) {
            if (activeItem.children) {
                setSecondSideBarOpen({
                    [activeItem.title]: true
                })
            } else {
                setSecondSideBarOpen({})
            }
        }
    }, [activeItem]);

    let items = menuItems;

    if (settings.customPages && settings.customPages.length > 0) {
        items.forEach(item => {
            if (item.key === 'custom-pages') {
                item.hidden = false

                item.children = []
                settings.customPages?.forEach(page => {
                    item.children?.push({
                        title: page.name,
                        path: '/dashboard/custom-pages/' + (page.route.startsWith('/') ? page.route.substring(1) : page.route),
                        hidden: !page.showInMenu
                    })
                })
            }
        })
    }

    items = items.filter(item => !item.hidden)

    return <div className={`sidebar ${sideBarOpen ? 'extended' : ''}`}>
        {confirmation.render()}
        <Link to={prepareItemPath(connectionName, '')} className="logo flex-center">
            <img className={sideBarOpen ? 'open' : 'close'}
                 src={sideBarOpen ? '/logo.png' : '/logotip.png'}
                 alt="ApiBrew"/>
        </Link>

        <button className="sidebar-arrow" onClick={() => {
            sideBarOpen ? setSideBarOpen(false) : setSideBarOpen(true)
        }}>
            {sideBarOpen && <ArrowLeft/>}
            {!sideBarOpen && <ArrowRight/>}
        </button>
        <ul className="ul-buttons">
            {items
                .map((item) => {
                    const active = isActive(item)

                    return <li key={item.title}
                               className={getClassName({
                                   'active1': secondSideBarOpen[item.title] || active,
                                   'dropdown': secondSideBarOpen[item.title] || active,
                               })}>
                        <Link className="flex-center"
                              onClick={(e) => {
                                  if (item.children && item.children.length > 0) {
                                      e.preventDefault()
                                      e.stopPropagation()
                                      setSideBarOpen(true)
                                      setSecondSideBarOpen({
                                          [item.title]: !secondSideBarOpen[item.title] || active
                                      })
                                  }
                              }}
                              to={prepareItemPath(connectionName, item.path)}>
                            {item.icon}
                            <span>{item.title}</span>
                            {sideBarOpen && item.children && <span className='second-side-bar-open-button'>
                                {secondSideBarOpen[item.title] ? <ExpandLess/> : <ExpandMore/>}
                            </span>}
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
