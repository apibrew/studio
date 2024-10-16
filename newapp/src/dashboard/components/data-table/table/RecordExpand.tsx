import {Resource} from "@apibrew/react";
import {Box, Tab, Tabs} from "@mui/material";
import {useState} from "react";
import yaml from 'js-yaml';
import {JsonEditor} from "json-edit-react";

export interface RecordExpandProps {
    resource: Resource
    title: string
    value: any
    onChange: (value: any) => void
}

export function RecordExpand(props: RecordExpandProps) {
    const [mode, setMode] = useState<string>('json')

    return <Box width='600px' p={2}>
        <Tabs value={mode}
              onChange={(_, tab) => {
                  setMode(tab)
              }}>
            <Tab value='json-edit' label='Json Editor'/>
            <Tab value='json' label='Json'/>
            <Tab value='yaml' label='Yaml'/>
        </Tabs>
        {mode === 'json-edit' && <Box>
                   <JsonEditor data={props.value}
                               setData={data => {
                                      props.onChange(data)
                               }}/>
                </Box>}
        {mode === 'json' && <pre>
                    {JSON.stringify(props.value, null, 2)}
                </pre>}
        {mode === 'yaml' && <pre>
                    {yaml.dump(props.value, {
                        indent: 2
                    })}
                </pre>}
    </Box>
}
