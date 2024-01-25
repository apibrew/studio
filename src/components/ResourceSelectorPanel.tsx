import {
    Box,
    FormControl,
    Icon,
    IconButton,
    InputLabel,
    List,
    ListItem,
    ListItemButton,
    Menu,
    MenuItem,
    Select,
    Typography
} from "@mui/material";
import React, {useState} from "react";
import {Namespace, Resource, useRecords} from "@apibrew/react";
import {NamespaceEntityInfo} from "@apibrew/client/model/namespace";
import {ResourceEntityInfo} from "@apibrew/client/model/resource";
import {LoadingOverlay} from "./LoadingOverlay";
import {MoreVert, TableChart} from "@mui/icons-material";
import {useNavigate, useParams} from "react-router-dom";
import {useDrawer} from "../hooks/use-drawer";
import {NamespaceDrawer} from "./namespace-drawer/NamespaceDrawer";
import Button from "@mui/material/Button";
import {ResourceDrawer} from "./resource-drawer/ResourceDrawer";

export function ResourceSelectorPanel() {
    const params = useParams()
    const navigate = useNavigate()
    const drawer = useDrawer()

    const [namespace, setNamespace] = useState<Namespace>({
        name: 'default'
    } as Namespace)

    const [resourceContextAnchorEl, setResourceContextAnchorEl] = React.useState<HTMLElement>();
    const [selectedResource, setSelectedResource] = React.useState<Resource>()

    const [wi, setWi] = useState<number>(0)

    const namespacesAll = useRecords<Namespace>(NamespaceEntityInfo, {
        limit: 1000,
    }, wi)
    const resourcesAll = useRecords<Resource>(ResourceEntityInfo, {
        limit: 1000,
    }, wi)

    const namespaces = namespacesAll ? namespacesAll.filter(item => item.name !== 'nano' && item.name !== 'testing') : undefined
    const resources = resourcesAll ? resourcesAll.filter(item => item.namespace.name === namespace.name) : undefined

    const loaded = namespaces && resources

    return <>
        {drawer.render()}
        <Box id='left-top-bar'
             sx={{
                 height: '31px',
                 padding: '8px 16px',
                 borderBottom: '1px solid #e6e8ec',
                 flexDirection: 'row',
                 display: 'flex',
             }}>
            <Typography sx={{
                fontSize: '16px',
                padding: '4px',
                textAlign: 'center'
            }}>
                Resource Selector
            </Typography>
        </Box>
        {!loaded && <LoadingOverlay/>}
        {namespaces && resources && <Box sx={{
            padding: '16px',
        }}>
            <FormControl fullWidth
                         size='small'
                         variant='filled'
            >
                <InputLabel>Namespace</InputLabel>
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
            </FormControl>
            <List style={{
                width: '108%',
            }}>
                {resources.map(resource => {
                    const isActive = params.resource === resource.name

                    return <ListItem key={resource.name}
                                     disablePadding
                                     value={resource.name}>
                        <ListItemButton sx={{
                            padding: 0,
                            borderRadius: '3px',
                            backgroundColor: isActive ? '#D2E6FAFF' : 'transparent',
                        }}
                                        onClick={() => {
                                            navigate(`/dashboard/resources/${namespace.name}/${resource.name}`)
                                        }}>
                            <Icon sx={{
                                marginRight: 0.6
                            }}>
                                <TableChart color='secondary' fontSize='small'/>
                            </Icon>
                            <Typography color='primary' flexGrow={1} overflow={'hidden'}>{resource.name}</Typography>
                            <IconButton
                                size='small'
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setResourceContextAnchorEl(e.currentTarget)
                                    setSelectedResource(resource)
                                }}>
                                <MoreVert/>
                            </IconButton>
                        </ListItemButton>
                    </ListItem>
                })}
            </List>
            <Box textAlign='center'>
                <Button
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
                                                namespace: namespace
                                            } as Resource}/>
                        )
                    }}>
                    Create resource
                </Button>
            </Box>
        </Box>}


        {resourceContextAnchorEl && <Menu
            id="basic-menu"
            anchorEl={resourceContextAnchorEl}
            open={Boolean(resourceContextAnchorEl)}
            onClose={() => {
                setResourceContextAnchorEl(undefined)
            }}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            <MenuItem onClick={() => {
                drawer.open(
                    <ResourceDrawer
                        new={false}
                        onClose={() => {
                            drawer.close()
                            setWi(wi + 1)
                        }}
                        resource={selectedResource!}/>
                )
                setResourceContextAnchorEl(undefined)
            }}>Update Resource</MenuItem>
        </Menu>}
    </>;
}