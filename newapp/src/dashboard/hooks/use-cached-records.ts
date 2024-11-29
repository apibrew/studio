import {Entity, EntityInfo, ListRecordParams} from "@apibrew/client";
import {useEffect, useState} from "react";
import {useErrorHandler, useRepository} from "@apibrew/react";

const cachedRecords: { [key: string]: { records: Entity[], timestamp: number } } = {}

export function useCachedRecords<T extends Entity>(
    entityInfo: EntityInfo,
    params?: ListRecordParams,
    discardMs?: number,
    wi?: number
) {
    const cacheKey = JSON.stringify({entityInfo, params})

    const repository = useRepository<T>(entityInfo)

    const [records, setRecords] = useState<T[]>()
    const errorHandler = useErrorHandler()

    useEffect(() => {
        if (cachedRecords[cacheKey] && (!discardMs || Date.now() - cachedRecords[cacheKey].timestamp < discardMs)) {
            setRecords(cachedRecords[cacheKey].records as T[])
        } else {
            repository.list(params).then((response) => {
                cachedRecords[cacheKey] = {records: response.content, timestamp: Date.now()}
                setRecords(response.content)
            }, errorHandler)
        }
    }, [cacheKey, wi])

    return records
}
