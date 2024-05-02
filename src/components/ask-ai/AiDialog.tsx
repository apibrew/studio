import * as React from 'react';
import {Box, Button, Card, CardActions, CardContent, CardHeader, Stack} from "@mui/material";

export interface AskAiProps {
    onClose: () => void
}

export default function AskAi(props: AskAiProps) {

    return (
        <React.Fragment>
            <Box width='1400px'>
                <Card>
                    <CardHeader title='Edit Code'/>
                </Card>
                <CardContent>

                </CardContent>
                <CardActions>
                    <Stack direction='row' spacing={1}>
                        <Button variant='contained'
                                size='small'
                                color='success'
                                onClick={() => {
                                    props.onClose()
                                }}>Apply</Button>
                        <Button variant='outlined'
                                size='medium'
                                color='primary'
                                onClick={() => props.onClose()}>Cancel</Button>
                    </Stack>
                </CardActions>
            </Box>
        </React.Fragment>
    );
}
