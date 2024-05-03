import {Property, Resource} from "@apibrew/client/model"
import React from "react";
import {Box, Card, CardActions, CardContent, CardHeader} from "@mui/material";
import Button from "@mui/material/Button";

export interface PropertyEditorProps {
    resource: Resource
    property: Property
    title: string
    value: any
    onApply: (value: any) => void
    onClose: () => void
}

export function PropertyEditor(props: PropertyEditorProps) {
    return <Box>
        <Card>
            <CardHeader title={props.title}/>
            <CardContent>

            </CardContent>
            <CardActions>
                <Button onClick={() => {
                    props.onClose();
                }}>Close</Button>
            </CardActions>
        </Card>
    </Box>
}

// <TagInput
//                     autoOpen={Boolean(props.autoOpen)}
//                     value={updated || []}
//                     onChange={e => {
//                         setUpdated(e)
//                     }}
//                     onClose={() => {
//                         props.onChange(updated)
//                     }}
//                     inputPros={{}}/>
