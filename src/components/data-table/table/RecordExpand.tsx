import {Resource} from "@apibrew/react";
import {Box, Tab, Tabs} from "@mui/material";
import React, {useState} from "react";
import yaml from 'js-yaml';

export interface RecordExpandProps {
    resource: Resource
    title: string
    value: any
}

export function RecordExpand(props: RecordExpandProps) {
    const [value, setValue] = React.useState(props.value)
    const [mode, setMode] = useState<string>('json')

    return <Box width='600px' p={2}>
        <Tabs value={mode}
              onChange={(e, tab) => {
                  setMode(tab)
              }}>
            <Tab value='json' label='Json'/>
            <Tab value='yaml' label='Yaml'/>
        </Tabs>
        {mode === 'json' && <pre>
                    {JSON.stringify(value, null, 2)}
                </pre>}
        {mode === 'yaml' && <pre>
                    {yaml.dump(value, {
                        indent: 2
                    })}
                </pre>}
    </Box>
}
