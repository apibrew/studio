import React, {memo} from 'react';
import {Handle, Position} from 'reactflow';
import './CustomNode.scss'
import styled from "@emotion/styled";

const Node = styled.div`
    padding: 10px 20px;
    border-radius: 5px;
    background: ${(props) => '#fff'};
    color: ${(props) => '#000'};

    .react-flow__handle {
        background: ${(props) => '#000'};
        width: 8px;
        height: 10px;
        border-radius: 3px;
    }
`;

export interface CustomNodeProps {
    data: {
        label: string,
        additionalDetails: string,
    },
    isConnectable: boolean,
    selected: boolean
}

export default memo(({data, isConnectable, selected}: CustomNodeProps) => {
    console.log(data)
    return (
        <>
            <div className='details'>
                {data.additionalDetails}
            </div>
            <div className='inner'>
                <Handle
                    type="target"
                    position={Position.Top}
                    style={{background: '#555'}}
                    onConnect={(params) => console.log('handle onConnect', params)}
                    isConnectable={isConnectable}
                />
                {data.label}
                <Handle
                    type="source"
                    position={Position.Bottom}
                    id="a"
                    style={{background: '#555'}}
                    isConnectable={isConnectable}
                />
            </div>
        </>
    );
});