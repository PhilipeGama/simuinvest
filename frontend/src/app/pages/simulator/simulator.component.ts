import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ChartBarComponent } from 'src/app/components/chart-bar/chart-bar.component';
import { SimulatorService } from './simulator.service';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.scss'],
})

export class SimulatorComponent implements OnInit {
  selectFixedIncomeControl = new FormControl('', Validators.required)
  mounthsControl = new FormControl('', Validators.required)

  fixedInvest;
  fixedIncomesSavings;
  fixedIncomes;

  mounth = [0, 3 ,6, 12, 24, 48]
  @ViewChild(ChartBarComponent)
  child: ChartBarComponent = new ChartBarComponent;
  
  chartDataMockup: any[];

  constructor(private simulatorService: SimulatorService) { }

  ngOnInit(): void {
    
    this.chartDataMockup = [
      {
        fixedIncome: 'Poupança',
        initialValue: 0,
        amount: 0,
        mounts: 0,
      },
      {
        fixedIncome: 'X',
        initialValue: 0,
        amount: 0,
        mounts: 0,
      }
    ]


    this.fixedInvest = this.simulatorService.fixedInvest;
    this.fixedIncomesSavings = this.simulatorService.fixedIncomesSavings;
    this.fixedIncomes = this.simulatorService.fixedIncomes;

  }
  
  //TODO: move to service
  onSavingsCalculation() {
    this.simulatorService.fixedInvest.rate = this.selectFixedIncomeControl.value.rate;
    this.simulatorService.fixedIncomeCalculation();
    this.simulatorService.savingsCalculation();

    this.fixedInvest.name = this.selectFixedIncomeControl.value.sigla;

    this.fixedInvest = this.simulatorService.fixedInvest;
    this.fixedIncomesSavings = this.simulatorService.fixedIncomesSavings;

    this.chartDataMockup[0].fixedIncome = this.fixedIncomesSavings.name;
    this.chartDataMockup[0].mounts = this.fixedIncomesSavings.mounth;
    this.chartDataMockup[0].initialValue = this.fixedIncomesSavings.initialDeposit;
    this.chartDataMockup[0].amount = this.fixedIncomesSavings.amount;

    this.chartDataMockup[1].fixedIncome = this.selectFixedIncomeControl.value.sigla;
    this.chartDataMockup[1].mounts = this.simulatorService.fixedInvest;
    this.chartDataMockup[1].initialValue = this.simulatorService.fixedInvest.initialDeposit;
    this.chartDataMockup[1].amount = this.simulatorService.fixedInvest.amount;

    this.child.createChartLineBar()

  }




}
