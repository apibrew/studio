import {Box, Button, List, ListItem, Menu, TextField, Typography} from "@mui/material";
import {Add, FolderOutlined, MoreVert, Search, TableChart} from "@mui/icons-material";
import {useRecords, useRepository} from "@apibrew/react";
import {useNavigate} from "react-router-dom";
import {isUserNamespace} from "../../util/namespace.ts";
import {useDrawer} from "../../hooks/use-drawer.tsx";
import {namespaceDrawerMultiDrawer} from "./namespace-drawer/NamespaceDrawer.tsx";
import {Namespace, Resource} from "@apibrew/client/model";
import {NamespaceEntityInfo} from "@apibrew/client/model/namespace";
import {openMultiDrawer} from "./multi-drawer/MultiDrawer.tsx";
import {useState} from "react";
import MenuItem from "@mui/material/MenuItem";
import {ResourceEntityInfo} from "@apibrew/client/model/resource";
import {resourceDrawerMultiDrawer} from "./resource-drawer/ResourceDrawer.tsx";
import toast from "react-hot-toast";
import {handleErrorMessage} from "../../util/errors.ts";
import {useConfirmation} from "../../components/modal/use-confirmation.tsx";

export function ResourcePageSideBar() {
    const [wi, setWi] = useState<number>(0)
    const [searchValue, setSearchValue] = useState<string>('')
    const namespaceRepository = useRepository<Namespace>(NamespaceEntityInfo)
    const resourceRepository = useRepository<Resource>(ResourceEntityInfo)
    const navigate = useNavigate()
    const resources = useRecords<Resource>(ResourceEntityInfo, {limit: 1000}, wi) || []
    const allNamespaces = useRecords<Resource>(NamespaceEntityInfo, {limit: 1000}, wi) || []
    const drawer = useDrawer()
    const confirmation = useConfirmation()

    // menu anchors
    const [namespaceMenuAnchor, setNamespaceMenuAnchor] = useState<null | HTMLElement>(null)
    const [selectedNamespace, setSelectedNamespace] = useState<Namespace | null>(null)
    const [resourceMenuAnchor, setResourceMenuAnchor] = useState<null | HTMLElement>(null)
    const [selectedResource, setSelectedResource] = useState<Resource | null>(null)

    function reload() {
        setWi(wi => wi + 1)
    }

    const namespaces = allNamespaces.map(item => item.name)
        .filter(item => item !== 'default')
        .filter(isUserNamespace)
        .filter((value, index, self) => self.indexOf(value) === index)

    return <Box className='sidesection'>
        {drawer.render()}
        {confirmation.render()}
        <Typography variant='body2'>Resources</Typography>

        <div className="sidesect-div0">

            <Box className='sidesect-div1 flex-center'>
                <Button onClick={() => {
                    openMultiDrawer(drawer, resourceDrawerMultiDrawer(resourceRepository, true, {
                        name: '',
                        namespace: { name: 'default' }
                    } as Resource, () => {
                        reload()
                    }))
                }}>
                    <Add />
                    <span>Resource</span>
                </Button>
                <Button onClick={() => {
                    openMultiDrawer(drawer, namespaceDrawerMultiDrawer(namespaceRepository, true, { name: '' } as Namespace, () => {
                        reload()
                    }))
                }}>
                    <Add />
                    <span>Folder</span>
                </Button>
            </Box>

            <Box className='sidesect-div2'>
                <Search />
                <TextField value={searchValue}
                       onChange={e => {
                           setSearchValue(e.target.value)
                       }}
                       placeholder="Search" />
            </Box>

            <Box className='sidesect-div3'>
                Default
            </Box>

            {resources.length === 0 && <Typography variant='body2'>Loading...</Typography>}

            <List className='sidesect-ul'>
                {resources.filter(item => item.namespace.name === 'default')
                    .filter(item => searchValue === '' || item.name.indexOf(searchValue) !== -1)
                .map(resource => {
                        return <ListItem sx={{ display: 'list-item' }}>
                            <Button onClick={() => {
                                navigate(`resources/default/${resource.name}`)
                            }}>
                                <TableChart />
                                <span>
                                    {resource.name}
                                </span>
                                <MoreVert
                                    aria-controls={Boolean(resourceMenuAnchor) ? 'resource-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={Boolean(resourceMenuAnchor) ? 'true' : undefined}
                                    onClick={(e) => {
                                        setSelectedResource(resource)
                                        setResourceMenuAnchor(e.currentTarget as any);
                                        e.stopPropagation()
                                    }} />
                            </Button>
                        </ListItem>
                    })}
            </List>

            <Box className='sidesect-div3'>
                Folders
            </Box>

            <List className='sidesect-ul'>
                {namespaces.map(namespace => {
                    return <ListItem>
                        <Button>
                            <FolderOutlined />
                            <span>
                                {namespace}
                            </span>
                            <MoreVert
                                aria-controls={Boolean(namespaceMenuAnchor) ? 'namespace-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={Boolean(namespaceMenuAnchor) ? 'true' : undefined}
                                onClick={(e) => {
                                    setSelectedNamespace(allNamespaces.find(item => item.name === namespace) as Namespace)
                                    setNamespaceMenuAnchor(e.currentTarget as any);
                                    e.stopPropagation()
                                }} />
                        </Button>

                        <List>
                            {resources.filter(item => item.namespace.name === namespace)
                                .filter(item => searchValue === '' || item.name.indexOf(searchValue) !== -1)
                            .map(resource => {
                                    return <ListItem>
                                        <Button
                                            onClick={() => {
                                                navigate(`resources/${namespace}/${resource.name}`)
                                            }}>
                                            <TableChart />
                                            <span>
                                                {resource.name}
                                            </span>
                                            <MoreVert
                                                aria-controls={Boolean(resourceMenuAnchor) ? 'resource-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={Boolean(resourceMenuAnchor) ? 'true' : undefined}
                                                onClick={(e) => {
                                                    setSelectedResource(resource)
                                                    setResourceMenuAnchor(e.currentTarget as any);
                                                    e.stopPropagation()
                                                }} />
                                        </Button>
                                    </ListItem>
                                })}
                        </List>
                    </ListItem>
                })}

                <Menu
                    id="namespace-menu"
                    anchorEl={namespaceMenuAnchor}
                    open={Boolean(namespaceMenuAnchor)}
                    onClose={() => {
                        setNamespaceMenuAnchor(null)
                        setSelectedNamespace(null)
                    }}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <MenuItem onClick={() => {
                        openMultiDrawer(drawer, resourceDrawerMultiDrawer(resourceRepository, true, {
                            name: '',
                            namespace: selectedNamespace as Namespace
                        } as Resource, () => {
                            reload()
                        }))
                        setNamespaceMenuAnchor(null)
                        setSelectedNamespace(null)
                    }}>New Resource</MenuItem>
                    <MenuItem onClick={() => {
                        openMultiDrawer(drawer, namespaceDrawerMultiDrawer(namespaceRepository, false, selectedNamespace as Namespace, () => {
                            reload()
                        }))
                        setNamespaceMenuAnchor(null)
                        setSelectedNamespace(null)
                    }}>Update</MenuItem>
                    <MenuItem onClick={() => {
                        confirmation.open({
                            kind: 'danger',
                            title: 'Delete Namespace: ' + selectedNamespace?.name,
                            message: 'Are you sure you want to delete this namespace?',
                            onConfirm: () => {
                                toast.promise(namespaceRepository.delete(selectedNamespace?.id as string), {
                                    loading: 'Deleting namespace...',
                                    success: 'Namespace deleted',
                                    error: err => handleErrorMessage(err, {
                                        'REFERENCE_VIOLATION': 'Namespace is not empty, you must delete all resources first.',
                                    })
                                }).then(() => {
                                    reload()
                                })
                            },
                        })
                        setNamespaceMenuAnchor(null)
                        setSelectedNamespace(null)
                    }}>Delete</MenuItem>
                </Menu>

                <Menu
                    id="resource-menu"
                    anchorEl={resourceMenuAnchor}
                    open={Boolean(resourceMenuAnchor)}
                    onClose={() => {
                        setResourceMenuAnchor(null)
                        setSelectedResource(null)
                    }}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <MenuItem onClick={() => {
                        openMultiDrawer(drawer, resourceDrawerMultiDrawer(resourceRepository, false, selectedResource as Resource, () => {
                            reload()
                        }))
                        setResourceMenuAnchor(null)
                        setSelectedResource(null)
                    }}>Update</MenuItem>
                    <MenuItem onClick={() => {
                        confirmation.open({
                            kind: 'danger',
                            title: 'Delete Resource: ' + selectedNamespace?.name,
                            message: 'Are you sure you want to delete this resource?',
                            onConfirm: () => {
                                toast.promise(resourceRepository.delete(selectedResource?.id as string), {
                                    loading: 'Deleting resource...',
                                    success: 'Resource deleted',
                                    error: err => handleErrorMessage(err, {
                                        'REFERENCE_VIOLATION': 'Resource is not empty, you must delete all records first.',
                                    })
                                }).then(() => {
                                    reload()
                                })
                            },
                        })
                        setResourceMenuAnchor(null)
                        setSelectedResource(null)
                    }}>Delete</MenuItem>
                    <MenuItem onClick={() => {
                        openMultiDrawer(drawer, resourceDrawerMultiDrawer(resourceRepository, true, {
                            ...selectedResource,
                            id: undefined,
                        }, () => {
                            reload()
                        }))
                        setNamespaceMenuAnchor(null)
                        setSelectedNamespace(null)
                    }}>New Copy</MenuItem>
                </Menu>

            </List>

        </div>

    </Box>

}
