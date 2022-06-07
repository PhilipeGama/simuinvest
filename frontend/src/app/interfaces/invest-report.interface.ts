export interface IInvestReport {
    _id?: string,
    fixedIncomeName: string;
    createdAt: Date;
    months: number;
    totalInvest: number;
    fixedIncomeAmount: number;
    savingsAmount: number;
    userId: string;
}