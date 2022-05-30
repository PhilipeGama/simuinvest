import { Injectable } from "@angular/core";
import FixedIncome from "src/app/interfaces/IFixedIncome";
import FixedInvest from "src/app/interfaces/IFixedInvest";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { IInvestReport } from "src/app/interfaces/IInvestReport";


@Injectable({
  providedIn: 'root'
})
export class SimulatorService {

  private dbPath = '/investment-report';

  investReportRef: AngularFireList<IInvestReport>;

  constructor(private db: AngularFireDatabase) {
    // this.investReportRef = db.list(this.dbPath);
    this.getFixedIncomes();
  }

  create(investReport: IInvestReport): any {
    return this.investReportRef.push(investReport);
  }

  getAll(): AngularFireList<IInvestReport> {
    return this.investReportRef;
  }

  getInvestReportByUser(email: string): AngularFireList<IInvestReport> {
    this.investReportRef = this.db.list(this.dbPath, ref => ref.orderByChild('email').equalTo(email));
    return this.investReportRef;
  }

  deleteInvestReport(uid: string){
    return this.investReportRef.remove(uid)
  }

  fixedIncomes: FixedIncome[];

  totalInvest: number;

  fixedInvest: FixedInvest = {
    name: '',
    rate: 0,
    initialDeposit: 0,
    monthlyDeposit: 0,
    months: null,
    amount: 0,
  }

  fixedIncomesSavings: FixedInvest = {
    name: 'Poupança',
    rate: 6.17 / 12,
    initialDeposit: 0,
    monthlyDeposit: 0,
    amount: 0,
    months: 0,
  }

  savingsCalculation() {
    const { initialDeposit, monthlyDeposit, months } = this.fixedInvest;

    let amount = initialDeposit + monthlyDeposit;

    this.totalInvest = initialDeposit + (monthlyDeposit * months);

    for (let i = 1; i < months; i++) {
      amount += monthlyDeposit + (amount * (this.fixedIncomesSavings.rate / 100));
    }

    amount = parseFloat(amount.toFixed(2));

    this.fixedIncomesSavings.initialDeposit = initialDeposit
    this.fixedIncomesSavings.amount = amount;
  }

  //TODO: choose a better name
  fixedIncomeCalculation() {
    const { rate, initialDeposit, monthlyDeposit, months } = this.fixedInvest;

    let amount = initialDeposit + monthlyDeposit;

    for (let i = 1; i < months; i++) {
      amount += monthlyDeposit + (amount * (rate / 100));
    }

    amount = parseFloat(amount.toFixed(2));
    this.fixedInvest.amount = amount;
  }

  getFixedIncomes() {
    this.fixedIncomes = [{
      id: 1,
      sigla: 'LCA e LCI',
      name: 'LCA e LCI',
      rate: 11.417 / 12,
      date: new Date('2022-01-01'),
    },
    {
      id: 2,
      sigla: 'Tesouro Selic',
      name: 'Tesouro Selic',
      rate: 11.25 / 12,
      date: new Date('2022-01-01'),
    },
    {
      id: 3,
      sigla: 'CDB e LC ',
      name: 'CDB e LC ',
      rate: 14.7955 / 12,
      date: new Date('2022-01-01'),
    },
    {
      id: 4,
      sigla: 'Tesouro Prefixado',
      name: 'Tesouro Prefixado',
      rate: 11.55 / 12,
      date: new Date('2022-01-01'),
    }]
  }
}