import {BaseSyntheticEvent} from "react";

export function getTargetColumn(e: BaseSyntheticEvent<any>) {
    let el: HTMLElement = e.nativeEvent.target as HTMLElement

    while (true) {
        if (!el) {
            break
        }

        if (el.classList.contains('property-th')) {
            return el
        }

        el = el.parentElement as HTMLElement
    }

    return undefined
}

export function coalesce<T>(...args: (T | undefined)[]): T | undefined {
    for (const arg of args) {
        if (arg !== undefined) {
            return arg
        }
    }

    return undefined
}
