import {EntityInfo} from "@apibrew/client";
import {useEffect, useState} from "react";
import {useClient} from "@apibrew/react";

export function useWatch(entityInfo: EntityInfo,
                         filters?: { [key: string]: string }) {
    const client = useClient()
    const [wi, setWi] = useState(0)

    useEffect(() => {
        const urlParams = new URLSearchParams()
        urlParams.set('use-event-source', 'true')
        if (filters) {
            // Object.keys(filters).forEach(key => {
            //     urlParams.set(key, filters[key])
            // })
        }

        const watchUrl = client.getUrl() + '/' + entityInfo.restPath + '/_watch?' + urlParams.toString()
        const watcher = new EventSource(watchUrl)

        watcher.onmessage = (event) => {
            const data = JSON.parse(event.data)
            console.log('watcher', data)

            if (data.id === 'heartbeat-message') {
                return
            }

            setWi(wi + 1)
        }

        return () => {
            watcher.close()
        }
    }, [entityInfo, filters]);

    return wi

}
