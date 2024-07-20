import {Box, List, ListItemButton} from "@mui/material";
import {Outlet, useNavigate} from "react-router-dom";

export function Layout() {
    const navigate = useNavigate();

    return <Box display='flex' flexDirection='row'>
        <Box width='150px'>
            <List>
                <ListItemButton onClick={() => {
                    navigate('/dashboard/portfolio-analysis/margin-simulator')
                }}>
                    Margin Simulator
                </ListItemButton>
                <ListItemButton onClick={() => {
                    navigate('/dashboard/portfolio-analysis/margin-simulator-2/398657c4-2b9a-4378-aa2f-32ad5d62e9c0')
                }}>
                    Margin Simulator 2
                </ListItemButton>
            </List>
        </Box>
        <Box m={1}>
            <Outlet/>
        </Box>
    </Box>
}
