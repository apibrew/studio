import React from "react";
import {Box, CardActions, CardContent, CardHeader, Stack, Tab, Tabs} from "@mui/material";

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
    return <>
        <Box
            width={props.width ?? 'auto'}
            height='100%'
            minWidth='500px'
            display='flex'
            flexDirection='column'
            minHeight='500px'>
            <CardHeader title={props.title}/>
            <CardContent style={{flexGrow: 1}}>
                <Box
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
                </Box>
            </CardContent>
            <CardActions>
                <Box flexGrow={1}/>
                <Stack display='flex' direction='row' spacing={1}>
                    {props.actions}
                </Stack>
            </CardActions>
        </Box>
    </>
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}
