import {useStockDataProvider} from "../../../../data-provider/use-stock-data-provider.tsx";
import {LoadingOverlay} from "common";
import {Box, Button, Table, TableBody, TableHead, TableRow} from "@mui/material";
import {useState} from "react";
import {UserInputGroup} from "../../../../components/user-input-group.tsx";
import {StockData} from "../../../../model/fmp/stock-data.ts";
import {LineChart} from "@mui/x-charts/LineChart";
import {sampleArray} from "../../../../../util/util.ts";

export interface MarginSimulatorParams {
    symbol: string
    fromDate: string
    toDate?: string
    maxMargin: number
    minMargin: number
    initialInvestment: number
    monthlyAddition?: number
    monthlyAdditionCount?: number
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

function calculateOverall(movements: Movement[]): {
    totalMovement: number
    totalPl: number
    endBalance: number
    returnRate: number
    annualReturnRate: number
    returnRateWithoutMargin: number
    annualReturnRateWithoutMargin: number
    totalInvestment: number
} {
    if (movements.length == 0) {
        return {} as never
    }
    const totalMovement = movements[movements.length - 1].currentPrice - movements[0].currentPrice
    const totalPl = movements[movements.length - 1].totalPl
    const endBalance = movements[movements.length - 1].equity
    const totalInvestment = endBalance - totalPl
    const returnRate = endBalance / (totalInvestment)
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
        annualReturnRateWithoutMargin: annualReturnRateWithoutMargin,
        totalInvestment: totalInvestment
    }
    return overall;
}

export function MarginSimulatorPage() {
    const [movements, setMovements] = useState<Movement[]>([])
    const [params, setParams] = useState<MarginSimulatorParams>({
        symbol: 'QQQ',
        fromDate: '2010-01-01',
        maxMargin: 100,
        minMargin: 60,
        initialInvestment: 80000,
        monthlyAddition: 6500,
        monthlyAdditionCount: 12 * 5,
    })

    const dp = useStockDataProvider({
        symbols: ['QQQ'],
        fromDate: '2024-06-01'
    })

    if (dp.loading) {
        return <LoadingOverlay/>
    }


    const overall = calculateOverall(movements);

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
                    {name: 'monthlyAdditionCount', type: 'number', label: 'Monthly Addition Count'},
                ]}/>
        </Box>
        <Button onClick={() => {
            dp.fetch({
                symbols: [params.symbol],
                fromDate: params.fromDate,
                toDate: params.toDate
            })
        }}>
            Load Data ({dp.total})
        </Button>
        <Button onClick={() => {
            setMovements(calculateMovements(params, dp.data))
        }}>
            Calculate
        </Button>

        <h1>Margin Simulator</h1>
        <h3>Overall</h3>
        <Box>
            <Box width='400px'>
                <Table>
                    <TableBody>
                        <TableRow>
                            <td>Total Movement</td>
                            <td>{formatNumber(overall.totalMovement)}</td>
                        </TableRow>
                        <TableRow>
                            <td>Total PL</td>
                            <td>{formatNumber(overall.totalPl)}</td>
                        </TableRow>
                        <TableRow>
                            <td>Total Investment</td>
                            <td>{formatNumber(overall.totalInvestment)}</td>
                        </TableRow>
                        <TableRow>
                            <td>End Balance</td>
                            <td>{formatNumber(overall.endBalance)}</td>
                        </TableRow>
                        <TableRow>
                            <td>Return Rate</td>
                            <td>{formatNumber(overall.returnRate * 100)}%</td>
                        </TableRow>
                        <TableRow>
                            <td>Annual Return Rate</td>
                            <td>{formatNumber(overall.annualReturnRate * 100)}%</td>
                        </TableRow>
                        <TableRow>
                            <td>Return Rate Without Margin</td>
                            <td>{formatNumber(overall.returnRateWithoutMargin * 100)}%</td>
                        </TableRow>
                        <TableRow>
                            <td>Annual Return Rate Without Margin</td>
                            <td>{formatNumber(overall.annualReturnRateWithoutMargin * 100)}%</td>
                        </TableRow>
                    </TableBody>
                </Table>
            </Box>
            <PortfolioProgressChart movements={movements}/>
        </Box>

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
    let remMonthlyAdditionCount = params.monthlyAdditionCount

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

        if (i % 30 == 0 && remMonthlyAdditionCount > 0) {
            additionalEquity += params.monthlyAddition
            remMonthlyAdditionCount--
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

        result.push(movement)

        const currentNeededMargin = 1 + (params.maxMargin + params.minMargin) / 200
        const goodCount = Math.round(equity * currentNeededMargin / item.close)

        console.log(movement)
        console.log('goodCount', goodCount)
        console.log('currentNeededMargin', currentNeededMargin)

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
    if (!n || !n.toFixed) {
        return '---'
    }
    return n.toFixed(2)
}

interface PortfolioProgressChartProps {
    movements: Movement[]
}

function PortfolioProgressChart(props: PortfolioProgressChartProps) {
    const sampleMovements = sampleArray(props.movements, 100, e => new Date(e.date).getTime())

    return <>
        <LineChart
            series={[
                {
                    data: sampleMovements.map(item => item.equity)
                },
            ]}
            height={300}
        />
    </>
}
