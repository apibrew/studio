import {Box, Card, CardActions, CardContent, CardHeader} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";
import JsonEditor from "../property-editor/json-editor/JsonEditor.tsx";
import {Property} from "@apibrew/client/model";

export interface JsonEditorDrawerProps {
    title: string
    value: any
    onChange: (value: any) => void
    onClose: () => void
}

export function JsonEditorDrawer(props: JsonEditorDrawerProps) {
    const [value, setValue] = useState(props.value)

    return <Box width='600px'>
        <Card>
            <CardHeader title={props.title}/>
        </Card>
        <CardContent>
            <JsonEditor property={{} as Property} value={value} onChange={setValue}/>
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
