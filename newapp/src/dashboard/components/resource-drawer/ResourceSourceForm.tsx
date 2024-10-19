import {Resource} from "@apibrew/react";
import {useEffect, useState} from "react";
import {Box, Tab, Tabs} from "@mui/material";
import {JsonEditor} from "json-edit-react";
import YamlEditor from "@focus-reactive/react-yaml";

export interface ResourceFormProps {
    value: Resource
    onChange: (Resource: Resource, isValid: boolean) => void
}

export function ResourceSourceFormWrapper(props: ResourceFormProps) {
    function validate(): boolean {
        return true
    }

    useEffect(() => {
        props.onChange(props.value, validate())
    }, [props.value]);

    return (
        <ResourceSourceForm value={props.value} onChange={props.onChange}/>
    )
}

export function ResourceSourceForm(props: ResourceFormProps) {
    function validate(): boolean {
        return true
    }

    useEffect(() => {
        props.onChange(props.value, validate())
    }, [props.value]);

    const [tab, setTab] = useState('JSON')

    return (
        <Box>
            <Tabs value={tab}
                  onChange={(_, tab) => {
                      setTab(tab)
                  }}>
                <Tab value='JSON' label='JSON'/>
                <Tab value='YAML' label='YAML'/>
            </Tabs>
            {tab === 'JSON' && <JsonEditor
                data={props.value}
                setData={update => {
                    console.log('update', update)
                    props.onChange(update as Resource, true)
                }}
            />}
            {tab === 'YAML' && <YamlEditor
                json={props.value}
                onChange={update => {
                    console.log('update', update)
                    props.onChange(update.json as Resource, true)
                }}
            />}
        </Box>
    )
}
