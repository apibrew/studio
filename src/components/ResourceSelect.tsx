import {ListSubheader, MenuItem, Select} from "@mui/material";
import {SelectProps} from "@mui/material/Select/Select";
import {ResourceEntityInfo} from "@apibrew/client/model/resource";
import {Resource, useRecords} from "@apibrew/react";
import {LoadingOverlay} from "./LoadingOverlay";

export interface ResourceSelectProps extends SelectProps<string> {
}

export function ResourceSelect(props: ResourceSelectProps) {
    const resources = useRecords<Resource>(ResourceEntityInfo)

    if (!resources) {
        return <LoadingOverlay/>
    }

    const namespaces = resources.map(r => r.namespace.name).filter((v, i, a) => a.indexOf(v) === i)

    return (
        <Select
            {...props as any}
            value={props.value || ''}
        >
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
