import { Injectable } from '@angular/core';
import FixedIncome from '../interfaces/IFixedIncome';
import FixedInvest from '../interfaces/IFixedInvest';

@Injectable({
  providedIn: 'root'
})
export class FixedIncomeService {

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

  
  constructor() {
    this.getFixedIncomes();
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


  saveFixedIncomes(){

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
