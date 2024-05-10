import {ReactNode} from "react";


export function leftSpace(depth: number): ReactNode {
    const arr = new Array(depth)

    return <>
        {arr.map((_, index) => <span key={index}
                        style={{
                            color: 'rgba(0, 0, 0, 0.24)'
                        }}>&nbsp;-|</span>)}
    </>
}
