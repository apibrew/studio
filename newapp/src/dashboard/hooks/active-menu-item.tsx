import {useMatches, useParams} from "react-router-dom";
import {MenuItem, menuItems} from "../layout/menu";
import {useEffect, useState} from "react";

const items = menuItems
const subItems = menuItems.flatMap(item => item.children || [])

export interface useActiveMenuItemResult {
    activeItem: MenuItem | null,
    activeSubItem: MenuItem | null
}

export function useActiveMenuItem(): useActiveMenuItemResult {
    const params = useParams()
    const matches = useMatches()

    const connectionName = params['connectionName']

    const [result, setResult] = useState<useActiveMenuItemResult>({activeItem: null, activeSubItem: null})

    useEffect(() => {
        let activeItem: MenuItem | null = null
        let activeSubItem: MenuItem | null = null

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

        for (let i = 0; i < subItems.length; i++) {
            const item = subItems[i]
            if (item.delimiter) {
                continue
            }
            if (matches.some(match => match.pathname.startsWith(item.path!))) {
                activeSubItem = item
            }
            if (matches.some(match => match.pathname.startsWith(`/${connectionName}${item.path}`))) {
                activeSubItem = item
            }
        }

        if (activeSubItem) {
            activeItem = menuItems.find(item => item.children?.includes(activeSubItem)) || null
        }

        setResult({activeItem, activeSubItem})
    }, [params, matches]);

    return result
}
