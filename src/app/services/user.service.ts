import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from "@angular/fire/database";
import { AuthService } from "../auth/auth.service";
import { IUser } from "../interfaces/user.interface";

@Injectable({
    providedIn: 'root'
})
export class UserService {
  
    private dbPath = 'users';

    usersRef: AngularFireList<IUser>;

    userRef: AngularFireObject<IUser>;
 
    constructor(private auth: AuthService, private db: AngularFireDatabase) {
      if(this.auth.user.value) {
        this.usersRef = db.list(`users/${this.auth.user.value.id}`);
      }
    }
  
    async getUserByEmail(email: string): Promise<AngularFireList<IUser>> {
      return this.db.list(this.dbPath, ref => ref.orderByChild('email').equalTo(email));
    }

    async getUserById(id: string): Promise<AngularFireList<IUser>> {
      return this.db.list(`users/${this.auth.user.value.id}`);;
    }

    async getUser(): Promise<AngularFireObject<IUser>>{
      this.userRef = this.db.object(`users/${this.auth.user.value.id}`);
      return this.userRef;
    }


    async getAll(): Promise<AngularFireList<IUser>> {
      return  this.usersRef = this.db.list(`users/${this.auth.user.value.id}`);    
    }
  
    create(uid: string, user: IUser): any {
      return this.db.object('users/' + uid).update(user);
    }

    update(user: IUser): Promise<void> {
      return this.userRef.update(user);
    }
  
    updateProfile(profile: string): Promise<void> {
      return this.userRef.update({profile: profile});
    }
  
    delete(key: string): Promise<void> {
      return this.usersRef.remove(key);
    }
  
    deleteAll(): Promise<void> {
      return this.usersRef.remove();
    }

    investorProfile(answerSum: number): number{
      if(answerSum >= 5 && answerSum <= 8){ return 1; }
      if(answerSum >= 9 && answerSum <= 12){ return 2; }
      if(answerSum >= 13 && answerSum <= 15){ return 3; }
      return 0;
    }
    

}