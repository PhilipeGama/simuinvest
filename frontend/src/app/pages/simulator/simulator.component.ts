import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ChartBarComponent } from 'src/app/components/chart-bar/chart-bar.component';
import { IInvestReport } from 'src/app/models/IInvestReport';
import { SimulatorService } from '../../services/simulator.service';

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

  investReport: IInvestReport = {
    fixedIcomeName: '',
    fixedIcomeAmount: 0,
    initialDate: '0',
    savingsAmount: 0,
    totInvest: 0,
    totalMonthsInvest:0
  };

  mounth = [0, 3 ,6, 12, 24, 48]
  @ViewChild(ChartBarComponent)
  child: ChartBarComponent = new ChartBarComponent;
  
  chartData: any[];

  constructor(private simulatorService: SimulatorService) { }

  ngOnInit(): void {
    
    this.chartData = [
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
   

    this.chartData[0].fixedIncome = this.fixedIncomesSavings.name;
    this.chartData[0].mounts = this.fixedIncomesSavings.mounth;
    this.chartData[0].initialValue = this.fixedIncomesSavings.initialDeposit;
    this.chartData[0].amount = this.fixedIncomesSavings.amount;

    this.chartData[1].fixedIncome = this.selectFixedIncomeControl.value.sigla;
    this.chartData[1].mounts = this.simulatorService.fixedInvest;
    this.chartData[1].initialValue = this.simulatorService.fixedInvest.initialDeposit;
    this.chartData[1].amount = this.simulatorService.fixedInvest.amount;

    this.child.createChartLineBar()

  }

  onSaveInvestReport(){
  
    this.investReport.totInvest = this.simulatorService.totalInvest;
    this.investReport.fixedIcomeName = this.simulatorService.fixedInvest.name;
    this.investReport.fixedIcomeAmount = this.fixedIncomesSavings.amount;
    this.investReport.totalMonthsInvest = this.simulatorService.fixedInvest.months;
    this.investReport.savingsAmount =  this.fixedIncomesSavings.amount;

    console.log("onSaveInvestReport")
    console.log(this.investReport)
    this.simulatorService.create(this.investReport)

  }




}
