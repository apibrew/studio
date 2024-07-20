import {useStockDataProvider} from "../../../../data-provider/use-stock-data-provider.tsx";
import {LoadingOverlay} from "app";
import {Box, Button, Table, TableBody, TableHead, TableRow} from "@mui/material";
import {useMemo, useState} from "react";
import {UserInputGroup} from "../../../../components/user-input-group.tsx";
import {StockData} from "../../../../model/fmp/stock-data.ts";
import {LineChart} from "@mui/x-charts/LineChart";
import {sampleArray} from "../../../../util.ts";

export interface MarginSimulatorParams {
    symbol: string
    fromDate: string
    toDate?: string
    maxMargin: number
    expectedMargin: number
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
    maxLost: number
    maxTotalLost: number
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
    const maxLost = Math.min(0, ...movements.filter(item => item.pl < 0).map(item => item.pl))
    const maxTotalLost = Math.min(0, ...movements.filter(item => item.totalPl < 0).map(item => item.totalPl))

    return {
        totalMovement: totalMovement,
        totalPl: totalPl,
        endBalance: endBalance,
        returnRate: returnRate,
        annualReturnRate: annualReturnRate,
        returnRateWithoutMargin: returnRateWithoutMargin,
        annualReturnRateWithoutMargin: annualReturnRateWithoutMargin,
        totalInvestment: totalInvestment,
        maxLost: maxLost,
        maxTotalLost: maxTotalLost,
    };
}

export function MarginSimulatorPage() {
    const [movements, setMovements] = useState<Movement[]>([])
    const [params, setParams] = useState<MarginSimulatorParams>({
        symbol: 'QQQ',
        fromDate: '2020-01-01',
        maxMargin: 250,
        expectedMargin: 80,
        minMargin: 60,
        initialInvestment: 80000,
        monthlyAddition: 0,
        monthlyAdditionCount: 0,
    })

    const dp = useStockDataProvider({
        symbols: ['QQQ'],
        fromDate: '2020-01-01'
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
                    {name: 'expectedMargin', type: 'number', label: 'Expected Margin'},
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
                        <TableRow>
                            <td>Max Lost</td>
                            <td>{formatNumber(overall.maxLost)}</td>
                        </TableRow>
                        <TableRow>
                            <td>Max Total Lost</td>
                            <td>{formatNumber(overall.maxTotalLost)}</td>
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
                    <th>Market Value</th>
                    <th>Count</th>
                    <th>Change</th>
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
                {movements.map((movement, index) => {
                    const prev = index > 0 ? movements[index - 1] : null
                    return (
                        <TableRow key={movement.date}>
                            <td>{movement.date}</td>
                            <td>{formatNumber(movement.previousPrice)}</td>
                            <td>{formatNumber(movement.currentPrice)}</td>
                            <td>{formatNumber(movement.marketValue)}</td>
                            <td>
                            <span style={{
                                backgroundColor: prev && prev.count < movement.count ? 'green' : prev && prev.count > movement.count ? 'red' : 'transparent'
                            }}>
                                {movement.count}
                            </span>
                            </td>
                            <td>{formatNumber(movement.currentPrice - movement.previousPrice)}</td>
                            <td>{formatNumber(movement.pl)}</td>
                            <td>{formatNumber(movement.totalPl)}</td>
                            <td>{formatNumber(movement.equity)}</td>
                            <td>{formatNumber(movement.marginUsage)}</td>
                            <td>{formatNumber(movement.marginUsagePercentage)}</td>
                            {/*<td>{formatNumber(movement.maintenanceMargin)}</td>*/}
                            {/*<td>{formatNumber(movement.excessEquity)}</td>*/}
                            {/*<td>{formatNumber(movement.sma)}</td>*/}
                        </TableRow>
                    )
                })}
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

    const avgNeededMargin = 1 + params.expectedMargin / 100

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
            marginUsage: marginUsage,
            marginUsagePercentage: marginUsagePercentage,
            maintenanceMargin: 0,
            excessEquity: 0,
            sma: 0
        }

        result.push(movement)

        const currentNeededMargin = 1 + params.expectedMargin / 100
        const goodCount = Math.round(equity * currentNeededMargin / item.close)

        // console.log(movement)
        // console.log('goodCount', goodCount)
        // console.log('currentNeededMargin', currentNeededMargin)

        if (marginUsagePercentage > params.maxMargin) {
            console.log('marginUsagePercentage > params.maxMargin', marginUsagePercentage, params.maxMargin)
            console.log('count', count)
            console.log('goodCount', goodCount)
            count = goodCount
        } else if (marginUsagePercentage < params.minMargin) {
            console.log('marginUsagePercentage < params.minMargin', marginUsagePercentage, params.minMargin)
            console.log('count', count)
            console.log('goodCount', goodCount)
            count = goodCount
        }
        previousPrice = item.close
        i++

        if (equity < 0) {
            break
        }
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
    const sampleMovements = useMemo(() => sampleArray(props.movements, 100, item => item.equity), [props.movements])

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
