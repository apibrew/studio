import {useStockDataProvider} from "../../../../data-provider/use-stock-data-provider.tsx";
import {LoadingOverlay} from "common";
import {Box, Button, Table, TableBody, TableHead, TableRow} from "@mui/material";
import {useState} from "react";
import {UserInputGroup} from "../../../../components/user-input-group.tsx";
import {StockData} from "../../../../model/fmp/stock-data.ts";

export interface MarginSimulatorParams {
    symbol: string
    fromDate: string
    toDate?: string
    maxMargin: number
    minMargin: number
    initialInvestment: number
    monthlyAddition?: number
}

export interface Movement {
    date: string
    previousPrice: number
    currentPrice: number
    count: number
    marketValue: number
    cash: number
    pl: number
    totalPl: number
    equity: number
    marginUsage: number
    marginUsagePercentage: number
    maintenanceMargin: number
    excessEquity: number
    sma: number
}

export function MarginSimulatorPage() {
    const [params, setParams] = useState<MarginSimulatorParams>({
        symbol: 'QQQ',
        fromDate: '2020-01-01',
        maxMargin: 100,
        minMargin: 60,
        initialInvestment: 40000,
        monthlyAddition: 0
        // monthlyAddition: 6500
    })

    const dp = useStockDataProvider({
        symbols: ['QQQ'],
        fromDate: '2024-06-01'
    })

    if (dp.loading) {
        return <LoadingOverlay/>
    }

    const movements = calculateMovements(params, dp.data)

    const totalMovement = movements[movements.length - 1].currentPrice - movements[0].currentPrice
    const totalPl = movements[movements.length - 1].totalPl
    const endBalance = movements[movements.length - 1].equity
    const returnRate = endBalance / (endBalance - totalPl)
    const annualReturnRate = Math.pow(returnRate, 1 / (movements.length / 252)) - 1

    const returnRateWithoutMargin = movements[movements.length - 1].currentPrice / movements[0].currentPrice
    const annualReturnRateWithoutMargin = Math.pow(returnRateWithoutMargin, 1 / (movements.length / 252)) - 1

    const overall = {
        totalMovement: totalMovement,
        totalPl: totalPl,
        endBalance: endBalance,
        returnRate: returnRate,
        annualReturnRate: annualReturnRate,
        returnRateWithoutMargin: returnRateWithoutMargin,
        annualReturnRateWithoutMargin: annualReturnRateWithoutMargin
    }

    return <>
        <Box m={1}>
            <UserInputGroup
                value={params}
                onChange={changedParams => {
                    setParams(changedParams)
                }}
                inputs={[
                    {name: 'symbol', type: 'text', label: 'Symbol'},
                    {name: 'fromDate', type: 'text', label: 'From Date'},
                    {name: 'toDate', type: 'text', label: 'To Date'},
                    {name: 'maxMargin', type: 'number', label: 'Max Margin'},
                    {name: 'minMargin', type: 'number', label: 'Min Margin'},
                    {name: 'initialInvestment', type: 'number', label: 'Initial Investment'},
                    {name: 'monthlyAddition', type: 'number', label: 'Monthly Addition'},
                ]}/>
        </Box>
        <Button onClick={() => {
            dp.fetch({
                symbols: [params.symbol],
                fromDate: params.fromDate,
                toDate: params.toDate
            })
        }}>
            Calculate
        </Button>

        <h1>Margin Simulator</h1>
        <h3>Overall</h3>
        <Table>
            <TableBody>
                <TableRow>
                    <th>Total Movement</th>
                    <td>{formatNumber(overall.totalMovement)}</td>
                </TableRow>
                <TableRow>
                    <th>Total PL</th>
                    <td>{formatNumber(overall.totalPl)}</td>
                </TableRow>
                <TableRow>
                    <th>End Balance</th>
                    <td>{formatNumber(overall.endBalance)}</td>
                </TableRow>
                <TableRow>
                    <th>Return Rate</th>
                    <td>{formatNumber(overall.returnRate * 100)}%</td>
                </TableRow>
                <TableRow>
                    <th>Annual Return Rate</th>
                    <td>{formatNumber(annualReturnRate * 100)}%</td>
                </TableRow>
                <TableRow>
                    <th>Return Rate Without Margin</th>
                    <td>{formatNumber(overall.returnRateWithoutMargin * 100)}%</td>
                </TableRow>
                <TableRow>
                    <th>Annual Return Rate Without Margin</th>
                    <td>{formatNumber(annualReturnRateWithoutMargin * 100)}%</td>
                </TableRow>
            </TableBody>
        </Table>

        <h3>Movements</h3>
        <Table>
            <TableHead>
                <TableRow>
                    <th>Date</th>
                    <th>Previous Price</th>
                    <th>Current Price</th>
                    <th>Count</th>
                    <th>Market Value</th>
                    <th>Cash</th>
                    <th>PL</th>
                    <th>Total PL</th>
                    <th>Equity</th>
                    <th>Margin Usage</th>
                    <th>Margin Usage %</th>
                    {/*<th>Maintenance Margin</th>*/}
                    {/*<th>Excess Equity</th>*/}
                    {/*<th>SMA</th>*/}
                </TableRow>
            </TableHead>
            <TableBody>
                {movements.map(movement => (
                    <TableRow key={movement.date}>
                        <td>{movement.date}</td>
                        <td>{formatNumber(movement.previousPrice)}</td>
                        <td>{formatNumber(movement.currentPrice)}</td>
                        <td>{movement.count}</td>
                        <td>{formatNumber(movement.marketValue)}</td>
                        <td>{formatNumber(movement.cash)}</td>
                        <td>{formatNumber(movement.pl)}</td>
                        <td>{formatNumber(movement.totalPl)}</td>
                        <td>{formatNumber(movement.equity)}</td>
                        <td>{formatNumber(movement.marginUsage)}</td>
                        <td>{formatNumber(movement.marginUsagePercentage)}</td>
                        {/*<td>{formatNumber(movement.maintenanceMargin)}</td>*/}
                        {/*<td>{formatNumber(movement.excessEquity)}</td>*/}
                        {/*<td>{formatNumber(movement.sma)}</td>*/}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </>
}

function calculateMovements(params: MarginSimulatorParams, stockDataItems: StockData[]): Movement[] {
    if (stockDataItems.length == 0) {
        return []
    }

    const result: Movement[] = []

    // Calculate movements here

    const avgNeededMargin = 1 + (params.maxMargin + params.minMargin) / 200

    let count: number = Math.round(params.initialInvestment * avgNeededMargin / stockDataItems[0].close)

    let previousPrice = stockDataItems[0].close
    const initialEquity = params.initialInvestment
    let additionalEquity = 0;
    let totalPl = 0
    let i = 0;

    for (const item of stockDataItems) {
        const pl = (item.close - previousPrice) * count
        totalPl += pl
        const equity = additionalEquity + initialEquity + totalPl
        const cash = equity - count * item.close
        let marginUsage = count * item.close - equity
        if (marginUsage < 0) {
            marginUsage = 0
        }
        const marginUsagePercentage = marginUsage * 100 / equity

        if (i % 30 == 0) {
            additionalEquity += params.monthlyAddition
        }

        const movement: Movement = {
            date: item.date,
            previousPrice: previousPrice,
            currentPrice: item.close,
            count: count,
            marketValue: count * item.close,
            equity: equity,
            pl: pl,
            totalPl: totalPl,
            cash: cash,
            marginUsage: marginUsage,
            marginUsagePercentage: marginUsagePercentage,
            maintenanceMargin: 0,
            excessEquity: 0,
            sma: 0
        }

        console.log(item.date, movement)

        result.push(movement)

        const currentNeededMargin = 1 + (params.maxMargin + params.minMargin) / 200
        const goodCount = Math.round(equity * currentNeededMargin / item.close)

        // count = goodCount

        if (marginUsagePercentage > params.maxMargin) {
            count = goodCount
        } else if (marginUsagePercentage < params.minMargin) {
            count = goodCount
        }
        previousPrice = item.close
        i++
    }

    return result;
}

function formatNumber(n: number): string {
    if (!n.toFixed) {
        return '---'
    }
    return n.toFixed(2)
}
