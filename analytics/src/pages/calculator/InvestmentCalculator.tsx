import {Box, TextField} from "@mui/material";
import {useState} from "react";
import {calculateEndBalance} from "./helper.ts";

export function InvestmentCalculator() {
    const [startingAmount, setStartingAmount] = useState<number>(50000)
    const [years, setYears] = useState<number>(10)
    const [returnRate, setReturnRate] = useState<number>(15)
    const [margin, setMargin] = useState<number>(60)
    const [additionalContribution, setAdditionalContribution] = useState<number>(5000)

    const endBalance = calculateEndBalance(startingAmount, years, returnRate, additionalContribution, margin)
    // each month
    const totalContributions = additionalContribution * 12 * years
    const totalInterest = endBalance - startingAmount - totalContributions

    console.log('endBalance', endBalance)
    console.log('totalContributions', totalContributions)
    console.log('totalInterest', totalInterest)

    return <Box>
        <a target='_blank'
           href='https://www.calculator.net/investment-calculator.html?ctype=endamount&ctargetamountv=1%2C000%2C000&cstartingprinciplev=20%2C000&cyearsv=10&cinterestratev=6&ccompound=annually&ccontributeamountv=1%2C000&cadditionat1=end&ciadditionat1=monthly&printit=0#calresult'>
            Investment Calculator
        </a>
        <br/>
        <br/>
        <br/>

        <TextField type='number' label='Starting amount' value={startingAmount}
                   onChange={e => setStartingAmount(Number(e.target.value))}/>
        <TextField type='number' label='Years' value={years} onChange={e => setYears(Number(e.target.value))}/>
        <TextField type='number' label='Return rate' value={returnRate}
                   onChange={e => setReturnRate(Number(e.target.value))}/>
        <TextField type='number' label='Margin' value={margin} onChange={e => setMargin(Number(e.target.value))}/>
        <TextField type='number' label='Additional contribution' value={additionalContribution}
                   onChange={e => setAdditionalContribution(Number(e.target.value))}/>


        <br/>
        <br/>
        <br/>

        <div><b>End balance</b>: {formatMoney(endBalance)}</div>
        <div><b>Total contributions</b>: {formatMoney(totalContributions)}</div>
        <div><b>Total interest</b>: {formatMoney(totalInterest)}</div>
    </Box>
}

function formatMoney(amount: number, locale = 'en-US', currency = 'USD') {
    return new Intl.NumberFormat(locale, {style: 'currency', currency: currency}).format(amount);
}

