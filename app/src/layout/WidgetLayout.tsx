import {Box, Card, CardContent, CardHeader} from "@mui/material";
import {ReactNode} from "react";

export interface WidgetLayoutProps {
    title?: string
    children: ReactNode
}

export function WidgetLayout(props: WidgetLayoutProps) {
    return <Box>
        <Card sx={{
            minHeight: '150px',
        }}>
            {props.title && <CardHeader title={props.title}/>}
            <CardContent>
                {props.children}
            </CardContent>
        </Card>
    </Box>
}
