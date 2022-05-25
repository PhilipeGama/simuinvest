import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { IInvestReport } from 'src/app/models/IInvestReport';
import { SimulatorService } from 'src/app/services/simulator.service';

export interface InvestReport {
  fixedIcomeName: string;
  initialDate: string;
  totalMonthsInvest: number;
  totInvest: number;
  fixedIcomeAmount: number;
  savingsAmount: number;
}

const ELEMENT_DATA: InvestReport[] = [];
@Component({
  selector: 'app-simulation-report',
  templateUrl: './simulation-report.component.html',
  styleUrls: ['./simulation-report.component.scss']
})
export class SimulationReportComponent implements OnInit {
  displayedColumns: string[] = ['fixedIcomeName', 'initialDate', 'totalMonthsInvest', 'totInvest', 'totSavings'];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<InvestReport>();

  investReport: IInvestReport;
  investReports: IInvestReport[] = [];
  constructor(private simulatorService: SimulatorService) { 
    this.loadInvestorReport();
  }

  ngOnInit(): void {
  }

  loadInvestorReport(){
    this.simulatorService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      if (data.length === 0) {

      } else {

        console.log(data)
        for(let d of data){
          this.investReport = {
            uid : d.key,
            fixedIcomeName : d.fixedIcomeName,
            fixedIcomeAmount : d.fixedIcomeAmount,
            totInvest : d.totInvest,
            savingsAmount : d.savingsAmount,
            totalMonthsInvest : d.totalMonthsInvest,
            initialDate: '2018'
          }
          console.log(this.investReport)
          this.investReports.push(this.investReport)
          this.dataSource = this.investReports;
        }

        console.log(this.investReports)

      }
      console.log(this.investReport)
    });
  }

}
