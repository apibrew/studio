import {Box, Button, List, ListItem, TextField, Typography} from "@mui/material";
import {Add, CalendarViewMonth, FolderOutlined, MoreVert, Search} from "@mui/icons-material";
import {useClient} from "@apibrew/react";
import {LoadingOverlay} from "common";
import {useNavigate} from "react-router-dom";
import {usePromise} from "../../hooks/use-promise.tsx";

export function ResourcePageSideBar() {
    const client = useClient()
    const navigate = useNavigate()
    const resources = usePromise(client.listResources())

    if (!resources) {
        return <LoadingOverlay/>
    }

    const namespaces = resources.map(item => item.namespace.name)
        .filter(item => item !== 'default')
        .filter((value, index, self) => self.indexOf(value) === index)

    return <Box className='sidesection'>
        <Typography variant='h5' >Resources</Typography>
        <Box className='sidesect-div1'>
            <Button>
                <Add/> Resource
            </Button>
            <Button>
                <Add/> Folder
            </Button>
        </Box>
        <Box className='sidesect-div2'>
            <Search/>
            <TextField placeholder="Search"/>
        </Box>
        <Box className='sidesect-div3'>
            <Typography variant='body2'>Folders</Typography>
        </Box>
        <List className='sidesect-ul'>
            {resources.filter(item => item.namespace.name === 'default')
                .map(item => {
                    return <ListItem>
                        <Button onClick={() => {
                            navigate(`resources/default/${item.name}`)
                        }}>
                            <CalendarViewMonth/>
                            <span>
                                {item.name}
                            </span>
                            <MoreVert/>
                        </Button>
                    </ListItem>
                })}
            {namespaces.map(namespace => {
                return <ListItem>
                    <Button>
                        <FolderOutlined/>
                        <span>
                            {namespace}
                        </span>
                        <MoreVert/>
                    </Button>

                    <List>
                        {resources.filter(item => item.namespace.name === namespace)
                            .map(item => {
                                return <ListItem>
                                    <Button onClick={() => {
                                        navigate(`resources/${namespace}/${item.name}`)
                                    }}>
                                        <CalendarViewMonth/>
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

        </List>
    </Box>
}
