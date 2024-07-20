import {
    useStockDataProvider,
} from "../../../../data-provider/use-stock-data-provider.tsx";
import {LoadingOverlay} from "app";
import {Box, Button, Table, TableBody, TableHead, TableRow} from "@mui/material";
import {useEffect, useMemo, useState} from "react";
import {UserInputGroup} from "../../../../components/user-input-group.tsx";
import {LineChart} from "@mui/x-charts/LineChart";
import {sampleArray} from "../../../../util.ts";
import {useParams} from "react-router-dom";
import {useClient} from "@apibrew/react";
import {BackTrackSimulator} from "../../../../logic/back-track-simulator.ts";
import {Client} from "@apibrew/client";
import {SymbolMovement} from "../../../../model/backtrack/symbol-movement.ts";
import {Order} from "../../../../model/backtrack/order.ts";
import {StockData} from "../../../../model/fmp/stock-data.ts";

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

export function MarginSimulator2Page() {
    const [wi, setWi] = useState(0)
    const pageParams = useParams()
    const client = useClient()
    const backTrackSimulator = useMemo(() => new BackTrackSimulator(client as Client), [client])

    useEffect(() => {
        backTrackSimulator.load(pageParams.id)
    }, [backTrackSimulator, pageParams.id]);

    const [params, setParams] = useState<MarginSimulatorParams>({
        symbol: 'QQQ',
        fromDate: '2014-01-01',
        maxMargin: 80,
        expectedMargin: 80,
        minMargin: 60,
        initialInvestment: 0,
        monthlyAddition: 4000,
        monthlyAdditionCount: 12 * 5,
    })

    const dp = useStockDataProvider({
        symbols: ['QQQ'],
        fromDate: '2024-06-01'
    })

    if (dp.loading) {
        return <LoadingOverlay/>
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
            addOrders(backTrackSimulator, dp.data, params)
            backTrackSimulator.calculate()
            setWi(wi + 1)
        }}>
            Calculate ({wi})
        </Button>

        <h1>Margin Simulator</h1>
        <h3>backTrackSimulator.result</h3>
        <Box>
            {backTrackSimulator.result && <Box width='400px'>
                <Table>
                    <TableBody>
                        <TableRow>
                            <td>Total Movement</td>
                            <td>{formatNumber(backTrackSimulator.result.totalMovement)}</td>
                        </TableRow>
                        <TableRow>
                            <td>Total PL</td>
                            <td>{formatNumber(backTrackSimulator.result.totalPl)}</td>
                        </TableRow>
                        <TableRow>
                            <td>Total Investment</td>
                            <td>{formatNumber(backTrackSimulator.result.totalDeposit)}</td>
                        </TableRow>
                        <TableRow>
                            <td>End Balance</td>
                            <td>{formatNumber(backTrackSimulator.result.endBalance)}</td>
                        </TableRow>
                        <TableRow>
                            <td>Return Rate</td>
                            <td>{formatNumber(backTrackSimulator.result.returnRate * 100)}%</td>
                        </TableRow>
                        <TableRow>
                            <td>Annual Return Rate</td>
                            <td>{formatNumber(backTrackSimulator.result.annualReturnRate * 100)}%</td>
                        </TableRow>
                        <TableRow>
                            <td>Return Rate Without Margin</td>
                            <td>{formatNumber(backTrackSimulator.result.returnRateWithoutMargin * 100)}%</td>
                        </TableRow>
                        <TableRow>
                            <td>Annual Return Rate Without Margin</td>
                            <td>{formatNumber(backTrackSimulator.result.annualReturnRateWithoutMargin * 100)}%</td>
                        </TableRow>
                    </TableBody>
                </Table>
            </Box>}
            {backTrackSimulator.symbolMovements &&
                <PortfolioProgressChart movements={backTrackSimulator.symbolMovements}/>}
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
                {backTrackSimulator.symbolMovements?.map(movement => (
                    <TableRow key={movement.date}>
                        <td>{movement.date}</td>
                        <td>{formatNumber(movement.previousPrice)}</td>
                        <td>{formatNumber(movement.currentPrice)}</td>
                        <td>{movement.count}</td>
                        <td>{formatNumber(movement.marketValue)}</td>
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

async function addOrders(backTrackSimulator: BackTrackSimulator, stockDataItems: StockData[], params: MarginSimulatorParams) {
    if (stockDataItems.length == 0) {
        return []
    }

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

        const currentNeededMargin = 1 + params.expectedMargin / 100
        const goodCount = Math.round(equity * currentNeededMargin / item.close)

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
}

function formatNumber(n: number): string {
    if (!n || !n.toFixed) {
        return '---'
    }
    return n.toFixed(2)
}

interface PortfolioProgressChartProps {
    movements: SymbolMovement[]
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
