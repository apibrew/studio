import React from 'react';
import {TextField} from "@mui/material";

type EditorProps = {
    value: string;
    onChange: (data: string) => void;
};

const TextEditor: React.FC<EditorProps> = ({value, onChange}) => {
    return <TextField
        value={value}
        onChange={(e) => onChange(e.target.value)}
        variant="filled"
        type="text"
        rows={20}
        multiline
        fullWidth
    />
};

export default TextEditor;
