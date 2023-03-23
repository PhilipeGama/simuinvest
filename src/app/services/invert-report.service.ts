import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { IInvestReport } from "src/app/interfaces/invest-report.interface";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class InvestReportService {

  private dbPath = 'investment-reports';

  investReportRef: AngularFireList<IInvestReport>;

  constructor(
    private auth: AuthService,
    private db: AngularFireDatabase
  ) {}

  create(investReport: IInvestReport) {
    return this.db.list(`${this.dbPath}/${this.auth.user.value.id}`).push(investReport);
  }

  getInvestReportByUserId(): AngularFireList<IInvestReport> {
    if(this.auth.user) {
      this.investReportRef = this.db.list(`${this.dbPath}/${this.auth.user.value.id}`);
    }
    return this.investReportRef;
  }

  deleteInvestReport(uid: string){
    return this.investReportRef.remove(uid)
  }

}