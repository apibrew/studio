import {Instance, InstanceEntityInfo} from "../model/instance";
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
import {useDrawer} from "../../hooks/use-drawer.tsx";
import {NewProjectDrawer} from "../components/NewProjectDrawer.tsx";
import {EditProjectDrawer} from "../components/EditProjectDrawer.tsx";
import {ListRecordParams} from "@apibrew/client";
import {ProjectInfoDrawer} from "../components/ProjectInfoDrawer.tsx";

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

    return <Box className='proj1' width='100%'>
        {drawer.render()}
        <Box justifyContent='space-between' display='flex'>
            <Typography className='fnt-600-30-Inter clr101828'
                        variant='h5'>Projects {!loading && '(' + projects.length + ')'}</Typography>
            <Stack spacing={2} direction='row'>
                <Button
                    size='small'
                    color='secondary'
                    variant='contained'
                    onClick={() => {
                        load()
                    }}
                >
                    <Refresh className="wh-20-20"/>
                    <span className="spn1 fnt-600-16-Inter clr667085">Refresh</span>
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
                    <Search className="wh-20-20"/>
                    <span className="spn1 fnt-600-16-Inter clr667085">Search Project</span>
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
                    <FilterList className="wh-20-20"/>
                    <span className="spn1 fnt-600-16-Inter clr667085">Filters</span>
                </Button>
                <Button className="fnt-600-14-Inter"
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
            {projects.map((item) => <Grid item xs={12} sm={6} lg={3} xl={2}>

                <Card sx={{border: 0, background: 'unset'}} key={item.name}>

                    <Box className="prj1-div1" flex={1} height={'168px'} display='flex' flexDirection='column'>
                        {/* prj1-div1-1 */}
                        <Box display='flex'
                             onClick={() => {
                                 navigate(`/goto/${item.id}`)
                             }}
                             flexGrow={1}
                             sx={{
                                 cursor: 'pointer',
                             }}>

                            <div className="prj1-div1-1-1"></div>

                            <div className="prj1-div1-1-2">

                                <Box className="prj1-div1-1-2-1 flex-center">
                                    <Typography className="fnt-600-18-Inter clr101828"
                                                variant="h5">{item.title || item.name}</Typography>
                                    <ArrowForwardIos className="wh-20-20 clr344054"/>
                                </Box>

                                <Typography className="fnt-400-14-Inter clr475467"
                                            variant="body2">{item.owner}</Typography>
                                <Typography className="fnt-400-14-Inter clr475467"
                                            variant="body2">{item.description?.substr(0, 20)}</Typography>

                            </div>
                        </Box>

                        <hr/>

                        <Box className="prj1-div1-2 flex-center">
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
                            <Typography className="fnt-500-12-Inter" sx={{color: '#6941C6'}}
                                        variant="body2">{item.deploymentStatus?.toLowerCase()}</Typography>
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
