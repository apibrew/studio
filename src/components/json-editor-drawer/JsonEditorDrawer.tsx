import {Box, Card, CardActions, CardContent, CardHeader} from "@mui/material";
import React from "react";
import JSONInput from "react-json-editor-ajrm";
import {localeEn} from "../data-table/table/json-input";
import Button from "@mui/material/Button";

export interface JsonEditorDrawerProps {
    title: string
    value: any
    onChange: (value: any) => void
    onClose: () => void
}

export function JsonEditorDrawer(props: JsonEditorDrawerProps) {
    const [value, setValue] = React.useState(props.value)

    console.log(value)

    return <Box width='600px'>
        <Card>
            <CardHeader title={props.title}/>
        </Card>
        <CardContent>
            <JSONInput locale={localeEn}
                       height='400px'
                       width='100%'
                       placeholder={value}
                       onBlur={(e: any) => {
                           if (e.error) {
                               return
                           }
                           setValue(e.jsObject)
                       }}/>
        </CardContent>
        <CardActions>
            <Button onClick={props.onClose}>Cancel</Button>
            <Button onClick={() => {
                props.onChange(undefined)
                props.onClose()
            }} color='primary'>Unset</Button>
            <Button onClick={() => {
                props.onChange(value)
                props.onClose()
            }} color='primary'>Update</Button>
        </CardActions>
    </Box>
}
