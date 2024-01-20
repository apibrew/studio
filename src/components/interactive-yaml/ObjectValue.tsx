import {PropertyValueProps} from "./PropertyValue";

export function ObjectValue(props: PropertyValueProps) {
    return <>
        {JSON.stringify(props.value)}
    </>
}