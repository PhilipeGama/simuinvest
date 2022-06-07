import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ChartBarComponent } from 'src/app/components/chart-bar/chart-bar.component';
import IFixedIncome from 'src/app/interfaces/fixed-income.interface';
import { IInvestReport } from 'src/app/interfaces/invest-report.interface';
import { IInvestData } from 'src/app/interfaces/invest-data.inteface';
import { FixedIncomeService } from 'src/app/services/fixed-income.service';
import { InvestReportService } from '../../services/invert-report.service';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.scss'],
})

export class SimulatorComponent implements OnInit {


  fixedIncomes;

   investData: IInvestData;

  investForm: FormGroup;

  createInvestForm(){
    this.investForm = this.fb.group({
      fixedIncome: ['', Validators.required],
      initialDeposit: ['', Validators.required],
      monthlyDeposit: ['', Validators.required],
      months: ['', Validators.required],
      amount: ['', Validators.required],
      fixedIncomeAmount: [{value:'', disabled: true}],
      savingsAmount: [{value:'', disabled: true}],
    })
  }
  
  mounth = [0, 3 ,6, 12, 24, 48]
  @ViewChild(ChartBarComponent)
  child: ChartBarComponent = new ChartBarComponent;
  
  chartData: any[];

  canSave = false;

  constructor(private fixedIncomeService: FixedIncomeService, private investReportService: InvestReportService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createInvestForm()
    this.getFixedIncomens()
    this.loadChart()

  }

  //TODO: move to service
  onSavingsCalculation() {


  }

  onSaveInvestReport(){

    const userId = JSON.parse(localStorage.getItem('userData')).userId;;

    console.log(this.investForm.value)
    let investReport: IInvestReport = {
      fixedIncomeName: this.investData.fixedIncomeName,
      fixedIncomeAmount: this.investData.fixedIncomeAmount,
      createdAt: new Date(),
      savingsAmount: this.investData.savingsAmount,
      totalInvest: this.investData.fixedIncomeAmount,
      months: this.investData.months,
      userId: userId
    };

    this.investReportService.create(investReport)
    this.canSave = false;
  }

  // TODO improving function
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

  onSubmit(){
     this.investData = {
      fixedIncomeName: this.investForm.value.fixedIncome.name,
      initialDeposit: this.investForm.value.initialDeposit,
      monthlyDeposit: this.investForm.value.monthlyDeposit,
      months: this.investForm.value.months,
      fixedIncomeRate: this.investForm.value.fixedIncome.rate,
    }
    this.investData = this.fixedIncomeService.calculateInvestmentIncome(this.investData)
    this.investForm.patchValue({fixedIncomeAmount: this.investData.fixedIncomeAmount, savingsAmount: this.investData.savingsAmount});
  
    this.canSave = true;
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
  }


}
