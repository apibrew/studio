import React from "react";
import {DrawerComponent} from "./DrawerComponent";
import Button from "@mui/material/Button";

export interface ValueDrawerComponentFormProps<T = any> {
    value: T;
    onChange: (value: T) => void;
}

export interface ValueDrawerComponentProps<T = any> {
    title: string;
    value: T;
    onChange: (value: T) => void;
    onClose: () => void;
    component: React.ComponentType<ValueDrawerComponentFormProps<T>>;
}

export function ValueDrawerComponent(props: ValueDrawerComponentProps) {
    const [value, setValue] = React.useState(props.value);


    const Component = props.component;

    return <DrawerComponent
        title={props.title}
        content={<Component value={value} onChange={setValue}/>}
        actions={<>
            <Button
                onClick={() => {
                    props.onChange(value)
                    props.onClose()
                }}
            >
                Save
            </Button>
            <Button
                onClick={() => {
                    setValue(props.value)
                }}
            >
                Reset
            </Button>
            <Button
                onClick={props.onClose}
            >
                Cancel
            </Button>
        </>
        }
    />
}
