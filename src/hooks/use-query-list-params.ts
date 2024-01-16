import {useState} from "react";
import {ListRecordParams} from "@apibrew/client";
import {URLSearchParamsInit, useSearchParams} from "react-router-dom";

function prepareListRecordParamsFromQuerySearch(searchParams: URLSearchParams): ListRecordParams {
    const result: ListRecordParams = {}

    if (searchParams.has("limit")) {
        const limit = parseInt(searchParams.get("limit")!)

        if (limit > 0) {
            result.limit = limit
        }
    }

    if (searchParams.has("offset")) {
        const offset = parseInt(searchParams.get("offset")!)

        if (offset > 0) {
            result.offset = offset
        }
    }

    if (searchParams.has("query")) {
        const query = JSON.parse(searchParams.get("query")!)

        if (query) {
            result.query = query
        }
    }

    return result
}

function prepareQuerySearchFromListRecordParams(params: ListRecordParams): URLSearchParamsInit {
    const result: URLSearchParamsInit = {}

    if (params.limit) {
        result.limit = params.limit.toString()
    }

    if (params.offset) {
        result.offset = params.offset.toString()
    }

    if (params.query) {
        result.query = JSON.stringify(params.query)
    }

    return result
}

export function useQueryListParams(defaultValues: ListRecordParams = {}) {
    const [searchParams, setSearchParams] = useSearchParams();

    const [listParams, setListParams] = useState<ListRecordParams>({
        ...defaultValues,
        ...prepareListRecordParamsFromQuerySearch(searchParams)
    });

    const setListParamsWrapped = (params: ListRecordParams) => {
        setListParams(params)

        setSearchParams(prepareQuerySearchFromListRecordParams(params))
    }


    return [listParams, setListParamsWrapped] as const;
}
