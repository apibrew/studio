import {TextField} from "@mui/material";
import {FC} from "react";

type EditorProps = {
    value: string;
    onChange: (data: string) => void;
};

const TextEditor: FC<EditorProps> = ({value, onChange}) => {
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
