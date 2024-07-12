import {StockData, StockDataEntityInfo} from "../model/fmp/stock-data.ts";
import {Direction, ListRecordParams, useRepository} from "@apibrew/react";
import {useEffect, useState} from "react";
import {BooleanExpression} from "@apibrew/client/model/permission";
import {BooleanExpressionBuilder} from "@apibrew/client";

export interface useStockDataProviderParams {
    symbols?: string[]
    date?: string
    fromDate?: string
    toDate?: string
}

export interface useStockDataProviderInterface {
    fetch: (params: useStockDataProviderParams) => void
    loading: boolean
    total: number
    data: StockData[]
}

export function useStockDataProvider(initialParams?: useStockDataProviderParams): useStockDataProviderInterface {
    const [params, setParams] = useState<useStockDataProviderParams | undefined>(initialParams)

    const fetchFn = function (newParams: useStockDataProviderParams) {
        setParams(newParams)
    }

    const [result, setResult] = useState<useStockDataProviderInterface>({
        loading: true,
        total: 0,
        data: [],
        fetch: fetchFn
    })

    const repository = useRepository<StockData>(StockDataEntityInfo)

    useEffect(() => {
        console.log('Fetching stock data', params)

        if (params) {
            setResult({
                loading: true,
                total: 0,
                data: [],
                fetch: fetchFn
            })
            const criterias: BooleanExpression[] = []

            if (params.symbols && params.symbols.length > 0) {
                criterias.push(BooleanExpressionBuilder.in('symbol', params.symbols))
            }

            if (params.date) {
                criterias.push(BooleanExpressionBuilder.eq('date', params.date))
            } else {
                if (params.fromDate) {
                    criterias.push(BooleanExpressionBuilder.greaterThanOrEqual('date', params.fromDate))
                }

                if (params.toDate) {
                    criterias.push(BooleanExpressionBuilder.lessThanOrEqual('date', params.toDate))
                }
            }

            const listParams: ListRecordParams = {
                sorting: [
                    {
                        direction: Direction.ASC,
                        property: 'date'
                    }
                ],
                limit: 10000,
            }

            if (criterias.length > 0) {
                listParams.query = {
                    and: criterias,
                } as BooleanExpression
            }

            repository.list(listParams)
                .then(resp => {
                    setResult({
                        loading: false,
                        total: resp.total,
                        data: resp.content,
                        fetch: fetchFn
                    })
                }, err => {
                    console.error('Error fetching stock data', err)
                    setResult({
                        loading: false,
                        total: 0,
                        data: [],
                        fetch: fetchFn
                    })
                })
        }

    }, [params]);

    return result
}
