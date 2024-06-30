import {useEffect, useState} from "react";

export function usePromise<T>(value$: Promise<T>, ...deps: any[]): T | undefined {
    const [value, setValue] = useState<T | undefined>(undefined)

    useEffect(() => {
        value$.then(setValue)
    }, deps)

    return value
}
