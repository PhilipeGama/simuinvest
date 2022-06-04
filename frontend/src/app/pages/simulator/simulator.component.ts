import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ChartBarComponent } from 'src/app/components/chart-bar/chart-bar.component';
import IFixedIncome from 'src/app/interfaces/fixed-income.interface';
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

  investForm: FormGroup;

  mounth = [0, 3 ,6, 12, 24, 48]
  @ViewChild(ChartBarComponent)
  child: ChartBarComponent = new ChartBarComponent;
  
  chartData: any[];

  canSave = false;

  constructor(private fixedIncomeService: FixedIncomeService, private investReportService: InvestReportService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createInvestForm()
    this.getFixedIncomens()
    // this.investForm.setValue({fixedIncomeNames : this.fixedIncomeService.fixedInvest.name});

    this.loadChart()
    this.fixedInvest = this.fixedIncomeService.fixedInvest;

    this.fixedIncomesSavings = this.fixedIncomeService.fixedIncomesSavings;
    this.fixedIncomes = this.fixedIncomeService.fixedIncomes;

  }

  //TODO: move to service
  onSavingsCalculation() {
    this.fixedIncomeService.fixedInvest.rate = this.selectFixedIncomeControl.value.rate;
    this.fixedIncomeService.fixedIncomeCalculation();
    this.fixedIncomeService.savingsCalculation();

    this.fixedInvest.name = this.selectFixedIncomeControl.value.sigla;

    this.fixedInvest = this.fixedIncomeService.fixedInvest;
    this.fixedIncomesSavings = this.fixedIncomeService.fixedIncomesSavings;
   

    this.chartData[0].fixedIncome = this.fixedIncomesSavings.name;
    this.chartData[0].mounts = this.fixedIncomesSavings.mounth;
    this.chartData[0].initialValue = this.fixedIncomesSavings.initialDeposit;
    this.chartData[0].amount = this.fixedIncomesSavings.amount;

    this.chartData[1].fixedIncome = this.selectFixedIncomeControl.value.sigla;
    this.chartData[1].mounts = this.fixedIncomeService.fixedInvest;
    this.chartData[1].initialValue = this.fixedIncomeService.fixedInvest.initialDeposit;
    this.chartData[1].amount = this.fixedIncomeService.fixedInvest.amount;

    this.child.createChartLineBar()

    this.canSave = true;

  }

  onSaveInvestReport(){
    this.investReport.totalInvest = this.fixedIncomeService.totalInvest;
    this.investReport.fixedIncomeName = this.fixedIncomeService.fixedInvest.name;
    this.investReport.fixedIncomeAmount = this.fixedIncomeService.fixedInvest.amount;
    this.investReport.totalMonthsInvest = this.fixedIncomeService.fixedInvest.months;
    this.investReport.savingsAmount =  this.fixedIncomesSavings.amount;
    this.investReport.userId = JSON.parse(localStorage.getItem('userData')).userId;;
    this.investReportService.create(this.investReport)
    this.canSave = false;
  }

  loadChart() {
    this.chartData = [{
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
    }]
  }

  createInvestForm(){
    this.investForm = this.fb.group({
      fixedIncomeNames: [null],
      inicialDeposit: [''],
      mounthDeposit: [''],
      mounth: [''],
      fixedIncomeAmount: [''],
      savingsAmount: [''],
    })
  }

  getFixedIncomens(){
    this.fixedIncomeService.getFixedIncomes().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.fixedIncomes = []
      if (data.length === 0) {
      } else {
        for(let d of data){
          let fixedIncome: IFixedIncome = {
            _id: d.key,
            name: d.name,
            rate: d.rate,
            createdAt: d.createdAt,
            updatedAt: d.updatedAt
          }
          this.fixedIncomes.push(fixedIncome)
        }
      }

    });
  }


}
