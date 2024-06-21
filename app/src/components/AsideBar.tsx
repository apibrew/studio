import { Box, Collapse, Icon, List, ListItem, ListItemButton, ListItemText, useTheme } from "@mui/material";
import { MenuItem, menuItems } from "../menu";
import { useNavigate, useParams } from "react-router-dom";
import { connectionProvider } from "../cloud/setup.ts";
import { useState } from "react";

export interface AsideBarProps {
    activeItem?: MenuItem
}

export function AsideBar(props: AsideBarProps) {
    const [activeMenu, setActiveMenu] = useState<MenuItem | undefined>(undefined)
    const navigate = useNavigate()
    const params = useParams()

    const connectionName = params['connectionName']

    const theme = useTheme()

    const items = menuItems

    const isActive = (item: MenuItem) => {
        return props.activeItem === item || activeMenu == item
    }

    return <>
        <Box width='200px'>
            <List>
                {items.map(item => {
                    if (item.conditional && !item.conditional(connectionProvider)) {
                        return null
                    }

                    return (
                        <ListItem key={item.title}>
                            {item.delimiter && <hr />}
                            {!item.delimiter && <Box width='100%'>
                                <ListItemButton
                                    sx={{
                                        backgroundColor: isActive(item) ? '#D2E6FAFF' : 'transparent',
                                        color: isActive(item) ? 'white' : theme.palette.text.primary,
                                        borderRadius: '3px',
                                        padding: '3px',
                                        '&:hover': {
                                            backgroundColor: 'rgb(205, 230, 235)',
                                            color: 'white'
                                        },
                                    }}
                                    onClick={() => {
                                        setActiveMenu(item)
                                        if (item.path) {
                                            if (!connectionName || item.path === '/connections') {
                                                navigate(item.path!)
                                            } else {
                                                navigate(`/${connectionName}${item.path}`)
                                            }
                                        }
                                    }}>
                                    <Icon sx={{
                                        color: 'rgb(60, 120, 160)',
                                        marginRight: 1
                                    }}>{item.icon}</Icon>
                                    <ListItemText secondary={item.title} />
                                </ListItemButton>
                                {item.children && <Collapse in={isActive(item)} timeout='auto' unmountOnExit>
                                    <Box ml={3} width='100%'>
                                        {item.children.map(child => (
                                            <ListItem key={child.title}>
                                                <ListItemButton
                                                    sx={{
                                                        backgroundColor: isActive(child) ? '#D2E6FAFF' : 'transparent',
                                                        color: isActive(child) ? 'white' : theme.palette.text.primary,
                                                        borderRadius: '3px',
                                                        padding: '3px',
                                                        '&:hover': {
                                                            backgroundColor: 'rgb(205, 230, 235)',
                                                            color: 'white'
                                                        }
                                                    }}
                                                    onClick={() => {
                                                        navigate(`/${connectionName}${child.path}`)
                                                    }}>
                                                    <ListItemText secondary={child.title} />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </Box>
                                </Collapse>}
                            </Box>}
                        </ListItem>)
                })}
            </List>
        </Box>
    </>
}
