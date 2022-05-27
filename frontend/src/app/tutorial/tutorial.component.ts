import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { IInvestor } from '../interfaces/IInvestor';
import { InvestorService } from '../services/investor.service';

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
  investor: IInvestor = {
    name: '',
    email: '',
    phone: '',

  };

  constructor(private investorService: InvestorService) { }

  ngOnInit(): void {
  }

  getByEmail(){
    this.investorService.getInvestorByEmail(this.email).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      console.log(data)
      this.investor.email = data[0].email;
    });
  }


  getAll(): void {
    this.investorService.getAll().snapshotChanges().pipe(
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
    console.log(this.investor)
  }
}
