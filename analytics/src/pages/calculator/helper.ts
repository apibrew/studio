export function calculateEndBalance(
    startingAmount: number,
    years: number,
    returnRate: number,
    additionalContribution: number,
    margin: number,
): number {
    let endBalance = startingAmount

    const months = years * 12

    const monthlyReturnRate = monthlyReturnRateFromYearlyReturnRate(returnRate)

    for (let i = 0; i < months; i++) {
        endBalance += additionalContribution
        const interest = endBalance * (monthlyReturnRate / 100) * (1 + margin / 100)
        endBalance += interest
    }

    return endBalance
}

export function monthlyReturnRateFromYearlyReturnRate(yearlyReturnRate: number): number {
    return (Math.pow(1 + yearlyReturnRate / 100, 1 / 12) - 1) * 100
}
