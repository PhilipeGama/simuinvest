import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { IUser } from "../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class TesteService {

  private dbPath = '/users/';

  usersRef: AngularFireList<IUser>;


  constructor(
    private db: AngularFireDatabase,
    private auth: AngularFireAuth
  ) {
    this.auth.authState.subscribe(async user => {
      if (user) {
         this.usersRef = this.db.list(this.dbPath + user.uid);
      } else {
        this.usersRef;
      }
    })
  }
  
   getCurrentUser(): AngularFireList<IUser> {
    return this.usersRef;
  }


}