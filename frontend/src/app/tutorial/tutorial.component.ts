import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { IUser } from '../interfaces/user.interface';
import { SimulatorService } from '../services/simulator.service';
import { UserService } from '../services/user.service';

interface Hero {
  name: string
}

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {

  email: string; 
  user: IUser ;

  constructor(private userService: UserService, private authService: AuthService, private reportService: SimulatorService) {}

  ngOnInit(): void {
  }

  getByEmail(){
    this.userService.getUserByEmail(this.email).snapshotChanges().pipe(
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


  getAll(): void {
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
  
  showInvestor(){
    console.log(this.reportService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      console.log(data)
    }));
  }
}
