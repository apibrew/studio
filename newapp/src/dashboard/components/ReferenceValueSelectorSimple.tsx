import {fromResource, Resource, useRecords} from "@apibrew/react";
import {LoadingOverlay} from "common";
import {label} from "../../util/record";
import {SelectProps} from "@mui/material/Select/Select";

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

    const records = useRecords<any>(fromResource({
        namespace: {
            name: namespace
        },
        name: resourceName,
    } as Resource), {
        limit: 1000,
    })

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

    return <select className="select-div1"
        style={{
            width: '100%',
            height: '30px',
        }}
        {...props as any}
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
