import React from "react";
import {Box, Stack, Theme, Typography, useMediaQuery} from "@mui/material";
import {DashboardLayoutConfig, DashboardLayoutConfigureContext} from "../context/DashboardLayoutConfig";
import Button from "@mui/material/Button";
import {Feedback, Help} from "@mui/icons-material";
import {Breadcrumbs} from "../components/Breadcrumbs";
import {AsideBar} from "../components/AsideBar";

export interface DashboardLayoutProps {
    children: React.ReactNode;
}

export function DashboardLayout(props: DashboardLayoutProps) {
    const [config, setConfig] = React.useState<DashboardLayoutConfig>({
        breadcrumbs: []
    });

    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

    return <>
        <Box id='dashboard-layout'
             sx={{
                 flex: 1,
                 display: 'flex',
                 flexDirection: 'row',
                 width: '100%',
                 height: '100vh',
                 background: '#f5f5f5'
             }}
        >
            <Box id='left-bar'
                 sx={{
                     display: 'flex',
                     flexDirection: 'column',
                     borderRight: '1px solid #e6e8ec',
                     width: '230px',
                     overflow: 'hidden'
                 }}
            >
                <Box id='left-top-bar'
                     sx={{
                         height: '31px',
                         padding: '8px 16px',
                         borderBottom: '1px solid #e6e8ec'
                     }}>
                    <Typography sx={{
                        padding: '4px',
                        fontSize: '21px',
                        fontWeight: 'bold'
                    }}>
                        ApiBrew Studio
                    </Typography>
                </Box>
                <AsideBar/>
            </Box>
            <Box sx={{
                flexGrow: 1,
            }}>
                <Box id='top-bar'
                     sx={{
                         height: '31px',
                         display: 'flex',
                         flexDirection: 'row',
                         padding: '8px 16px',
                         borderBottom: '1px solid #e6e8ec',
                     }}>
                    <Box display='flex'>
                        <Breadcrumbs/>
                    </Box>
                    <Box display='flex'
                         flexGrow={1}></Box>
                    <Box display='flex'>
                        <Stack direction='row'
                               spacing={1}>
                            <Button>
                                <Feedback fontSize='small'/>
                                <Typography ml={1}>Feedback</Typography>
                            </Button>
                            <Button>
                                <Help fontSize='small'/>
                                <Typography ml={1}>Help</Typography>
                            </Button>
                        </Stack>
                    </Box>
                </Box>
                <Box id='content'
                     sx={{
                         flex: 1,
                         flexGrow: 1,
                         padding: 3,
                     }}>
                    <DashboardLayoutConfigureContext.Provider value={{
                        get(): DashboardLayoutConfig {
                            return config;
                        },
                        update(updatedConfig: Partial<DashboardLayoutConfig>): void {
                            setConfig({
                                ...config,
                                ...updatedConfig,
                            })
                        }
                    }}>
                        {props.children}
                    </DashboardLayoutConfigureContext.Provider>
                </Box>
            </Box>

        </Box>
    </>
}