import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import IFixedIncome from '../interfaces/fixed-income.interface';
import { IInvestData } from '../interfaces/invest-data.inteface';

@Injectable({
  providedIn: 'root'
})
export class FixedIncomeService {

  dbPath = "fixed-incomes"

  fixedIncomeRef: AngularFireList<IFixedIncome>;
  savingsRate = 0.5141666666666667;
  
  constructor(private db: AngularFireDatabase) {
    this.fixedIncomeRef = db.list(this.dbPath); 
  }

  calculateInvestmentIncome(investData : IInvestData): IInvestData{
    const { initialDeposit, monthlyDeposit, months, fixedIncomeRate } = investData; 

    let amount = initialDeposit + monthlyDeposit;
    let savingsAmount =  initialDeposit + monthlyDeposit; 
    let fixedIncomeAmount =  initialDeposit + monthlyDeposit;

    for (let i = 1; i < months; i++) {
      amount += monthlyDeposit;
      savingsAmount +=  monthlyDeposit + (savingsAmount  * this.savingsRate / 100) ;
      fixedIncomeAmount += monthlyDeposit + (fixedIncomeAmount * fixedIncomeRate  / 100);
    }

    savingsAmount = parseFloat(savingsAmount.toFixed(2));
    fixedIncomeAmount = parseFloat(fixedIncomeAmount.toFixed(2));

    investData.amount = amount;
    investData.savingsAmount = savingsAmount;
    investData.fixedIncomeAmount = fixedIncomeAmount;


    return investData;
  }

  async getFixedIncomes(): Promise<AngularFireList<IFixedIncome>>{
    return this.fixedIncomeRef;
  }
  
}
