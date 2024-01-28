import {MenuItem, Select} from "@mui/material";
import {fromResource, Resource, useRecords} from "@apibrew/react";
import {LoadingOverlay} from "./LoadingOverlay";
import {label} from "../util/record";
import {SelectProps} from "@mui/material/Select/Select";

export interface ReferenceValueSelectorProps extends SelectProps<any> {
    required: boolean
    reference: string
    value: any
    onChange: (value: any) => void
}

export function ReferenceValueSelector(props: ReferenceValueSelectorProps) {
    const referenceParts = props.reference.split('/')

    const namespace = referenceParts.length === 1 ? 'default' : referenceParts[0]

    const resourceName = referenceParts.length === 1 ? referenceParts[0] : referenceParts[1]

    const records = useRecords<any>(fromResource({
        namespace: {
            name: namespace
        },
        name: resourceName,
    } as Resource))

    if (!records) {
        return <LoadingOverlay/>
    }

    const selected = records.find(record => {
        if (props.value) {
            for (const key in props.value) {
                if (typeof props.value[key] === 'object') {
                    continue
                }
                if (props.value[key] !== record[key]) {
                    return false
                }
            }

            return true;
        }

        return false;
    })

    const byId = (id: string) => records.find(record => record.id === id)

    return <Select
        size='small'
        {...props as any}
        value={selected?.id || ''}
        onChange={e => {
            props.onChange(byId(e.target.value as string))
        }}
    >
        {records.map(record => (
            <MenuItem
                key={record.id}
                value={record.id}>{label(record)}</MenuItem>
        ))}
    </Select>
}