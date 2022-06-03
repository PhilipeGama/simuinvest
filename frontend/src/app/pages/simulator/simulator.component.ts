import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ChartBarComponent } from 'src/app/components/chart-bar/chart-bar.component';
import { IInvestReport } from 'src/app/interfaces/invest-report.interface';
import { FixedIncomeService } from 'src/app/services/fixed-income.service';
import { InvestReportService } from '../../services/invert-report.service';

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
    fixedIncomeName: '',
    fixedIncomeAmount: 0,
    initialDate: new Date(),
    savingsAmount: 0,
    totalInvest: 0,
    totalMonthsInvest:0,
    userId: ''
  };

  mounth = [0, 3 ,6, 12, 24, 48]
  @ViewChild(ChartBarComponent)
  child: ChartBarComponent = new ChartBarComponent;
  
  chartData: any[];

  canSave = false;

  constructor(private simulatorService: FixedIncomeService, private investReportService: InvestReportService) { }

  ngOnInit(): void {
    
    this.chartData = [
      {
        fixedIncome: 'Poupança',
        initialValue: 0,
        amount: 0,
        mounts: 0,
      },
      {
        fixedIncome: 'Opção de Renda Fixa',
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

    this.canSave = true;

  }

  onSaveInvestReport(){

    this.investReport.totalInvest = this.simulatorService.totalInvest;
    this.investReport.fixedIncomeName = this.simulatorService.fixedInvest.name;
    this.investReport.fixedIncomeAmount = this.simulatorService.fixedInvest.amount;
    this.investReport.totalMonthsInvest = this.simulatorService.fixedInvest.months;
    this.investReport.savingsAmount =  this.fixedIncomesSavings.amount;
    this.investReport.userId = JSON.parse(localStorage.getItem('userData')).userId;;

    this.investReportService.create(this.investReport)

    this.canSave = false;
  }




}
