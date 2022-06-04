import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import IFixedIncome from '../interfaces/fixed-income.interface';
import FixedInvest from '../interfaces/fixed-invest.interface';

@Injectable({
  providedIn: 'root'
})
export class FixedIncomeService {

  fixedIncomes: IFixedIncome[];

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

  dbPath = "fixed-income"

  fixedIncomeRef: AngularFireList<IFixedIncome>;

  constructor(private afd: AngularFireDatabase) {
    this.fixedIncomeRef = afd.list(this.dbPath);
    this.getFixedIncomes1();
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


  save() {
    const fixed = this.afd.list(this.dbPath)
    for (let f of this.fixedIncomes) {
      fixed.push(f)
    }

  }

  getFixedIncomes(): AngularFireList<IFixedIncome>{
    return this.fixedIncomeRef;
  }


  getFixedIncomes1() {
    const currentDate = new Date();
    console.log(currentDate)
    this.fixedIncomes = [
      {
        _id: '1',
        name: 'Poupança',
        rate: 6.17 / 12,
        createdAt: currentDate,
      },
      {
        _id: '2',
        name: 'LCA e LCI',
        rate: 11.417 / 12,
        createdAt: currentDate,
      },
      {
        _id: '3',
        name: 'Tesouro Selic',
        rate: 11.25 / 12,
        createdAt: currentDate,
      },
      {
        _id: '4',
        name: 'CDB e LC ',
        rate: 14.7955 / 12,
        createdAt: currentDate,
      },
      {
        _id: '5',
        name: 'Tesouro Prefixado',
        rate: 11.55 / 12,
        createdAt: currentDate,
      }]
  }


}
