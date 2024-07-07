import {ReactNode, useEffect, useState} from "react";
import {TablePagination} from "@mui/material";
import {EntityInfo} from "@apibrew/client/entity-info";
import {ListRecordParams} from "@apibrew/client";
import {useQueryListParams, useRepository} from "@apibrew/react";
import toast from "react-hot-toast";

export interface useDataProviderResult<T> {
    records: T[]
    loading: boolean
    renderPagination: () => ReactNode
    listParams: ListRecordParams
    updateParams: (params: Partial<ListRecordParams>) => void
    refresh: () => void
}

const initParams = {
    limit: 10,
    offset: 0
}

export function useDataProvider<T>(entityInfo: EntityInfo, defaultParams?: Partial<ListRecordParams>, gwi?: number): useDataProviderResult<T> {
    const repository = useRepository(entityInfo)
    const [listParams, setListParams] = useQueryListParams({...initParams, ...defaultParams})
    const [records, setRecords] = useState<any[]>([])
    const [total, setTotal] = useState<number>()
    const loading = total === undefined
    const [wi, setWi] = useState(gwi || 0)

    useEffect(() => {
        setRecords([])
        setTotal(undefined)
        repository.list(listParams).then((resp) => {
            setRecords(resp.content)
            setTotal(resp.total)
        }, err => {
            toast.error(err.message)
        })
    }, [entityInfo.restPath, listParams, wi, gwi]);

    return {
        updateParams: (params: Partial<ListRecordParams>) => {
            setListParams({
                ...listParams,
                ...params
            })
        },
        refresh: () => {
            setWi(wi + 1)
        },
        listParams,
        records: records || [],
        loading: loading || false,
        renderPagination: () => (
            <>
                {!loading && <TablePagination component="div"
                                              count={total!}
                                              showFirstButton={true}
                                              showLastButton={true}
                                              page={Math.ceil(listParams.offset! / listParams.limit!)}
                                              rowsPerPage={listParams.limit!}
                                              rowsPerPageOptions={[10, 25, 50, 100, 1000]}
                                              onRowsPerPageChange={(event) => {
                                                  setListParams({
                                                      ...listParams,
                                                      limit: parseInt(event.target.value)
                                                  })
                                              }}
                                              onPageChange={(_, page) => {
                                                  setListParams({
                                                      ...listParams,
                                                      offset: (page * listParams.limit!)
                                                  })
                                              }}/>}
            </>
        )
    }
}
