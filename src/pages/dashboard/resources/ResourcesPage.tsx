import {Resource, useRepository} from "@apibrew/react";
import {ResourceEntityInfo} from "@apibrew/client/model/resource";
import {LoadingOverlay} from "../../../components/LoadingOverlay";
import {Box, Grid, Stack} from "@mui/material";
import {ResourceSchemaView} from "../../../components/resource-schema-view/ResourceSchemaView";
import {Link} from "react-router-dom";
import React, {useEffect} from "react";
import Button from "@mui/material/Button";
import {Add, Api, Refresh} from "@mui/icons-material";
import {ResourceDrawer} from "../../../components/resource-drawer/ResourceDrawer";
import {useDrawer} from "../../../hooks/use-drawer";
import {ApiDocModal} from "../../../components/api-doc/ApiDocModal";
import {useAnalytics} from "../../../hooks/use-analytics";

export default function ResourcesPage() {
    const drawer = useDrawer()
    const [wi, setWi] = React.useState<number>(0)
    const [resources, setResources] = React.useState<Resource[] | undefined>(undefined)
    const analytics = useAnalytics()
    const repository = useRepository<Resource>(ResourceEntityInfo)

    useEffect(() => {
        setResources(undefined)
        repository.list().then(resp => {
            setResources(resp.content)
        })
    }, [wi]);

    const filteredResources = resources?.filter(resource => resource.namespace.name === 'default')

    return <>
        {drawer.render()}
        <Box m={2} mt={0}>
            <Box width='100%' className='action-bar' display='flex' p={1}>
                <Stack mr={2} width='100%' direction='row' spacing={1}>
                    <Button size='small' onClick={() => {
                        setWi(wi + 1)
                    }}>
                        <Refresh fontSize='small'/>
                        <span style={{marginLeft: '3px'}}>Refresh</span>
                    </Button>
                    <Button color='success'
                            size='small'
                            onClick={() => {
                                drawer.open(
                                    <ResourceDrawer new={true}
                                                    onClose={() => {
                                                        drawer.close()
                                                        setWi(wi + 1)
                                                    }}
                                                    resource={{
                                                        name: 'NewResource1',
                                                        namespace: {
                                                            name: 'default'
                                                        }
                                                    } as Resource}/>
                                )
                            }}>
                        <Add fontSize='small'/>
                        <span style={{marginLeft: '3px'}}>Add</span>
                    </Button>
                    <Box flexGrow={1}/>
                    <Button color='secondary'
                            size='small'
                            onClick={() => {
                                drawer.open(<ApiDocModal
                                    onClose={() => {
                                        drawer.close()
                                    }}/>)

                                analytics.click('api-doc')
                            }}>
                        <Api fontSize='small'/>
                        <span style={{marginLeft: '3px'}}>Api Doc</span>
                    </Button>
                </Stack>
            </Box>
            {!resources && <LoadingOverlay/>}
            {filteredResources && <Grid container spacing={3}>
                {filteredResources.map(resource => {
                    return <Grid item xs={3}>
                        <Link style={{
                            textDecoration: 'none'
                        }} to={`${resource.namespace.name}/${resource.name}`}>
                            <ResourceSchemaView resource={resource}/>
                        </Link>
                    </Grid>
                })}
            </Grid>}
        </Box>
    </>
}