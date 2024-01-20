import React from "react";

export function leftSpace(depth: number): React.ReactNode {
    const arr = new Array(depth)

    return <>
        {arr.fill(<span style={{
            color: 'rgba(0, 0, 0, 0.24)'
        }}>&nbsp;-|</span>)}
    </>
}