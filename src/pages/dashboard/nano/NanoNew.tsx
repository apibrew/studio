import {Box, Card, CardActions, CardContent, CardHeader} from "@mui/material";
import {NanoForm} from "../../../components/nano-form/NanoForm";
import Button from "@mui/material/Button";
import React, {useState} from "react";
import {Code} from "@apibrew/client/nano/model/code";

export function NanoNew() {
    const [code, setCode] = useState<Code>({
        name: '',
        content: '',
    } as Code)
    return <>
        <Box m={1}>
            <Card>
                <CardHeader title='New Nano Code'/>
                <CardContent>
                    <NanoForm
                        code={code}
                        onChange={setCode}/>
                </CardContent>
                <CardActions>
                    <Button color='success'>Save</Button>
                    <Button color='info'>Cancel</Button>
                </CardActions>
            </Card>
        </Box>
    </>
}