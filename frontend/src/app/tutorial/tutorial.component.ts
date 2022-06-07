import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { IUser } from '../interfaces/user.interface';
import { FixedIncomeService } from '../services/fixed-income.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {

  texto1: string; 
  user: IUser ;

  constructor(private userService: UserService, private fixedIncomeService: FixedIncomeService) {}

  ngOnInit(): void {
  }

  f1(){
    const date = Date.now();
    const today = new Date(date)
    console.log(today.toLocaleDateString())
    console.log(today)
  }

  f2(){
    this.userService.getUserById(this.texto1).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      console.log(data)
      this.user.email = data[0].email;
    });
  }


  f3(): void {
    this.userService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      console.log(data)
    });
  }

  f4(){

  }
  
}
