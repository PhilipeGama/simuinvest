import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartBarComponent } from 'src/app/components/chart-bar/chart-bar.component';
import FixedIncome from 'src/app/models/FixedIncome';
import FixedInvest from 'src/app/models/FixedInvest';

// interface FixedInvest {
//   name: string,
//   rate: number,
//   initialDeposit: number,
//   monthlyDeposit: number,
//   months: number,
//   amount: number
// }




@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.scss'],
})

export class SimulatorComponent implements OnInit {

  @ViewChild(ChartBarComponent)
  child: ChartBarComponent = new ChartBarComponent;

  selectedFixedIncome: FixedIncome = {
    id: 0,
    sigla: '',
    name: '',
    rate: 0,
    date: new Date(),
  };

  fixedIncomes: FixedIncome[] = [{
    id: 1,
    sigla: 'LCA',
    name: 'LCA',
    rate: 1.5,
    date: new Date('2022-01-01'),
  },
  {
    id: 1,
    sigla: 'LCI',
    name: 'LCI',
    rate: 1.5,
    date: new Date('2022-01-01'),
  }]

  fixedInvest: FixedInvest = {
    name: '',
    rate: 1.5,
    initialDeposit: null,
    monthlyDeposit: 0,
    months: 0,
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

  chartDataMockup: any[] = [
    {
      fixedIncome: 'Poupança',
      initialValue: 0,
      amount: 0,
      mounts: 0,
    },
    {
      fixedIncome: 'Poupança',
      initialValue: 0,
      amount: 0,
      mounts: 0,
    }
  ]


  constructor() { }

  ngOnInit(): void {
  }

  savingsCalculation() {
    const { initialDeposit, monthlyDeposit, months } = this.fixedInvest;

    let amount = initialDeposit + monthlyDeposit;

    for (let i = 1; i < months; i++) {
      amount += monthlyDeposit + (amount * (this.fixedIncomesSavings.rate / 100));
    }
    amount = parseFloat(amount.toFixed(2));
    this.fixedIncomesSavings.amount = amount;

    this.chartDataMockup[0].fixedIncome = this.fixedIncomesSavings.name;
    this.chartDataMockup[0].mounts = months;
    this.chartDataMockup[0].initialValue = initialDeposit + monthlyDeposit;
    this.chartDataMockup[0].amount = amount;
  }

  //TODO: choose a better name, move to service
  fixedIncomeCalculation() {
    this.savingsCalculation();
    const { rate, initialDeposit, monthlyDeposit, months } = this.fixedInvest;

    let amount = initialDeposit + monthlyDeposit;

    for (let i = 1; i < months; i++) {
      amount += monthlyDeposit + (amount * (rate / 100));
    }

    amount = parseFloat(amount.toFixed(2));
    this.fixedInvest.amount = amount;

    this.chartDataMockup[1].fixedIncome = this.selectedFixedIncome.sigla;
    this.chartDataMockup[1].mounts = months;
    this.chartDataMockup[1].initialValue = initialDeposit + monthlyDeposit;
    this.chartDataMockup[1].amount = amount;

    this.child.loadChart();
  }



}
