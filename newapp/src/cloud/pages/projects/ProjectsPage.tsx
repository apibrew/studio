import {Instance, InstanceEntityInfo} from "../../model/instance";
import {LoadingOverlay} from "common";

import {Badge, Box, Card, Grid, IconButton, Popover, Stack, Typography} from "@mui/material";
import {Direction, useWatcher} from "@apibrew/react";
import {BooleanExpression} from "@apibrew/client/model/permission";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {ArrowForwardIos, FilterList, Info, Refresh, Remove, Search, Settings} from "@mui/icons-material";
import {useState} from "react";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import {useDataProvider} from "../../../dashboard/components/data-provider/use-data-provider.tsx";
import {useDrawer} from "../../../hooks/use-drawer.tsx";
import {NewProjectDrawer} from "../../components/NewProjectDrawer.tsx";

export function ProjectsPage() {
    const navigate = useNavigate()
    const drawer = useDrawer()

    const wi = useWatcher(InstanceEntityInfo)
    const [showDestroyed, setShowDestroyed] = useState(false)

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
        query = {} as BooleanExpression
    }

    const params = {
        query: query,
        limit: 1000,
        resolveReferences: ['$.plan'],
        sorting: [{
            property: 'auditData.createdOn',
            direction: Direction.DESC
        }]
    }

    const data = useDataProvider<Instance>(InstanceEntityInfo, params, wi);

    const [searchAnchor, setSearchAnchor] = useState<null | HTMLElement>(null)
    const [filtersAnchor, setFiltersAnchor] = useState<null | HTMLElement>(null)
    const [searchValueLocal, setSearchValueLocal] = useState('')
    const [searchValue, setSearchValue] = useState('')

    const projects = (data.records || []).filter(item => {
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
            <Typography variant='h5'>Projects ({projects && projects.length})</Typography>
            <Stack spacing={2} direction='row'>
                <Button
                    size='small'
                    color='secondary'
                    variant='contained'
                    onClick={() => {
                        data.refresh()
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
                        data.refresh()
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
                            data.refresh()
                        }}/>)
                    }}
                >
                    New Project
                </Button>
            </Stack>
        </Box>

        {data.loading && <LoadingOverlay/>}

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

                                }}
                            >
                                <Settings/>
                            </IconButton>
                            <Box flexGrow={1}/>
                            <Badge>
                                <Typography variant="body2">{item.deploymentStatus}</Typography>
                            </Badge>
                            <Info/>
                        </Box>
                    </Box>
                </Card>
            </Grid>)}
        </Grid>
    </Box>
}
