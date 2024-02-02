import {MenuItem, Select} from "@mui/material";
import {fromResource, Resource, useRecords} from "@apibrew/react";
import {LoadingOverlay} from "./LoadingOverlay";
import {label} from "../util/record";
import {SelectProps} from "@mui/material/Select/Select";

export interface ReferenceMultiValueSelectorProps extends Omit<Omit<SelectProps<any[]>, "value">, "onChange"> {
    required: boolean
    reference: string
    value: any[]
    onChange: (value: any[]) => void
}

export function ReferenceMultiValueSelector(props: ReferenceMultiValueSelectorProps) {
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

    const selected = records.filter(record => {
        return props.value.some(value => {
            if (value) {
                for (const key in value) {
                    if (typeof value[key] === 'object') {
                        continue
                    }
                    if (value[key] !== record[key]) {
                        return false
                    }
                }

                return true;
            }

            return false;
        })
    }).map(record => record.id)

    const byId = (id: string) => records.find(record => record.id === id)

    return <Select
        size='small'
        {...props as any}
        value={selected}
        onChange={e => {
            const list = e.target.value as any[]
            props.onChange(list.map(item => byId(item as string)))
        }}
    >
        {records.map(record => (
            <MenuItem
                key={record.id}
                value={record.id}>{label(record)}</MenuItem>
        ))}
    </Select>
}