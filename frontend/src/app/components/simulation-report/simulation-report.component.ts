import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { IInvestReport } from 'src/app/interfaces/IInvestReport';
import { SimulatorService } from 'src/app/services/simulator.service';



const ELEMENT_DATA: IInvestReport[] = [];
@Component({
  selector: 'app-simulation-report',
  templateUrl: './simulation-report.component.html',
  styleUrls: ['./simulation-report.component.scss']
})
export class SimulationReportComponent implements OnInit {
  displayedColumns: string[] = ['fixedIncomeName', 'totalMonthsInvest', 'totInvest','fixedIncomeAmount', 'savingsAmount', 'actions'];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<IInvestReport>();

  investReport: IInvestReport;
  investReports: IInvestReport[] = [];
  constructor(private simulatorService: SimulatorService) { 
    this.loadInvestorReport();
  }

  ngOnInit(): void {
  }

  loadInvestorReport(){

    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    

    this.simulatorService.getInvestReportByUser(userData.email).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      if (data.length === 0) {

      } else {
        for(let d of data){
          this.investReport = {
            uid : d.key,
            fixedIncomeName : d.fixedIncomeName,
            fixedIncomeAmount : d.fixedIncomeAmount,
            totInvest : d.totInvest,
            savingsAmount : d.savingsAmount,
            totalMonthsInvest : d.totalMonthsInvest,
            initialDate: '2018'
          }
          this.investReports.push(this.investReport)
          this.dataSource = this.investReports;
        }
      }

    });
  }

  addInvestReport(investReport: IInvestReport){
    this.investReports.push(investReport);
  }

}
