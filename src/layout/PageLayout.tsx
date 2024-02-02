import React from "react";
import Container from "@mui/material/Container";
import {Box} from "@mui/material";

export interface PageLayoutProps {
    children: React.ReactNode;
}

export function PageLayout(props: PageLayoutProps) {
    return (
        <Container maxWidth='xl'>
            <Box marginTop={3}>
                {props.children}
            </Box>
        </Container>
    )
}