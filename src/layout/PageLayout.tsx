import Container from "@mui/material/Container";
import {Box} from "@mui/material";
import {ReactNode} from "react";

export interface PageLayoutProps {
    children: ReactNode;
    disableTopMargin?: boolean;
}

export function PageLayout(props: PageLayoutProps) {
    return (
        <Container maxWidth='xl'>
            <Box marginTop={props.disableTopMargin ? 0 : 3}>
                {props.children}
            </Box>
        </Container>
    )
}
