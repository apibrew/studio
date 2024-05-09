import React from 'react';
import JSONInput from "react-json-editor-ajrm";
import {localeEn} from "../../data-table/table/json-input";

type EditorProps = {
    value: any;
    setIsValid: (isValid: boolean) => void;
    onChange: (data: any) => void;
};

const JsonEditor: React.FC<EditorProps> = (props) => {
    return <JSONInput
        placeholder={props.value}
        locale={localeEn}
        height='550px'
        width='100%'
        onChange={(e: any) => {
            if (e.error) {
                props.setIsValid(false)
                return
            }
            props.setIsValid(true)
            props.onChange(e.jsObject)
        }}
    />
};

export default JsonEditor;
