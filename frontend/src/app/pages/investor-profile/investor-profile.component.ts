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
        this.investorProfileCalculation()
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
  
  answersSum: number;
  investorType: number;
  investorProfileCalculation(){
    this.answersSum = 0; 

    this.questions.forEach(question => {this.answersSum = this.answersSum + question.answer})
    
    console.log("Soma das resposta: "+this.answersSum);

    this.investorType = this.investorService.investorProfileType(this.answersSum);

    console.log("Tipo de investidor: " + this.investorType)

    if(this.investorType == 1){
      this.createSnackBar("Conservador")
    }

    if(this.investorType == 2){
      this.createSnackBar("Moderado")
    }
    if(this.investorType == 3){
      this.createSnackBar("Agressivo")
    }
    this.investorService.update(this.investor_key, this.investor)
  }

  createSnackBar(investorType: string){
    this.investor.type = investorType;
    this._snackBar.open("Você tem o perfil de investidor "+ investorType+ "!", "Fechar", {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 7 * 1000,
    });
  }
}
