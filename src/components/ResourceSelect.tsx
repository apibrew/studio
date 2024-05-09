import {ListSubheader, MenuItem, Select} from "@mui/material";
import {SelectProps} from "@mui/material/Select/Select";
import {ResourceEntityInfo} from "@apibrew/client/model/resource";
import {Resource, useRecords} from "@apibrew/react";
import {LoadingOverlay} from "./LoadingOverlay";
import {SelectChangeEvent} from "@mui/material/Select/SelectInput";

export interface ResourceSelectProps extends Omit<SelectProps<string>, "onChange"> {
    addAny?: boolean
    onChange: (event: SelectChangeEvent, resource?: Resource) => void
}

export function ResourceSelect(props: ResourceSelectProps) {
    const resources = useRecords<Resource>(ResourceEntityInfo)

    if (!resources) {
        return <LoadingOverlay/>
    }

    const namespaces = resources.map(r => r.namespace.name).filter((v, i, a) => a.indexOf(v) === i)

    let value = props.value

    if (value && value?.split('/').length !== 2) {
        value = 'default/' +  props.value
    }

    return (
        <Select
            {...props as any}
            value={value || ''}
            onChange={e => {
                if (e.target.value === '') {
                    props.onChange(e as any, undefined)
                    return
                }
                const [namespace, name] = (e.target.value as string).split('/')
                const resource = resources.find(r => r.namespace.name === namespace && r.name === name)
                props.onChange(e as any, resource)
            }}
        >
            {props.addAny && <MenuItem value=''>Any</MenuItem>}
            {namespaces.map((namespace) => {
                const elements = resources.filter(item => item.namespace.name === namespace)
                    .map(resource => (
                        <MenuItem
                            value={`${resource.namespace.name}/${resource.name}`}>{resource.name}</MenuItem>
                    ))

                return (
                    [
                        <ListSubheader>{namespace}</ListSubheader>,
                        ...elements
                    ]
                )
            })}
        </Select>
    )
}
