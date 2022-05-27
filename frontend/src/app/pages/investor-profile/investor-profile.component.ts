import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { DialogMaterialComponent } from 'src/app/components/dialog-investor-profile/dialog-investor-profile.component';
import { IInvestor } from 'src/app/interfaces/IInvestor';
import { InvestorService } from 'src/app/services/investor.service';
import questionsJSON from '../../_files/questions.json';



interface Questions {
  question: string
  answer01: string
  answer02: string
  answer03: string
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


  constructor(private _snackBar: MatSnackBar, private investorService: InvestorService, public dialog: MatDialog) {
    this.getInvestor()
  }

  ngOnInit(): void { }

 

  openDialog(title: string, content: string) {
    this.dialog.open(DialogMaterialComponent, {data: {title: title, content: content}, maxWidth: 600});
  }

  investorText = [
    "Como o próprio nome sugere, o investidor de perfil conservador tem maior aversão ao risco – isto é, prefere investir seu dinheiro em produtos que apresentem nenhum ou baixo risco. No geral, podemos dizer que o investidor conservador busca receber ganhos reais com o menor risco possível, mesmo que para isso tenha que abrir mão de certa rentabilidade. ",
    "Podemos dizer que o investidor de perfil moderado corre um risco médio em suas aplicações – ele está disposto a assumir riscos um pouco maiores para ter uma rentabilidade também maior; mas, ao mesmo tempo, não abre mão de certa segurança. Por isso, ele investe tanto em renda fixa, mais segura, quanto em outras opções, como fundos multimercados (de médio risco) e até ações. ",
    " Investidores agressivos ou arrojados estão dispostos a correr riscos para ter maior rentabilidade – e até perder parte de seu patrimônio em nome disso. Em uma carteira de investimentos, a maior parte de suas aplicações está em produtos de renda variável – ações, fundos de ações, opções, entre outros. "
  ]

  profileText = "";



  getInvestor() {
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
  investorProfileCalculation() {
    this.answersSum = 0;

    this.questions.forEach(question => { this.answersSum = this.answersSum + question.answer })

    this.investorType = this.investorService.investorProfileType(this.answersSum);


    if (this.investorType == 1) {
      this.openDialog('Conservador', this.investorText[0])
      this.investor.type = 'Conservador';
    }

    if (this.investorType == 2) {
      this.openDialog('Moderado', this.investorText[1])
      this.investor.type = 'Moderado';
    }
    if (this.investorType == 3) {
      this.openDialog('Agressivo', this.investorText[2])
      this.investor.type = 'Agressivo';
    }
    this.investorService.update(this.investor_key, this.investor)
  }

  createSnackBar(investorType: string) {
    this.investor.type = investorType;
    this._snackBar.open("Você tem o perfil de investidor " + investorType + "!", "Fechar", {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 7 * 1000,
    });
  }
}
