import {NanoForm} from "../nano-form/NanoForm";
import React from "react";
import {Box, Button, Card, CardActions, CardContent, CardHeader, Stack} from "@mui/material";
import {Code} from "@apibrew/client/nano/model/code";
import {MonacoNanoForm} from "../nano-form/MonacoNanoForm";

export interface PropertyNanoDrawerProps {
    code: string;
    onChange: (code: string) => void;
    onClose: () => void;
}

export function PropertyNanoDrawer(props: PropertyNanoDrawerProps) {

    const [code, setCode] = React.useState<Code>({
        name: '',
        content: props.code ?? '',
    } as Code)
    return (
        <>
            <Box width='1400px'>
                <Card>
                    <CardHeader title='Edit Code'/>
                </Card>
                <CardContent>
                    <MonacoNanoForm inline={true} code={code} onChange={setCode}/>
                </CardContent>
                <CardActions>
                    <Stack direction='row' spacing={1}>
                        <Button variant='contained'
                                size='small'
                                color='success'
                                onClick={() => {
                                    props.onChange(code.content)
                                    props.onClose()
                                }}>Apply</Button>
                        <Button variant='outlined'
                                size='medium'
                                color='primary'
                                onClick={() => props.onClose()}>Cancel</Button>
                    </Stack>
                </CardActions>
            </Box>
        </>
    )
}
