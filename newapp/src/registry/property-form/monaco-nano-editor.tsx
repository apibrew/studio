import {PropertyFormProps, registerCustomPropertyForm} from "core";
import {Type} from "@apibrew/client/model/resource";
import {MonacoNanoForm} from "../../dashboard/components/nano-form/MonacoNanoForm.tsx";

const MonacoNanoEditor = (props: PropertyFormProps<string>) => <MonacoNanoForm code={props.value as string || ''}
                                                                               language='JAVASCRIPT'
                                                                               onChange={value => props.onChange(value, true)}/>

registerCustomPropertyForm<string>("Nano Code", Type.STRING, MonacoNanoEditor)
