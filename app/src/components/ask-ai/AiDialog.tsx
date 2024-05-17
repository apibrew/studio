import {Box, Button, Card, CardActions, CardContent, CardHeader, Stack} from "@mui/material";
import {Fragment} from "react";

export interface AskAiProps {
    onClose: () => void
}

export default function AskAi(props: AskAiProps) {

    return (
        <Fragment>
            <Box width='1400px'>
                <Card>
                    <CardHeader title='Edit Code'/>
                </Card>
                <CardContent>

                </CardContent>
                <CardActions>
                    <Stack direction='row' spacing={1}>
                        <Button variant='outlined'
                                size='medium'
                                color='primary'
                                onClick={() => props.onClose()}>Cancel</Button>
                    </Stack>
                </CardActions>
            </Box>
        </Fragment>
    );
}
