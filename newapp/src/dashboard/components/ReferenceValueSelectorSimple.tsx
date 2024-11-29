import {fromResource, Resource} from "@apibrew/react";
import {label} from "../../util/record";
import {SelectProps} from "@mui/material/Select/Select";
import {useCachedRecords} from "../hooks/use-cached-records.ts";

export interface ReferenceValueSelectorSimpleProps {
    required: boolean
    reference: string
    value: any
    onChange: (value: any) => void
}

export function ReferenceValueSelectorSimple(props: ReferenceValueSelectorSimpleProps & SelectProps<any>) {
    const referenceParts = props.reference.split('/')

    const namespace = referenceParts.length === 1 ? 'default' : referenceParts[0]

    const resourceName = referenceParts.length === 1 ? referenceParts[0] : referenceParts[1]

    const records = useCachedRecords<any>(fromResource({
        namespace: {
            name: namespace
        },
        name: resourceName,
    } as Resource), {
        limit: 1000,
    }, 10000)

    if (!records) {
        return '...loading'
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

    return <select className="property-edit-input"
                   style={{
                       height: '30px',
                   }}
                   value={selected?.id || []}
                   onChange={e => {
                       props.onChange(byId(e.target.value as string))
                   }}
    >
        {records.map(record => (
            <option
                key={record.id}
                value={record.id}>{label(record)}</option>
        ))}
    </select>
}
