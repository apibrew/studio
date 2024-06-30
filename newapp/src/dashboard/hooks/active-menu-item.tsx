import {useMatches, useParams} from "react-router-dom";
import {MenuItem, menuItems} from "../layout/menu";


export function useActiveMenuItem(): MenuItem | undefined {
    const params = useParams()
    const items = menuItems
    const matches = useMatches()

    const connectionName = params['connectionName']

    let activeItem: MenuItem | null = null

    for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (item.delimiter) {
            continue
        }
        if (matches.some(match => match.pathname.startsWith(item.path!))) {
            activeItem = item
        }
        if (matches.some(match => match.pathname.startsWith(`/${connectionName}${item.path}`))) {
            activeItem = item
        }
    }

    return activeItem!
}
