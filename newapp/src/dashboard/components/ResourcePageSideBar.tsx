import {Box, Button, List, ListItem, Menu, TextField, Typography} from "@mui/material";
import {Add, FolderOutlined, MoreVert, Search, TableChart} from "@mui/icons-material";
import {useRecords, useRepository} from "@apibrew/react";
import {LoadingOverlay} from "common";
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
import {useConfirmation} from "./modal/use-confirmation.tsx";

export function ResourcePageSideBar() {
    const [wi, setWi] = useState<number>(0)
    const namespaceRepository = useRepository<Namespace>(NamespaceEntityInfo)
    const navigate = useNavigate()
    const resources = useRecords<Resource>(ResourceEntityInfo, {limit: 1000}, wi)
    const allNamespaces = useRecords<Resource>(NamespaceEntityInfo, {limit: 1000}, wi)
    const drawer = useDrawer()
    const confirmation = useConfirmation()

    // menu anchors
    const [namespaceMenuAnchor, setNamespaceMenuAnchor] = useState<null | HTMLElement>(null)
    const [selectedNamespace, setSelectedNamespace] = useState<Namespace | null>(null)

    if (!resources || !allNamespaces) {
        return <LoadingOverlay/>
    }

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

        <Box className='sidesect-div1'>
            <Button>
                <Add/>
                <span>Resource</span>
            </Button>
            <Button onClick={() => {
                openMultiDrawer(drawer, namespaceDrawerMultiDrawer(namespaceRepository, true, {name: ''} as Namespace, () => {
                    reload()
                }))
            }}>
                <Add/>
                <span>Folder</span>
            </Button>
        </Box>

        <Box className='sidesect-div2'>
            <Search/>
            <TextField placeholder="Search"/>
        </Box>

        <Box className='sidesect-div3'>
            <Typography variant='body2'>Default</Typography>
        </Box>

        <List className='sidesect-ul'>
            {resources.filter(item => item.namespace.name === 'default')
                .map(item => {
                    return <ListItem sx={{display: 'list-item'}}>
                        <Button onClick={() => {
                            navigate(`resources/default/${item.name}`)
                        }}>
                            <TableChart/>
                            <span>
                                {item.name}
                            </span>
                            <MoreVert onClick={e => {
                                e.stopPropagation()
                            }}/>
                        </Button>
                    </ListItem>
                })}
        </List>

        <Box className='sidesect-div3'>
            <Typography variant='body2'>Folders</Typography>
        </Box>


        <List className='sidesect-ul'>
            {namespaces.map(namespace => {
                return <ListItem>
                    <Button>
                        <FolderOutlined/>
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
                            }}/>
                    </Button>

                    <List>
                        {resources.filter(item => item.namespace.name === namespace)
                            .map(item => {
                                return <ListItem>
                                    <Button
                                        onClick={() => {
                                            navigate(`resources/${namespace}/${item.name}`)
                                        }}>
                                        <TableChart/>
                                        <span>
                                            {item.name}
                                        </span>
                                        <MoreVert/>
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
                            namespaceRepository.delete(selectedNamespace?.id as string).then(() => {
                                reload()
                            })
                        },
                    })
                    setNamespaceMenuAnchor(null)
                    setSelectedNamespace(null)
                }}>Delete</MenuItem>
            </Menu>

        </List>
    </Box>
}
