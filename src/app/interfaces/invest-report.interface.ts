export interface IInvestReport {
    _id?: string,
    fixedIncomeName: string;
    months: number;
    totalInvest: number;
    fixedIncomeAmount: number;
    savingsAmount: number;
    createdAt: string;
    userId: string;
}