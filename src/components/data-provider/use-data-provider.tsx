import React, {useEffect, useState} from "react";
import {TablePagination} from "@mui/material";
import {useQueryListParams} from "../../hooks/use-query-list-params";
import {EntityInfo} from "@apibrew/client/entity-info";
import {ListRecordParams} from "@apibrew/client";
import {useRepository} from "@apibrew/react";
import toast from "react-hot-toast";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";

export interface useDataProviderResult<T> {
    records: T[]
    loading: boolean
    renderPagination: () => React.ReactNode
}

const initParams = {
    limit: 10,
    offset: 0
}

export function useDataProvider<T>(entityInfo: EntityInfo, defaultParams?: Partial<ListRecordParams>): useDataProviderResult<T> {
    const repository = useRepository(entityInfo)
    const [listParams, setListParams] = useQueryListParams({...initParams, ...defaultParams})
    const [records, setRecords] = useState<any[]>([])
    const [total, setTotal] = useState<number>()
    const loading = total === undefined

    useEffect(() => {
        setRecords([])
        setTotal(undefined)
        repository.list(listParams).then((resp) => {
            setRecords(resp.content)
            setTotal(resp.total)
        }, err => {
            toast.error(err.message)
        })
    }, [entityInfo, listParams]);

    return {
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
                                              onRowsPerPageChange={(event) => {
                                                  setListParams({
                                                      ...listParams,
                                                      limit: parseInt(event.target.value)
                                                  })
                                              }}
                                              onPageChange={(event, page) => {
                                                  setListParams({
                                                      ...listParams,
                                                      offset: (page * listParams.limit!)
                                                  })
                                              }}/>}
            </>
        )
    }
}