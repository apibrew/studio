import {Icon, List, ListItem, ListItemButton, Typography, useTheme} from "@mui/material";
import {MenuItem, menuItems} from "../menu";
import {useMatches, useNavigate} from "react-router-dom";
import React from "react";

export function AsideBar() {
    const navigate = useNavigate()

    const theme = useTheme()

    const items = menuItems

    const matches = useMatches()

    let activeItem: MenuItem | null = null

    const isActive = (path: MenuItem) => {
        return activeItem === path
    }

    for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (item.delimiter) {
            continue
        }
        if (matches.some(match => match.pathname.startsWith(item.path))) {
            activeItem = item
        }
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
                            padding: '10px 20px',
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
                        <Typography sx={{
                            color: theme.palette.text.primary,
                        }}>{item.title}</Typography>
                    </ListItemButton>
                </>}
            </ListItem>)}
        </List>
    </>
}