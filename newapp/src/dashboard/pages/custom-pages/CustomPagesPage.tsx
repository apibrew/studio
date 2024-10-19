import {useParams} from "react-router-dom";
import {useStudioSettings} from "../../context/studio-settings.tsx";
import {Box} from "@mui/material";

export function CustomPagesPage() {
    const params = useParams();
    const settings = useStudioSettings();

    const route = params.route

    const pageParams = settings.customPages?.find(page => page.route === route || page.route === '/' + route)

    if (!pageParams) {
        return <h1>Page not found</h1>
    }

    return (
        <Box m={3}>
            <iframe src={pageParams.location} style={{width: '100%', height: "calc(100vh - 130px)", border: 0}}/>
        </Box>
    );
}
