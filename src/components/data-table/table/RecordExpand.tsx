import {Resource} from "@apibrew/react";
import {Box, Card, CardActions, CardContent, CardHeader} from "@mui/material";
import React from "react";
import JSONInput from 'react-json-editor-ajrm';
import {localeEn} from "./json-input";
import Button from "@mui/material/Button";

export interface RecordExpandProps {
    resource: Resource
    title: string
    value: any
    onApply: (updated: any) => void
    onClose: () => void
}

export function RecordExpand(props: RecordExpandProps) {
    const [value, setValue] = React.useState(props.value)

    return <Box>
        <Card>
            <CardHeader title={props.title}/>
            <CardContent>
                <JSONInput
                    id='a_unique_id'
                    placeholder={value}
                    onChange={(e: any) => {
                        setValue(e.jsObject)
                    }}
                    locale={localeEn}
                    height='550px'
                />
            </CardContent>
            <CardActions>
                <Button onClick={() => {
                    props.onApply(value);
                    props.onClose();
                }}>Apply</Button>
                <Button onClick={() => props.onClose()}>Cancel</Button>
                <Button onClick={() => setValue(props.value)}>Reset</Button>
            </CardActions>
        </Card>
    </Box>
}
