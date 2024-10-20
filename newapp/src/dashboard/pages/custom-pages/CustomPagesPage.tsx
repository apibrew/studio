import {useParams, useSearchParams} from "react-router-dom";
import {useStudioSettings} from "../../context/studio-settings.tsx";
import {Box} from "@mui/material";

export function CustomPagesPage() {
    const params = useParams();
    const settings = useStudioSettings();
    const [searchParams] = useSearchParams()

    const route = params.route

    const pageParams = settings.customPages?.find(page => page.route === route || page.route === '/' + route)

    if (!pageParams) {
        return <h1>Page not found: {route}</h1>
    }

    let location = pageParams.location

    for (const key of searchParams.keys()) {
        const value = searchParams.get(key)

        if (value && location.indexOf('{' + key + '}') !== -1) {
            location = location.replace('{' + key + '}', value)
        }
    }

    return (
        <Box m={3}>
            <iframe src={location}
                    style={{width: '100%', height: "calc(100vh - 130px)", border: 0}}/>
        </Box>
    );
}
