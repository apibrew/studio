import React from "react";
import {Box, Tab, Tabs} from "@mui/material";
import {DrawerComponent} from "./DrawerComponent";

export interface DrawerMultiComponentProps {
    title: string
    width?: any
    items: {
        title: string,
        content: React.ReactNode
    }[];
    actions: React.ReactNode;

}

export function DrawerMultiComponent(props: DrawerMultiComponentProps) {
    const [tabIndex, setTabIndex] = React.useState(0)
    return <DrawerComponent
        title={props.title}
        content={<Box
            sx={{flexGrow: 1, display: 'flex'}}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                aria-label="Vertical tabs example"
                value={tabIndex}
                onChange={(event, newValue) => {
                    setTabIndex(newValue)
                }}
                sx={{borderRight: 1, borderColor: 'divider'}}
            >
                {props.items.map(item => <Tab key={item.title} label={item.title} {...a11yProps(0)} />)}
            </Tabs>
            {props.items.map((item, index) => <Box key={item.title}>
                {tabIndex === index && item.content}
            </Box>)}
        </Box>}
        actions={props.actions}/>
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}
