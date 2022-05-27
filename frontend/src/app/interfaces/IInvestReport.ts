export interface IInvestReport {
    uid?: string,
    fixedIncomeName: string;
    initialDate: string;
    totalMonthsInvest: number;
    totInvest: number;
    fixedIncomeAmount: number;
    savingsAmount: number;
    email?: string;
}