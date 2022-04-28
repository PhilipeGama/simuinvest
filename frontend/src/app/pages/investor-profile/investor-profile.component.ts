import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { IInvestor } from 'src/app/models/IInvestor';
import { InvestorService } from 'src/app/shared/investor.service';
import questionsJSON from '../../_files/questions.json';


interface Questions {
  question01: string
  question02: string
  question03: string
  answer?: number
}


@Component({
  selector: 'app-investor-profile',
  templateUrl: './investor-profile.component.html',
  styleUrls: ['./investor-profile.component.scss']
})

export class InvestorProfileComponent implements OnInit {

  public questions: Questions[] = questionsJSON

  questionNumber: number = 0;

  investorProfile: string = '';

  investor_key: any; 

  investor: IInvestor = {
    name: '',
    email: '',
    phone: '',
    type: 'Sem perfil de investidor',
  };


  constructor(private _snackBar: MatSnackBar, private investorService: InvestorService) { 
    this.getInvestor()
  }

  ngOnInit(): void { }

  getInvestor(){
    const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
        return;
    }

    this.investorService.getInvestorByEmail(userData.email).snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(data => {
        if (data.length === 0) {

        } else {
     
          this.investor_key = data[0].key;
          this.investor.email = data[0].email;
          this.investor.password = data[0].password;
          this.investor.name = data[0].name;
          this.investor.type = data[0].type;
          this.investor.phone = data[0].phone;

          this.investorService.update(this.investor_key, this.investor);
        }
  
      });
}



  nextQuest() {
    if (this.questionNumber <= 4 && this.questions[this.questionNumber].answer != undefined) {

      if (this.questionNumber == 4) {
        this.investorProfileCalc()
      } else {
        this.questionNumber++;
      }

    } else {
      this._snackBar.open("Escolha uma resposta", "Fechar", {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3 * 1000,
      });
    }
  }

  previousQuestion() {
    if (this.questionNumber > 0) {
      this.questionNumber--
    };
  }

  investorProfileCalc(){
    let r1=0, r2=0, r3=0;
    console.log(this.questions)
    for(let i=0; i< this.questions.length; i++){
      console.log(this.questions[i])
      if(this.questions[i].answer == 1){
        console.log("a")
        r1++;
      }
      if(this.questions[i].answer == 2){
        console.log("b")
        r2++;
      }
      if(this.questions[i].answer == 3){
        r3++;
        console.log("c")
      }
    }

    console.log(r1, r2, r3);

    if(r1 >= r2 && r1 >= r3){
      this.investor.type = "Conservador";
      this._snackBar.open("Você tem o perfil de investidor Conservador!", "Fechar", {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 7 * 1000,
      });
    }

    if(r2 >= r1 && r1 >= r3){
  
      this.investor.type = "Moderado";
      this._snackBar.open("Você tem o perfil de investidor Moderado!", "Fechar", {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 7 * 1000,
      });
    }
    if(r3 >= r1 && r3 >= r2){
      this.investor.type = "Agressivo";
      this._snackBar.open("Você tem o perfil de investidor Agressivo!", "Fechar", {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 7 * 1000,
      });
    }
    
    this.investorService.update(this.investor_key, this.investor)

  }
}
