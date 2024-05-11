import JSONInput from "react-json-editor-ajrm";
import {localeEn} from "../../data-table/table/json-input";
import {FC} from "react";
import {PropertyFormProps} from "core";

const JsonEditor: FC<PropertyFormProps<object>> = (props: PropertyFormProps<object>) => {
    return <JSONInput
        placeholder={props.value || {}}
        locale={localeEn}
        height='550px'
        width='100%'
        onChange={(e: any) => {
            if (e.error) {
                props.onChange(props.value, false)
                return
            }
            props.onChange(e.jsObject, true)
        }}
    />
};

export default JsonEditor;
