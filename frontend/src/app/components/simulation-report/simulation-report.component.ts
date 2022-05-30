import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { IInvestReport } from 'src/app/interfaces/invest-report.interface';
import { SimulatorService } from 'src/app/services/simulator.service';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';



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
  constructor(private simulatorService: SimulatorService, public dialog: MatDialog) { 
    this.loadInvestorReport();
  }

  ngOnInit(): void {
  }

  loadInvestorReport(){

    const userId = JSON.parse(localStorage.getItem('userData')).userId; 

    this.simulatorService.getInvestReportByUserId(userId).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      if (data.length === 0) {
        
      } else {
        this.investReports = []
        for(let d of data){
          this.investReport = {
            _id : d.key,
            fixedIncomeName : d.fixedIncomeName,
            fixedIncomeAmount : d.fixedIncomeAmount,
            totalInvest : d.totalInvest,
            savingsAmount : d.savingsAmount,
            totalMonthsInvest : d.totalMonthsInvest,
            initialDate: new Date(),
            userId: d.userId
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

  onDeleteInvestmentReport(uid: string){
      let data = {
        title : "Confirmar Exclusão",
        content: "Tem certeza que deseja excluir este relatório?",
        uid: uid
      }
      this.dialog.open(DialogConfirmComponent, {data: {title: data.title, content: data.content, uid: data.uid}, maxWidth: 800});
  }

}
