import React from "react";
import {useConnection} from "../../context/ConnectionContext";
import {WidgetLayout} from "../../layout/WidgetLayout";
import {Box, Typography} from "@mui/material";

export function WelcomeWidget() {
    const connection = useConnection()

    return <WidgetLayout title={''}>
        <Box>
            <Typography variant='body1'>
                Welcome to {connection.title}
            </Typography>
        </Box>
    </WidgetLayout>
}