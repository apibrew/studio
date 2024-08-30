import {Property, Resource} from "@apibrew/client/model"

import {Box, Card, CardActions, CardContent, CardHeader} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";
import {getPropertyFormByProperty, listCustomPropertyForms} from "core";

export interface PropertyEditorProps {
    resource: Resource
    property: Property
    title: string
    value: any
    onApply: (value: any) => void
    onClose: () => void
}

export function getPropertyEditorList(property: Property): string[] {
    return listCustomPropertyForms(property.type).map(item => item.name!)
}


export function PropertyEditor(props: PropertyEditorProps) {
    const [valid, setValid] = useState(true)
    const [value, setValue] = useState(props.value)

    const Form = getPropertyFormByProperty<unknown>(props.property, props.resource)

    return <Box display='flex'>
        <Card style={{
            minWidth: '700px',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
        }}>
            <CardHeader title={props.title}/>
            <CardContent style={{
                flexGrow: 1,
            }}>
                <Box p={3}>
                    <Form
                        property={props.property}
                        value={value}
                        onChange={(updated, isValid) => {
                            setValue(updated)
                            setValid(Boolean(isValid))
                        }}/>
                </Box>
            </CardContent>
            <CardActions>
                <Button onClick={() => props.onClose()}>Cancel</Button>
                <Button onClick={() => setValue(props.value)}>Reset</Button>
                <Button
                    color='primary'
                    disabled={!valid}
                    onClick={() => {
                        props.onApply(value);
                        props.onClose();
                    }}>Apply</Button>
            </CardActions>
        </Card>
    </Box>
}

