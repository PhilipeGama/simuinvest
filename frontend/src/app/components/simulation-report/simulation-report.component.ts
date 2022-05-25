import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { IInvestor } from 'src/app/models/IInvestor';
import { IInvestReport } from 'src/app/models/IInvestReport';
import { SimulatorService } from 'src/app/pages/simulator/simulator.service';

export interface InvestReport {
  fixedIcomeName: string;
  initialDate: string;
  totalMonthsInvest: number;
  totInvest: number;
  fixedIcomeAmount: number;
  savingsAmount: number;
}

const ELEMENT_DATA: InvestReport[] = [
    {fixedIcomeName: 'LCA', initialDate: '02-02-2022',  totalMonthsInvest: 20, totInvest: 3000, fixedIcomeAmount: 4000, savingsAmount: 3500},
    {fixedIcomeName: 'LCA', initialDate: '02-02-2022',  totalMonthsInvest: 20, totInvest: 3000, fixedIcomeAmount: 4000, savingsAmount: 3500},
];
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

  constructor(private simulatorService: SimulatorService) { 

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

        // this.investReport._uid = data[0].key;
        // this.investReport.fixedIcomeName = data[0].fixedIcomeName;
        // this.investReport.fixedIcomeAmount = data[0].password;
        // this.investReport.name = data[0].name;
        // this.investReport.type = data[0].type;
        // this.investReport.phone = data[0].phone;


      }
    });
  }

}
