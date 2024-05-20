import {PropertyFormProps, registerCustomPropertyForm} from "core";
import {MonacoNanoForm} from "../../components/nano-form/MonacoNanoForm.tsx";
import {Type} from "@apibrew/client/model/resource";

const MonacoNanoEditor = (props: PropertyFormProps<string>) => <MonacoNanoForm code={props.value as string || ''}
                                                                               language='JAVASCRIPT'
                                                                               onChange={value => props.onChange(value, true)}/>

registerCustomPropertyForm<string>("Nano Code", Type.STRING, MonacoNanoEditor)
