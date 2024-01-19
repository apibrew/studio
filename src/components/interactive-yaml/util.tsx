import React from "react";

export function leftSpace(depth: number): React.ReactNode {
    const arr = new Array(depth)

    return <>
        {arr.fill(<>&nbsp;</>)}
    </>
}