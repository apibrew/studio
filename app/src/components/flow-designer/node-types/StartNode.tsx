import type {NodeProps} from "@reactflow/core";


export const StartNode = (_: NodeProps) => {
    return <div className='node start-node'>
        <div className='node-header'>
            Start
        </div>
    </div>
}
