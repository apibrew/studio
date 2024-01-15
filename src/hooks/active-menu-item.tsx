import {useMatches} from "react-router-dom";
import {MenuItem, menuItems} from "../menu";


export function useActiveMenuItem(): MenuItem {
    const items = menuItems
    const matches = useMatches()

    let activeItem: MenuItem | null = null

    for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (item.delimiter) {
            continue
        }
        if (matches.some(match => match.pathname.startsWith(item.path))) {
            activeItem = item
        }
    }

    return activeItem!
}