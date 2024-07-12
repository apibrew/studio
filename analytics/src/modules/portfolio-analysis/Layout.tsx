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
            </List>
        </Box>
        <Box m={1}>
            <Outlet/>
        </Box>
    </Box>
}
