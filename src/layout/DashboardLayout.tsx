import React from "react";
import {Box, IconButton, Stack, Typography} from "@mui/material";
import {DashboardLayoutConfig, DashboardLayoutConfigureContext} from "../context/DashboardLayoutConfig";
import Button from "@mui/material/Button";
import {Feedback, Help, MenuRounded} from "@mui/icons-material";
import {Breadcrumbs} from "../components/Breadcrumbs";
import {AsideBar} from "../components/AsideBar";
import {useActiveMenuItem} from "../hooks/active-menu-item";
import {useNavigate} from "react-router-dom";
import {FeedbackWidget} from "../components/FeedbackWidget";

export interface DashboardLayoutProps {
    children: React.ReactNode;
}

export function DashboardLayout(props: DashboardLayoutProps) {
    const [config, setConfig] = React.useState<DashboardLayoutConfig>({
        sideBarOpen: true,
    });
    const [feedbackOpen, setFeedbackOpen] = React.useState(false)

    const activeItem = useActiveMenuItem()
    const navigate = useNavigate()

    return <>
        <FeedbackWidget
            onClose={() => {
                setFeedbackOpen(false)
            }}
            open={feedbackOpen}/>
        <Box id='dashboard-layout'
             sx={{
                 flex: 1,
                 display: 'flex',
                 flexDirection: 'row',
                 width: '100%',
                 minWidth: '1200px',
                 height: '100vh',
                 background: '#f5f5f5'
             }}
        >
            <Box id='left-bar'
                 sx={{
                     display: 'flex',
                     flexDirection: 'column',
                     borderRight: '1px solid #e6e8ec',
                     width: '61px',
                     overflow: 'hidden'
                 }}
            >
                <Box id='left-top-bar'
                     sx={{
                         height: '31px',
                         padding: '8px 16px',
                         borderBottom: '1px solid #e6e8ec',
                         flexDirection: 'row',
                         display: 'flex'
                     }}>
                    <Box flexGrow={1}/>
                    <IconButton onClick={() => {
                        if (activeItem?.secondSideBar) {
                            navigate('/dashboard')
                        }
                        setConfig({
                            ...config,

                        })
                    }}
                                sx={{
                                    padding: '0px'
                                }}>
                        <MenuRounded/>
                    </IconButton>
                </Box>
                <AsideBar activeItem={activeItem}/>
            </Box>
            {activeItem?.secondSideBar && <Box id='second-left-bar'
                                               sx={{
                                                   display: 'flex',
                                                   flexDirection: 'column',
                                                   borderRight: '1px solid #e6e8ec',
                                                   width: '230px',
                                                   overflow: 'hidden'
                                               }}>
                {activeItem.secondSideBar()}
            </Box>}
            <Box sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
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
                            <Button onClick={() => {
                                setFeedbackOpen(true)
                            }}>
                                <Feedback fontSize='small'/>
                                <Typography ml={1}>Feedback</Typography>
                            </Button>
                            <Button target='_blank' href='https://apibrew.io/docs/getting-started'>
                                <Help fontSize='small'/>
                                <Typography ml={1}>Help</Typography>
                            </Button>
                        </Stack>
                    </Box>
                </Box>
                <Box id='content'
                     sx={{
                         flex: 1,
                         display: 'flex',
                         flexDirection: 'column',
                         flexGrow: 1,
                         maxHeight: '100%',
                         overflow: 'auto',
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