import {Resource} from "@apibrew/react";
import {useEffect} from "react";
import {JsonEditor} from "json-edit-react";

export interface ResourceFormProps {
    value: Resource
    onChange: (Resource: Resource, isValid: boolean) => void
}

export function ResourceSourceForm(props: ResourceFormProps) {
    function validate(): boolean {
        return true
    }

    useEffect(() => {
        props.onChange(props.value, validate())
    }, [props.value]);

    return (
        <JsonEditor
            data={props.value}
            setData={update => {
                console.log('update', update)
                props.onChange(update as Resource, true)
            }}
        />
    )
}
