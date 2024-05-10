import {Box, Tab, Tabs} from "@mui/material";
import {useEffect} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {PageLayout} from "../../../layout/PageLayout";
import {useRouteTab} from "../../../hooks/use-route-tab";
import {LoadingOverlay} from "../../../components/LoadingOverlay";

export default function MonitoringPage() {
    const tab = useRouteTab()
    const navigate = useNavigate()

    useEffect(() => {
        if (!tab) {
            navigate('audit')
        }
    }, [tab]);

    if (!tab) {
        return <LoadingOverlay/>
    }

    return <>
        <PageLayout disableTopMargin={true}>
            <Box display='flex'
                 sx={{
                     borderBottom: 1,
                     borderColor: 'divider',
                 }}>
                <Tabs
                    value={tab}
                    onChange={(_, newValue) => {
                        if (newValue === tab) {
                            return
                        }

                        navigate(newValue)
                    }}>
                    <Tab value='audit' label="Audit Logs"/>
                    <Tab value='logs' label="Application Logs"/>
                    {/*<Tab value='metrics' label="Metrics"/>*/}
                    {/*<Tab value='stats' label="Stats"/>*/}
                </Tabs>
                <Box flexGrow={1}/>
            </Box>
            <Box m={1}>
                <Outlet/>
            </Box>
        </PageLayout>
    </>
}
