import {Box, Stack, Tab, Tabs} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {PageLayout} from "../../../layout/PageLayout";
import {useRouteTab} from "../../../hooks/use-route-tab";
import {LoadingOverlay} from "../../../components/LoadingOverlay";
import Button from "@mui/material/Button";
import {ensureResource} from "../../../logic/ensure-resource";
import {Resource, useClient} from "@apibrew/react";
import {Settings, SettingsEntityInfo, SettingsResource} from "../../../model/settings";
import {StateContext} from "../../../context/StateContext";

export default function SettingsPage() {
    const tab = useRouteTab()
    const navigate = useNavigate()
    const client = useClient()

    const [settings, setSettings] = useState<Settings>()

    const load = async () => {
        const repo = client.repository<Settings>(SettingsEntityInfo)

        try {
            const settings = await repo.load({
                name: 'default'
            })

            setSettings(settings)
        } catch (e) {
            console.error('Failed to load settings', e)

            const settings = await repo.create({
                name: 'default'
            } as Settings)

            setSettings(settings)
        }
    }

    useEffect(() => {
        ensureResource(client, SettingsResource as Resource, true)
            .then(() => {
                return load()
            })
    }, []);

    useEffect(() => {
        if (!tab) {
            navigate('general')
        }
    }, [tab]);

    if (!settings || !tab) {
        return <LoadingOverlay/>
    }

    return <>
        <PageLayout>
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
                    }}>
                    <Tab value='general' label="General"/>
                    <Tab value='resource' label="Resource"/>
                    <Tab value='nano' label="Nano"/>
                    <Tab value='custom-attributes' label="Custom Attributes"/>
                    <Tab value='extensions' label="Extensions"/>
                </Tabs>
                <Box flexGrow={1}/>
                <Box>
                    <Stack direction='row' spacing={1}>
                        <Button
                            onClick={() => {

                            }}
                            color='success'>Save</Button>
                        <Button
                            onClick={() => {
                                load()
                            }}
                            color='secondary'>Reset</Button>
                    </Stack>
                </Box>
            </Box>
            <Box m={1}>
                {settings && <StateContext.Provider
                    value={{
                        value: settings,
                        onChange: setSettings
                    }}>
                    <Outlet/>
                </StateContext.Provider>}
            </Box>
        </PageLayout>
    </>
}