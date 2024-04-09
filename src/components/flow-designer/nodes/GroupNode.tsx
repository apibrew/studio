import React from "react";

export interface GroupNodeProps {
    data: {
        label: string
        height: number
    },
    isConnectable: boolean,
    selected: boolean
}

export function GroupNode(props: GroupNodeProps) {
    return <>
        <div style={{
            height: props.data.height + 'px',
            width: '400px',
        }}>
            {props.data.label}
        </div>
    </>
}