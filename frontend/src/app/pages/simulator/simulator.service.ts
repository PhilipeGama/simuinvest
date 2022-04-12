import { Injectable } from "@angular/core";
import FixedIncome from "src/app/models/IFixedIncome";
import FixedInvest from "src/app/models/IFixedInvest";

@Injectable({
    providedIn: 'root'
})
export class SimulatorService {

    fixedIncomes: FixedIncome[];
  
    fixedInvest: FixedInvest = {
      name: '',
      rate: 1.5,
      initialDeposit: 0,
      monthlyDeposit: 0,
      months: null,
      amount: 0,
    }
  
    fixedIncomesSavings: FixedInvest = {
      name: 'Poupança',
      rate: 0.5,
      initialDeposit: 0,
      monthlyDeposit: 0,
      amount: 0,
      months: 0,
    }
  
    constructor() { 
      this.getFixedIncomes();
    }
  
    
    //TODO: move to service
    savingsCalculation() {
      const { initialDeposit, monthlyDeposit, months } = this.fixedInvest;
  
      let amount = initialDeposit + monthlyDeposit;
  
      for (let i = 1; i < months; i++) {
        amount += monthlyDeposit + (amount * (this.fixedIncomesSavings.rate / 100));
      }
      amount = parseFloat(amount.toFixed(2));
      this.fixedIncomesSavings.initialDeposit = initialDeposit
      this.fixedIncomesSavings.amount = amount;
    }
  
    //TODO: choose a better name, move to service
    fixedIncomeCalculation() {
      const { rate, initialDeposit, monthlyDeposit, months } = this.fixedInvest;
  
      let amount = initialDeposit + monthlyDeposit;
  
      for (let i = 1; i < months; i++) {
        amount += monthlyDeposit + (amount * (rate / 100));
      }
  
      amount = parseFloat(amount.toFixed(2));
      this.fixedInvest.amount = amount;

    }

    getFixedIncomes(){
      this.fixedIncomes = [{
        id: 1,
        sigla: 'LCA',
        name: 'LCA',
        rate: 1.6,
        date: new Date('2022-01-01'),
      },
      {
        id: 2,
        sigla: 'LCI',
        name: 'LCI',
        rate: 1.7,
        date: new Date('2022-01-01'),
      }]
    }
}