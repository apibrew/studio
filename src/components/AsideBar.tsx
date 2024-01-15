import {Icon, List, ListItem, ListItemButton, Typography, useTheme} from "@mui/material";
import {MenuItem, menuItems} from "../menu";
import {useNavigate} from "react-router-dom";
import React from "react";

export interface AsideBarProps {
    open: boolean
    activeItem: MenuItem
}

export function AsideBar(props: AsideBarProps) {
    const navigate = useNavigate()

    const theme = useTheme()

    const items = menuItems

    const isActive = (path: MenuItem) => {
        return props.activeItem === path
    }

    return <>
        <List>
            {items.map(item => <ListItem key={item.title}>
                {item.delimiter && <hr/>}
                {!item.delimiter && <>
                    <ListItemButton
                        sx={{
                            backgroundColor: isActive(item) ? '#D2E6FAFF' : 'transparent',
                            color: isActive(item) ? 'white' : theme.palette.text.primary,
                            borderRadius: '3px',
                            padding: props.open ? '10px 20px' : '3px',
                            '&:hover': {
                                backgroundColor: 'rgb(205, 230, 235)',
                                color: 'white'
                            }
                        }}
                        onClick={() => {
                            navigate(item.path)
                        }}>
                        <Icon sx={{
                            color: 'rgb(60, 120, 160)',
                            marginRight: 1
                        }}>{item.icon}</Icon>
                        {props.open && <Typography sx={{
                            color: theme.palette.text.primary,
                        }}>{item.title}</Typography>}
                    </ListItemButton>
                </>}
            </ListItem>)}
        </List>
    </>
}