import { Component, OnInit } from '@angular/core';

export interface InvestReport {
  fixedIcomeName: string;
  initialDate: string;
  totalMonthsInvest: string;
  totInvest: number;
  fixedIcomeAmount: number;
  savingsAMount: number;
}

const ELEMENT_DATA: InvestReport[] = [
    {fixedIcomeName: 'LCA', initialDate: '02-02-2022',  totalMonthsInvest: '20', totInvest: 3000, fixedIcomeAmount: 4000, savingsAMount: 3500},
    {fixedIcomeName: 'LCA', initialDate: '02-02-2022',  totalMonthsInvest: '20', totInvest: 3000, fixedIcomeAmount: 4000, savingsAMount: 3500},
  
];
@Component({
  selector: 'app-simulation-report',
  templateUrl: './simulation-report.component.html',
  styleUrls: ['./simulation-report.component.scss']
})
export class SimulationReportComponent implements OnInit {
  displayedColumns: string[] = ['fixedIcomeName', 'initialDate', 'totalMonthsInvest', 'totInvest'];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<InvestReport>();

  constructor() { }

  ngOnInit(): void {
  }

}
