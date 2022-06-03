import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { IInvestReport } from 'src/app/interfaces/invest-report.interface';
import { SimulatorService } from 'src/app/services/simulator.service';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';



@Component({
  selector: 'app-simulation-report',
  templateUrl: './simulation-report.component.html',
  styleUrls: ['./simulation-report.component.scss']
})
export class SimulationReportComponent implements OnInit {
  displayedColumns: string[] = ['fixedIncomeName', 'totalMonthsInvest', 'totInvest','fixedIncomeAmount', 'savingsAmount', 'actions'];
  dataSource: MatTableDataSource<IInvestReport>;

  clickedRows = new Set<IInvestReport>();

  @ViewChild('paginator') paginator: MatPaginator;

  
  investReport: IInvestReport;
  investReports: IInvestReport[] = [];
  constructor(private simulatorService: SimulatorService, public dialog: MatDialog) { 
    this.loadInvestorReport();
  }

  ngOnInit(): void {

    this.dataSource.paginator = this.paginator;
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
          this.dataSource = new MatTableDataSource(this.investReports);
          this.dataSource.paginator = this.paginator;
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
