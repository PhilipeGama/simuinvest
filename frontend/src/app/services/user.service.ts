import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { map } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { IUser } from "../interfaces/user.interface";

@Injectable({
    providedIn: 'any'
})
export class UserService {
  
    private dbPath = '/users';

    usersRef: AngularFireList<IUser>;
 
    constructor(private db: AngularFireDatabase) {
      this.usersRef = db.list(this.dbPath);
    }
  
    getUserByEmail(email: string): AngularFireList<IUser> {
        return this.db.list(this.dbPath, ref => ref.orderByChild('email').equalTo(email));
    }

    getUserById(id: string):  AngularFireList<IUser> {
      this.usersRef = this.db.list('users', ref => ref.orderByKey().equalTo(id));
      return this.usersRef;
    };
      
    

    getAll(): AngularFireList<IUser> {
        return this.usersRef;
    }
  
    create(id: string, user: IUser): any {
      this.db.object('users/' + id).update(user);
    }

    update(key: string, value: any): Promise<void> {
      return this.usersRef.update(key, value);
    }
  
    delete(key: string): Promise<void> {
      return this.usersRef.remove(key);
    }
  
    deleteAll(): Promise<void> {
      return this.usersRef.remove();
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