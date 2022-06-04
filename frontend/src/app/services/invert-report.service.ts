import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { IInvestReport } from "src/app/interfaces/invest-report.interface";

@Injectable({
  providedIn: 'root'
})
export class InvestReportService {

  private dbPath = 'investment-reports';

  investReportRef: AngularFireList<IInvestReport>;

  constructor(private db: AngularFireDatabase) {
    const userId = JSON.parse(localStorage.getItem('userData')).userId;
    this.investReportRef = this.db.list(this.dbPath, ref => ref.orderByChild('userId').equalTo(userId));
  }

  create(investReport: IInvestReport): any {
    return this.db.list('investment-reports').push(investReport);
  }

  getInvestReportByUserId(): AngularFireList<IInvestReport> {
    return this.investReportRef;
  }

  deleteInvestReport(uid: string){
    return this.investReportRef.remove(uid)
  }

}