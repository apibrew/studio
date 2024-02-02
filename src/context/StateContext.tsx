import React from "react";

export interface StateContextOptions<T> {
    value: T
    onChange: (value: T) => void
}

export const StateContext = React.createContext<StateContextOptions<any> | undefined>(undefined)

export function useStateContext<T>(): [T, (value: T) => void] {
    const context = React.useContext(StateContext) as StateContextOptions<T>

    if (!context) {
        throw new Error('useStateContext must be used within a StateProvider')
    }

    return [context.value, context.onChange]
}