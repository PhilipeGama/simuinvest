import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { IInvestReport } from 'src/app/interfaces/invest-report.interface';
import { InvestReportService } from 'src/app/services/invert-report.service';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-simulation-report',
  templateUrl: './simulation-report.component.html',
  styleUrls: ['./simulation-report.component.scss']
})
export class SimulationReportComponent implements OnInit {
  displayedColumns: string[] = ['fixedIncomeName', 'totalMonthsInvest', 'totalInvest','fixedIncomeAmount', 'savingsAmount', 'actions'];
  
  dataSource: MatTableDataSource<IInvestReport>;

  clickedRows = new Set<IInvestReport>();

  @ViewChild('paginator') paginator: MatPaginator;


  investReports: IInvestReport[] = [];
  hasData = false;

  constructor(private investReportService: InvestReportService, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.getInvestorReports()
  }

  getInvestorReports(){
    this.investReportService.getInvestReportByUserId().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.investReports = []
      if (data.length === 0) {
        this.hasData = false;
      } else {
        console.log(data)
        for(let d of data){
          let investReport: IInvestReport = {
            _id : d.key,
            fixedIncomeName : d.fixedIncomeName,
            fixedIncomeAmount : d.fixedIncomeAmount,
            totalInvest : d.totalInvest,
            savingsAmount : d.savingsAmount,
            months : d.months,
            createdAt: new Date(),
            userId: d.userId
          }
          this.investReports.push(investReport)
        }
        setTimeout(() => {
          this.dataSource = new MatTableDataSource(this.investReports);
          this.dataSource.paginator = this.paginator;
        })
        this.hasData = true;
      }

    });
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
