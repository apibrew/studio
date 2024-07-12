import {Box, Tab, Tabs} from "@mui/material";
import {useState} from "react";
import {InvestmentCalculator} from "./InvestmentCalculator.tsx";

export function CalculatorPage() {
    const [tab, setTab] = useState('investment-calculator')

    return <Box>
        <Tabs value={tab} onChange={(_, value) => {
            setTab(value)
        }}>
            <Tab value='investment-calculator' label='Investment Calculator'/>
        </Tabs>

        {tab === 'investment-calculator' && <InvestmentCalculator/>}
    </Box>
}
