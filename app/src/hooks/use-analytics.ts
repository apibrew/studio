import {useContext, useMemo} from "react";
import {ConnectionContext} from "../context/ConnectionContext";
import {Connection} from "../connection-provider";
import {useActiveMenuItem} from "./active-menu-item";
import {MenuItem} from "../menu";

class Analytics implements AnalyticsHelpers {
    constructor(private connection: Connection | undefined,
                private activeMenu: MenuItem | undefined) {
    }

    registerEvent(event: string, data: any): void {
        gtag('event', event, {
            event_category: 'engagement',
            event_label: data,
            value: data
        })
    }

    click(kind: string, label?: string, value?: any, data?: any) {
        gtag('event', 'click', {
            ...this.params(),
            event_category: kind,
            event_label: label || kind,
            value: value,
            ...data
        })
    }

    params(): { [key: string]: any } {
        return {
            connection: this.connection?.name || 'unknown',
            activeMenu: this.activeMenu?.path || 'unknown'
        }
    }
}

export interface AnalyticsHelpers {
    registerEvent: (event: string, data: any) => void;

    click(kind: string, label?: string, value?: any, data?: any): void;
}

export function useAnalytics(): AnalyticsHelpers {
    const connection = useContext(ConnectionContext);
    const activeMenu = useActiveMenuItem()

    return useMemo(() => new Analytics(connection, activeMenu), [connection, activeMenu])
}

