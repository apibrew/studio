import {Alert, Box, Tab, Tabs} from "@mui/material";
import {useState} from "react";
import {JsonEditor} from "json-edit-react";
import YamlEditor from "@focus-reactive/react-yaml";
import {MultiDrawerProps} from "../../multi-drawer/MultiDrawer.tsx";
import {Resource} from "@apibrew/client/model";
import {ValidateRecords} from "../../../../util/record-validate.ts";

export interface RecordExpandProps<T> {
    resource: Resource
    value: T
    onChange: (updated: T, isValid: boolean) => void
}

export function RecordExpand<T>(props: RecordExpandProps<T>) {

    const [mode, setMode] = useState<string>('JSON')
    const [error, setError] = useState<string | null>()

    function validate(value: T) {
        const errors = ValidateRecords(props.resource, [value], true)

        if (errors.length > 0) {
            setError(errors.map(item => `${item.property}-${item.message}`).join('; '))
            return false
        } else {
            setError(null)
            return true
        }
    }

    return <Box>
        <Tabs value={mode}
              onChange={(_, tab) => {
                  setMode(tab)
              }}>
            <Tab value='JSON' label='JSON'/>
            <Tab value='YAML' label='YAML'/>
        </Tabs>
        {mode === 'JSON' && <Box>
            <JsonEditor data={props.value as any}
                        onError={err => {
                            setError(err.error.message)
                        }}
                        setData={data => {
                            props.onChange(data as T, validate(data as T))
                        }}/>
        </Box>}
        {mode === 'YAML' && <YamlEditor
            json={props.value as any}
            onChange={update => {
                props.onChange(update.json as T, validate(update.json as T))
            }}
            onError={(error: any) => {
                if (error !== true) {
                    setError(error.message)
                }
            }}
        />}
        <br/>
        {error && <Alert severity='error'>{error}</Alert>}
    </Box>
}

export function resourceDrawerMultiDrawer<T extends unknown>(title: string, resource: Resource, value: T, onClose: () => void, onSave: (value: T) => void): MultiDrawerProps<T> {
    return {
        title: title,
        tabs: [
            {
                name: title,
                component: props => <RecordExpand resource={resource} value={props.value} onChange={props.onChange}/>,
                isInitiallyValid: false
            },
        ],
        saveText: 'Update',
        initialValue: value,
        sx: {
            width: '1000px'
        },
        onClose: onClose,
        onSave: (value, onClose) => {
            onSave(value)
            if (onClose) {
                onClose()
            }
        }
    }
}
