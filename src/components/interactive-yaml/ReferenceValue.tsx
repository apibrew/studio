import {PropertyValueProps} from "./PropertyValue";
import {ReferenceValueSelector} from "../ReferenceValueSelector";

export function ReferenceValue(props: PropertyValueProps) {
    return <ReferenceValueSelector
        sx={{
            margin: 0,
            padding: 0,
            display: 'inline-block',
            verticalAlign: 'text-bottom',
            '& .MuiSelect-select': {
                padding: 0,
                margin: 0,
            }
        }}
        variant='standard'
        required={props.property.required}
        reference={props.property.reference}
        value={props.value}
        onChange={props.onChange}/>
}