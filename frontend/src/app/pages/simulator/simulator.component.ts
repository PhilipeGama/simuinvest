import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ChartBarComponent } from 'src/app/components/chart-bar/chart-bar.component';
import IFixedIncome from 'src/app/interfaces/fixed-income.interface';
import { IInvestReport } from 'src/app/interfaces/invest-report.interface';
import { IInvestData } from 'src/app/interfaces/invest-data.inteface';
import { FixedIncomeService } from 'src/app/services/fixed-income.service';
import { InvestReportService } from '../../services/invert-report.service';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.scss'],
})

export class SimulatorComponent implements OnInit {

  @ViewChild(ChartBarComponent)
  childChart: ChartBarComponent;

  fixedIncomes: IFixedIncome[];

  investData: IInvestData = {
    fixedIncomeName: 'Opção de Renda Fixa',
    initialDeposit: 0,
    monthlyDeposit: 0,
    months: 0,
    amount: 0,
    fixedIncomeAmount: 0,
    savingsAmount: 0,
    fixedIncomeRate: 0,
  };

  investForm: FormGroup;
  chartData: any[];
  canSave = false;
  years: string = '0';

  createInvestForm(){
    this.investForm = this.fb.group({
      fixedIncome: ['', Validators.required],
      initialDeposit: ['', Validators.required],
      monthlyDeposit: ['', Validators.required],
      months: [0, Validators.required],
      amount: [{value:'', disabled: true}],
      fixedIncomeAmount: [{value:'', disabled: true}],
      savingsAmount: [{value:'', disabled: true}],
    })

    this.investForm.get('months').valueChanges.subscribe(value => {
     this.yearsCalculation(value)
    })
  }

  yearsCalculation(months: number){
    const monthR = months % 12;
    let yearsR;

    if(monthR !== 0) {
      yearsR = Math.trunc((months / 12));
    } else {
      yearsR = (months / 12);
    }

    let monthS = '', yearsS = '', andS = '';

    if(yearsR > 0 && monthR > 0){
      andS = ' e ';
    }

    if(yearsR == 1){
      yearsS = yearsR + ' ano'
    }

    if(yearsR > 1){
      yearsS = yearsR + ' anos'
    }

    if(monthR == 0) {
      monthS = '';
    }

    if(monthR == 1) {
      monthS = monthR + ' mês';
    }

    if(monthR > 1) {
      monthS = monthR + ' meses';
    }

    this.years = yearsS + andS + monthS;
  }


  constructor(
    private auth: AuthService,
    private fixedIncomeService: FixedIncomeService,
    private investReportService: InvestReportService,
    private fb: FormBuilder) { }

  isAuthenticated = false;

  ngOnInit(): void {
    this.auth.isAuthetication.subscribe(value => {
      this.isAuthenticated = value;
    })
    this.createInvestForm()
    this.getFixedIncomens()
    this.childChart = new ChartBarComponent();
    this.loadChart()
  }

  onSaveInvestReport(){
    const userId = this.auth.user.value.id;

    const today = new Date().toLocaleDateString();
    let investReport: IInvestReport = {
      fixedIncomeName: this.investData.fixedIncomeName,
      fixedIncomeAmount: this.investData.fixedIncomeAmount,
      createdAt: today,
      savingsAmount: this.investData.savingsAmount,
      totalInvest: this.investData.amount,
      months: this.investData.months,
      userId: userId
    };
    this.investReportService.create(investReport)
    this.canSave = false;
  
  }

  loadChart() {
    this.chartData = [{
      fixedIncome: 'Poupança',
      initialValue: this.investData.initialDeposit,
      amount: this.investData.savingsAmount,
      mounts: this.investData.months,
    },
    {
      fixedIncome: this.investData.fixedIncomeName,
      initialValue: this.investData.initialDeposit,
      amount: this.investData.fixedIncomeAmount,
      mounts: this.investData.months,
    }]
    this.childChart.chartData = this.chartData;
    this.childChart.loadChart()
  }

  onSubmit(){
     this.investData = {
      fixedIncomeName: this.investForm.value.fixedIncome.name,
      initialDeposit: this.investForm.value.initialDeposit,
      monthlyDeposit: this.investForm.value.monthlyDeposit,
      months: this.investForm.value.months,
      fixedIncomeRate: this.investForm.value.fixedIncome.rate,
    }
    this.investData = this.fixedIncomeService.calculateInvestmentIncome(this.investData)
    this.investForm.patchValue({amount: this.investData.amount, fixedIncomeAmount: this.investData.fixedIncomeAmount, savingsAmount: this.investData.savingsAmount});
    this.canSave = true;
    this.loadChart()
  }

  getFixedIncomens(){
    this.fixedIncomeService.getFixedIncomes().then(data => {
      data.snapshotChanges().pipe(
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
            if(d.name == 'Poupança'){
              continue;
            }
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
    })
   
  }
}
