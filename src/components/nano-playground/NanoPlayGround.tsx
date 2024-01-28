import {PlayGround, PlayGroundEntityInfo} from "../../model/play-ground";
import React, {useEffect} from "react";
import {useRepository} from "@apibrew/react";
import {Script, ScriptEntityInfo} from "../../model/script";
import {Box, Grid, IconButton, Stack, Typography} from "@mui/material";
import {LoadingOverlay} from "../LoadingOverlay";
import {Add} from "@mui/icons-material";
import {NanoScript} from "./NanoScript";

export interface NanoPlayGround {
    playground: PlayGround
}

export function NanoPlayGroundComponent(props: NanoPlayGround) {
    const [playground, setPlayground] = React.useState<PlayGround>(props.playground)
    const playgroundRepository = useRepository<PlayGround>(PlayGroundEntityInfo)
    const scriptRepository = useRepository<Script>(ScriptEntityInfo)

    const [scripts, setScripts] = React.useState<Script[]>()

    useEffect(() => {
        async function loadScripts() {
            if (!playground.run) {
                const updatedPlayground = {
                    ...playground,
                    run: true,
                } as PlayGround

                await playgroundRepository.update(updatedPlayground)

                setPlayground(updatedPlayground)
            }

            await scriptRepository.list({
                limit: 1000,
                filters: {
                    playground: playground.id,
                }
            }).then(async (response) => {
                if (response.content.length === 0) {
                    setScripts([{
                        order: 0,
                        playground: playground,
                        content: ''
                    } as Script])
                } else {
                    const list = response.content

                    list.sort((a, b) => a.order - b.order)

                    setScripts(list)
                }
            })
        }

        loadScripts()
    }, [playground]);

    useEffect(() => {
        if (scripts) {
            let updated = false
            const updatedScripts = [...scripts]
            for (let i = 0; i < updatedScripts.length; i++) {
                if (updatedScripts[i].order !== i) {
                    updated = true
                    updatedScripts[i].order = i
                    if (updatedScripts[i].id) {
                        scriptRepository.update(updatedScripts[i]).catch(err => {
                            scriptRepository.update(updatedScripts[i]).catch(err => {
                                scriptRepository.update(updatedScripts[i]).catch(err => {

                                })
                            })
                        })
                    }
                }
            }
            if (updated) {
                setScripts(updatedScripts)
            }
        }
    }, [scripts]);

    if (!scripts) {
        return <LoadingOverlay/>
    }

    return <>
        <Grid container>
            <Grid item xs={12} md={6}>
                <Box>
                    <Stack
                        m={1}
                        spacing={3}>
                        {scripts.map((script, index) => (
                            <NanoScript
                                key={script.order}
                                script={script}
                                onRemove={() => {
                                    setScripts(scripts.filter(s => s.order !== script.order))
                                }}
                            />
                        ))}
                        <Box display='flex' textAlign='center'>
                            <IconButton
                                onClick={() => {
                                    const newScript = {
                                        order: scripts.length,
                                        playground: playground,
                                        content: '  '
                                    } as Script

                                    scriptRepository.create(newScript).then(createdScript => {
                                        console.log('createdScript', createdScript)
                                        setScripts([
                                            ...scripts,
                                            createdScript
                                        ])
                                    })
                                }}
                                size='small'>
                                <Add/>
                            </IconButton>
                        </Box>
                    </Stack>
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box>
                    <Typography variant='h6'>Output:</Typography>
                </Box>
            </Grid>
        </Grid>
    </>
}
