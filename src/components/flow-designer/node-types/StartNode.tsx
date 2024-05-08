import type {NodeProps} from "@reactflow/core/dist/esm/types/nodes";


export const StartNode = (props: NodeProps) => {
    return <div className='node start-node'>
        <div className='node-header'>
            Start
        </div>
    </div>
}
