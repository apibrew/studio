import {Flow} from "../../model/flow";
import {FlowDesigner} from "../flow-designer/FlowDesigner";

export interface FlowFormProps {
    flow: Flow
    onChange: (flow: Flow) => void
}

export function FlowForm(props: FlowFormProps) {
    return <>
        <FlowDesigner flow={props.flow}
                      onChange={props.onChange}/>
    </>
}
