import {Box} from "@mui/material";
import {Outlet} from "react-router-dom";

import {PageLayout} from "../../../layout/PageLayout";

export default function UsersAndRolesPage() {
    return (<>
        <PageLayout>
            <Box overflow='auto'>
                <Outlet/>
            </Box>
        </PageLayout>
    </>)
}
