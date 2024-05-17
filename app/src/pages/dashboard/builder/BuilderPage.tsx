import {Namespace, Resource, useRecords, useRepository} from "@apibrew/react";
import {ResourceEntityInfo} from "@apibrew/client/model/resource";
import {LoadingOverlay} from "common";
import {Box, FormControl, Grid, MenuItem, Select, Stack} from "@mui/material";
import {ResourceSchemaView} from "../../../components/resource-schema-view/ResourceSchemaView";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {Add, Api, Refresh} from "@mui/icons-material";
import {ResourceDrawer} from "../../../components/resource-drawer/ResourceDrawer";
import {useDrawer} from "../../../hooks/use-drawer";
import {ApiDocModal} from "../../../components/api-doc/ApiDocModal";
import {useAnalytics} from "../../../hooks/use-analytics";
import {NamespaceEntityInfo} from "@apibrew/client/model/namespace";
import {NamespaceDrawer} from "../../../components/namespace-drawer/NamespaceDrawer";

export default function BuilderPage() {
    const drawer = useDrawer()
    const [wi, setWi] = useState<number>(0)
    const [resources, setResources] = useState<Resource[] | undefined>(undefined)
    const analytics = useAnalytics()
    const repository = useRepository<Resource>(ResourceEntityInfo)

    const [namespace, setNamespace] = useState<Namespace>({
        name: 'default'
    } as Namespace)

    const namespaces = useRecords<Namespace>(NamespaceEntityInfo, {
        limit: 1000,
    }, wi)

    useEffect(() => {
        setResources(undefined)
        repository.list().then(resp => {
            setResources(resp.content)
        })
    }, [wi]);

    const filteredResources = resources?.filter(resource => resource.namespace.name === namespace.name)

    return <>
        {drawer.render()}
        <Box m={2} mt={0}>
            <Box width='100%' className='action-bar' display='flex' p={1}>
                <Stack mr={2} width='100%' direction='row' spacing={1}>
                    {namespaces && <FormControl
                        size='small'
                        variant='standard'
                        sx={{
                            width: '200px'
                        }}
                    >
                        <Select fullWidth
                                value={namespace.name}
                                onChange={(event) => {
                                    if (event.target.value === 'create') {
                                        drawer.open(
                                            <NamespaceDrawer new={true}
                                                             onClose={() => {
                                                                 drawer.close()
                                                                 setWi(wi + 1)
                                                             }}
                                                             namespace={{
                                                                 name: 'new-namespace'
                                                             } as Namespace}/>
                                        )
                                    } else {
                                        setNamespace(namespaces.find(item => item.name === event.target.value)!)
                                    }
                                }}
                                size='small'>
                            {namespaces.map(item => <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>)}
                            <MenuItem value='create'>(create)</MenuItem>
                        </Select>
                    </FormControl>}
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
                                                        },
                                                        properties: {},
                                                    } as Resource}
                                    />
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
        {/*{filteredResources && <AiDialog resources={filteredResources}*/}
        {/*                                onReload={() => setWi(wi + 1)}/>}*/}
    </>
}
