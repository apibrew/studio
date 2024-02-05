import {PageLayout} from "../../layout/PageLayout";
import {useRouteTab} from "../../hooks/use-route-tab";
import {Outlet, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {LoadingOverlay} from "../../components/LoadingOverlay";
import {Box, Tab, Tabs} from "@mui/material";
import Button from "@mui/material/Button";
import {useClient} from "@apibrew/react";
import {useAnalytics} from "../../hooks/use-analytics";

export function InnerPage() {
    const tab = useRouteTab()
    const navigate = useNavigate()
    const analytics = useAnalytics()
    const client = useClient()

    useEffect(() => {
        if (!tab) {
            navigate('instances')
        }

        if (!client.isAuthenticated()) {
            navigate('login')
        }
    }, [tab]);

    if (!tab) {
        return <LoadingOverlay/>
    }

    if (!client.isAuthenticated()) {
        return <LoadingOverlay/>
    }

    if (tab === 'goto') {
        return <PageLayout>
            <Outlet/>
        </PageLayout>
    }

    return <PageLayout>
        <Box display='flex'
             sx={{
                 borderBottom: 1,
                 borderColor: 'divider',
             }}>
            <Tabs
                value={tab}
                onChange={(e, newValue) => {
                    if (newValue === tab) {
                        return
                    }

                    navigate(newValue)

                    analytics.click('tab', newValue)
                }}>
                <Tab value='instances' label="Instances"/>
                <Tab value='invoices' label="Invoices"/>
            </Tabs>
            <Box flexGrow={1}/>
            <Box sx={{
                paddingTop: '8px'
            }}>
                <Button
                    onClick={() => {
                        client.invalidateAuthentication()
                        navigate('/cloud')
                    }}
                    size='small'>Logout</Button>
            </Box>
        </Box>
        <Box m={1}>
            <Outlet/>
        </Box>
    </PageLayout>
}