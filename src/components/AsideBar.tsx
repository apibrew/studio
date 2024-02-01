import {Box, Icon, IconButton, List, ListItem, ListItemButton, Tooltip, useTheme} from "@mui/material";
import {MenuItem, menuItems} from "../menu";
import {useNavigate, useParams} from "react-router-dom";
import React from "react";
import {connectionProvider} from "../connection-provider";
import {SettingsEthernet} from "@mui/icons-material";

export interface AsideBarProps {
    activeItem?: MenuItem
}

export function AsideBar(props: AsideBarProps) {
    const navigate = useNavigate()
    const params = useParams()

    const connectionName = params['connectionName']

    const theme = useTheme()

    const items = menuItems

    const isActive = (path: MenuItem) => {
        return props.activeItem === path
    }

    return <>
        <Box>
            <List>
                {items.map(item => <ListItem key={item.title}>
                    {item.delimiter && <hr/>}
                    {!item.delimiter && <>
                        <ListItemButton
                            sx={{
                                backgroundColor: isActive(item) ? '#D2E6FAFF' : 'transparent',
                                color: isActive(item) ? 'white' : theme.palette.text.primary,
                                borderRadius: '3px',
                                padding: '3px',
                                '&:hover': {
                                    backgroundColor: 'rgb(205, 230, 235)',
                                    color: 'white'
                                }
                            }}
                            onClick={() => {
                                if (!connectionName || item.path === '/connections') {
                                    navigate(item.path)
                                } else {
                                    navigate(`/${connectionName}${item.path}`)
                                }
                            }}>
                            <Tooltip
                                placement='right'
                                title={item.title}>
                                <Icon sx={{
                                    color: 'rgb(60, 120, 160)',
                                    marginRight: 1
                                }}>{item.icon}</Icon>
                            </Tooltip>
                        </ListItemButton>
                    </>}
                </ListItem>)}
            </List>
        </Box>
    </>
}