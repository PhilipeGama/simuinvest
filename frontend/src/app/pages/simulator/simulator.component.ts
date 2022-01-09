import { Component, OnInit } from '@angular/core';

interface FixedInvest {
  name: string,
  rate: number,
  initialDeposit: number,
  monthlyDeposit: number,
  months: number,
  amount: number
}

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.scss']
})

export class SimulatorComponent implements OnInit {


  fixedInvest: FixedInvest = {
    name: '',
    rate: 1,
    initialDeposit: 0.00,
    monthlyDeposit: 0.00,
    months: 0.00,
    amount: 0.00,
  }

  constructor() { }

  ngOnInit(): void {
  }

  // showCalc() {
  //   const { rate, initialDeposit, monthlyDeposit, months } = this.fixedInvest;
  //   let amountInitialDeposit = initialDeposit + (initialDeposit / 100 * rate) * months;

  //   let amountMonthlyDeposit = 0; 

  //   for(let i=0; i < months; i++){
  //     amountMonthlyDeposit += monthlyDeposit + ((monthlyDeposit+amountMonthlyDeposit) / 100 * rate);
  //   }

  //   this.fixedInvest.amount = amountInitialDeposit + amountMonthlyDeposit;
  //   console.log(this.fixedInvest)
  //   console.log("Montante inicial: " + amountInitialDeposit)
  //   console.log("Montante mensal: " + amountMonthlyDeposit)
  // }

  //TODO choose a better name
  showCalc() {
    const { rate, initialDeposit, monthlyDeposit, months } = this.fixedInvest;
    let amountInitialDeposit = initialDeposit + (initialDeposit / 100 * rate) * months;

    let amountMonthlyDeposit = initialDeposit;

    for (let i = 0; i < months; i++) {
      amountMonthlyDeposit += monthlyDeposit + ((monthlyDeposit + amountMonthlyDeposit) / 100 * rate);
    }

    this.fixedInvest.amount = amountInitialDeposit + amountMonthlyDeposit;
    console.log(this.fixedInvest)
    console.log("Montante inicial: " + amountInitialDeposit)
    console.log("Montante mensal: " + amountMonthlyDeposit)
  }
}
