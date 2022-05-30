import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { AuthService } from "../auth/auth.service";
import { IUser } from "../interfaces/user.interface";

@Injectable({
    providedIn: 'root'
})
export class UserService {
  
    private dbPath = '/users';

    tutorialsRef: AngularFireList<IUser>;
 
    constructor(private db: AngularFireDatabase, private authService: AuthService) {
      this.tutorialsRef = db.list(this.dbPath);
    }
  
    getUserByEmail(email: string): AngularFireList<IUser> {
        return this.db.list(this.dbPath, ref => ref.orderByChild('email').equalTo(email));
    }

    getAll(): AngularFireList<IUser> {
        return this.tutorialsRef;
    }
  
    create(id: string, user: IUser): any {
      this.db.object('users/' + id).update(user);
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