import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { IUser } from "../../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class TesteService {

  private dbPath = '/users';

  usersRef: AngularFireList<IUser>;


  constructor(
    private db: AngularFireDatabase,
    private auth: AngularFireAuth
  ) {
  
  }

  // async getCurrentUser(): Promise<any> {
  //   return await this.auth.currentUser;

  //   // this.auth.authState.subscribe(user => {
  //   //   console.log(user)
  //   //   return user;
  //   // })
  // }
  
  async getCurrentUser(): Promise<AngularFireList<IUser>>{
    return this.auth.currentUser.then(user => {
      console.log(user);
      if (user) {
        return this.db.list(this.dbPath, ref => ref.child(user.uid));
      } else {
        return null;
      }
    });
  }


}