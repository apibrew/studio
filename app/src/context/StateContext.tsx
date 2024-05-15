import {createContext, useContext} from "react";


export interface StateContextOptions<T> {
    value: T
    onChange: (value: T) => void
}

export const StateContext = createContext<StateContextOptions<any> | undefined>(undefined)

export function useStateContext<T>(): [T, (value: T) => void] {
    const context = useContext(StateContext) as StateContextOptions<T>

    if (!context) {
        throw new Error('useStateContext must be used within a StateProvider')
    }

    return [context.value, context.onChange]
}
