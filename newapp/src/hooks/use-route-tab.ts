import {useMatches} from "react-router-dom";

export function useRouteTab(): string | undefined {
    const matches = useMatches()

    for (let i = matches.length - 1; i >= 0; i--) {
        const match = matches[i];

        const handle = match.handle as any

        if (handle && handle.tab) {
            return handle.tab;
        }
    }

    return undefined
}