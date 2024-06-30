import {Box, Button, List, ListItem, TextField, Typography} from "@mui/material";
import {Add, Search} from "@mui/icons-material";

export function ResourcePageSideBar() {
    return <Box className='sidesection'>
        <Typography variant='h6'>Resources</Typography>
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
            <ListItem>
                <Button>
                    <span>Folder 1</span>
                </Button>
            </ListItem>
            <ListItem>
                <Button>
                    <span>Folder 2</span>
                </Button>
            </ListItem>
            <ListItem>
                <Button>
                    <span>Folder 3</span>
                </Button>
            </ListItem>
            <ListItem>
                <Button>
                    <span>Folder 4</span>
                </Button>
            </ListItem>
        </List>
    </Box>
}
