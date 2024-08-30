import {Instance, InstanceEntityInfo} from "../../model/instance";
import {LoadingOverlay} from "common";

import {Box, Card, Grid, IconButton, Popover, Stack, Typography} from "@mui/material";
import {Direction, useRepository, useWatcher} from "@apibrew/react";
import {BooleanExpression} from "@apibrew/client/model/permission";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {ArrowForwardIos, FilterList, Info, Refresh, Remove, Search, Settings} from "@mui/icons-material";
import {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import {useDrawer} from "../../../hooks/use-drawer.tsx";
import {NewProjectDrawer} from "../../components/NewProjectDrawer.tsx";
import {EditProjectDrawer} from "../../components/EditProjectDrawer.tsx";
import {ListRecordParams} from "@apibrew/client";
import {ProjectInfoDrawer} from "../../components/ProjectInfoDrawer.tsx";

export function ProjectsPage() {
    const navigate = useNavigate()
    const drawer = useDrawer()

    const wi = useWatcher(InstanceEntityInfo)
    const [showDestroyed, setShowDestroyed] = useState(false)
    const repository = useRepository<Instance>(InstanceEntityInfo)
    const [loading, setLoading] = useState(true)
    var [data, setData] = useState<Instance[]>([])

    function buildParams(): ListRecordParams {
        let query = {
            not: {
                equal: {
                    left: {
                        property: 'deploymentStatus'
                    },
                    right: {
                        value: 'DESTROYED'
                    }
                }
            }
        } as unknown as BooleanExpression

        if (showDestroyed) {
            query = undefined as unknown as BooleanExpression
        }

        return {
            query: query,
            limit: 1000,
            resolveReferences: ['$.plan'],
            sorting: [{
                property: 'auditData.createdOn',
                direction: Direction.DESC
            }]
        }
    }

    function load() {
        setLoading(true)
        setData([])
        const params = buildParams()
        repository.list(params)
            .then(resp => {
                setData(resp.content)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        load()
    }, [showDestroyed, wi]);

    const [searchAnchor, setSearchAnchor] = useState<null | HTMLElement>(null)
    const [filtersAnchor, setFiltersAnchor] = useState<null | HTMLElement>(null)
    const [searchValueLocal, setSearchValueLocal] = useState('')
    const [searchValue, setSearchValue] = useState('')

    const projects = (data || []).filter(item => {
        if (searchValue === '') {
            return true
        }

        return item.name.indexOf(searchValue) !== -1
            || (item.title && item.title?.indexOf(searchValue) !== -1)
            || (item.description && item.description?.indexOf(searchValue) !== -1)
            || (item.owner && item.owner?.indexOf(searchValue) !== -1)
    })

    return <Box width='100%'>
        {drawer.render()}
        <Box justifyContent='space-between' display='flex'>
            <Typography variant='h5'>Projects {!loading && '(' + projects.length + ')'}</Typography>
            <Stack spacing={2} direction='row'>
                <Button
                    size='small'
                    color='secondary'
                    variant='contained'
                    onClick={() => {
                        load()
                    }}
                >
                    <Refresh/>
                    Refresh
                </Button>
                <Popover open={Boolean(searchAnchor)}
                         anchorOrigin={{
                             vertical: 'bottom',
                             horizontal: 'left',
                         }}
                         anchorEl={searchAnchor}
                         onClose={() => {
                             setFiltersAnchor(null)
                         }}
                >
                    <Stack width='400px'
                           spacing={2}
                           flexDirection='row'>
                        <TextField value={searchValueLocal}
                                   onChange={e => {
                                       setSearchValueLocal(e.target.value)
                                   }} fullWidth/>
                        <Button color='secondary' size='small' onClick={() => {
                            setSearchAnchor(null)
                            setSearchValue(searchValueLocal)
                        }}>
                            <Search/>
                        </Button>
                        <Button color='secondary' size='small' onClick={() => {
                            setSearchAnchor(null)
                            setSearchValueLocal('')
                            setSearchValue('')
                        }}>
                            <Remove/>
                        </Button>
                    </Stack>
                </Popover>
                <Button
                    size='small'
                    color='secondary'
                    variant='contained'
                    onClick={(e) => {
                        setSearchAnchor(e.currentTarget)
                    }}
                >
                    <Search/>
                    Search Project
                </Button>
                <Popover open={Boolean(filtersAnchor)}
                         anchorOrigin={{
                             vertical: 'bottom',
                             horizontal: 'left',
                         }}
                         anchorEl={filtersAnchor}
                         onClose={() => {
                             setFiltersAnchor(null)
                         }}
                >
                    <Stack width='200px'
                           spacing={2}
                           flexDirection='row'>
                        Show destroyed: <Checkbox checked={showDestroyed} onChange={(_, value) => {
                        setShowDestroyed(value)
                        load()
                    }}/>
                    </Stack>
                </Popover>
                <Button
                    color='secondary'
                    variant='contained'
                    onClick={(e) => {
                        setFiltersAnchor(e.currentTarget)
                    }}
                >
                    <FilterList/>
                    Filters
                </Button>
                <Button
                    color='primary'
                    variant='contained'
                    onClick={() => {
                        drawer.open(<NewProjectDrawer onClose={() => {
                            drawer.close()
                            load()
                        }}/>)
                    }}
                >
                    New Project
                </Button>
            </Stack>
        </Box>

        {loading && <LoadingOverlay/>}

        <Grid mt={2} container spacing={2}>
            {projects.map((item) => <Grid item xs={12} sm={3} lg={3} xl={2}>
                <Card key={item.name}>
                    <Box flex={1} height={'168px'} display='flex' flexDirection='column'>
                        <Box
                            onClick={() => {
                                navigate(`/cloud/projects/${item.id}/goto`)
                            }}
                            flexGrow={1}
                            sx={{
                                cursor: 'pointer',
                            }}>
                            <Box display='flex' flexDirection='row' p={1}>
                                <Typography variant="h5">{item.title || item.name}</Typography>
                                <ArrowForwardIos/>
                            </Box>
                            <Typography variant="body2">{item.owner}</Typography>
                            <Typography variant="body2">{item.description}</Typography>
                        </Box>
                        <hr/>
                        <Box display='flex' flexDirection='row' p={1}>
                            <IconButton
                                onClick={() => {
                                    drawer.open(<EditProjectDrawer
                                        instance={item}
                                        onClose={() => {
                                            drawer.close()
                                            load()
                                        }}/>)
                                }}
                            >
                                <Settings/>
                            </IconButton>
                            <Box flexGrow={1}/>
                            <Typography variant="body2">{item.deploymentStatus}</Typography>
                            <IconButton
                                onClick={() => {
                                    drawer.open(<ProjectInfoDrawer
                                        instance={item}
                                        onClose={() => {
                                            drawer.close()
                                            load()
                                        }}/>)
                                }}
                            >
                                <Info/>
                            </IconButton>
                        </Box>
                    </Box>
                </Card>
            </Grid>)}
        </Grid>
    </Box>
}
