import {Box, Typography} from "@mui/material";
import {PageLayout} from "../../../layout/PageLayout";
import {useParams} from "react-router-dom";

export default function IndexPage() {
    const params = useParams()

    const connectionName = params['connectionName'] as string

    return <>
        <PageLayout>
            <Box m={5}>
                <Typography variant="h5">Welcome to the Dashboard for "{connectionName}"</Typography>
            </Box>
        </PageLayout>
    </>
}