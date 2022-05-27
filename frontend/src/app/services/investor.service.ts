import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { IInvestor } from "../interfaces/IInvestor";

@Injectable({
    providedIn: 'root'
})
export class InvestorService {
  
    private dbPath = '/investor';

    tutorialsRef: AngularFireList<IInvestor>;
 
    constructor(private db: AngularFireDatabase) {
      this.tutorialsRef = db.list(this.dbPath);
    }
  
    getInvestorByEmail(email: string): AngularFireList<IInvestor> {
        return this.db.list(this.dbPath, ref => ref.orderByChild('email').equalTo(email));
    }

    getAll(): AngularFireList<IInvestor> {
        return this.tutorialsRef;
    }
  
    create(investor: IInvestor): any {
      return this.tutorialsRef.push(investor);
    }
  
    update(key: string, value: any): Promise<void> {
      return this.tutorialsRef.update(key, value);
    }
  
    delete(key: string): Promise<void> {
      return this.tutorialsRef.remove(key);
    }
  
    deleteAll(): Promise<void> {
      return this.tutorialsRef.remove();
    }

    investorProfileType(answerSum: number): number{
      if(answerSum >= 5 && answerSum <= 8){
        return 1;
      }
  
      if(answerSum >= 9 && answerSum <= 12){
        return 2;
      }
  
      if(answerSum >= 13 && answerSum <= 15){
        return 3;
      }
  
      return 0;
    }
    

}