import {DrawerComponent} from "./DrawerComponent";
import Button from "@mui/material/Button";
import {ComponentType, useState} from "react";

export interface ValueDrawerComponentFormProps<T = any> {
    value: T;
    onChange: (value: T) => void;
}

export interface ValueDrawerComponentProps<T = any> {
    title: string;
    value: T;
    onChange: (value: T) => void | Promise<void>;
    onClose: () => void;
    component: ComponentType<ValueDrawerComponentFormProps<T>>;
}

export function ValueDrawerComponent(props: ValueDrawerComponentProps) {
    const [value, setValue] = useState(props.value);


    const Component = props.component;

    return <DrawerComponent
        title={props.title}
        content={<Component value={value} onChange={setValue}/>}
        actions={<>
            <Button
                onClick={() => {
                    const res = props.onChange(value)

                    if (res === void 0 || res === null || !res.then) {
                        props.onClose()
                        return
                    }

                    res.then(() => {
                        props.onClose()
                    }).catch(() => {})
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
