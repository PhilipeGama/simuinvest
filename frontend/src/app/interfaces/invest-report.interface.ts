export interface IInvestReport {
    _id?: string,
    fixedIncomeName: string;
    initialDate: Date;
    totalMonthsInvest: number;
    totalInvest: number;
    fixedIncomeAmount: number;
    savingsAmount: number;
    userId: string;
}