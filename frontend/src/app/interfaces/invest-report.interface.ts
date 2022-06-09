export interface IInvestReport {
    _id?: string,
    fixedIncomeName: string;
    createdAt: string;
    months: number;
    totalInvest: number;
    fixedIncomeAmount: number;
    savingsAmount: number;
    userId: string;
}