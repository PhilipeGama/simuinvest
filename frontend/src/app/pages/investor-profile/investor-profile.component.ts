import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { DialogMaterialComponent } from 'src/app/components/dialog-investor-profile/dialog-investor-profile.component';
import { IUser } from 'src/app/interfaces/user.interface';

import { UserService } from 'src/app/services/user.service';
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

  userProfile: string = '';

  user_key: any;

  user: IUser = {
    name: '',
    email: '',
    phone: '',
    profile: 'Sem perfil de investidor',
    createdAt: new Date,
  };


  constructor(private _snackBar: MatSnackBar, private userService: UserService, public dialog: MatDialog) {
    this.getUser()
  }

  ngOnInit(): void { }

 

  openDialog(title: string, content: string) {
    this.dialog.open(DialogMaterialComponent, {data: {title: title, content: content}, maxWidth: 600});
  }

  userText = [
    "Como o próprio nome sugere, o investidor de perfil conservador tem maior aversão ao risco – isto é, prefere investir seu dinheiro em produtos que apresentem nenhum ou baixo risco. No geral, podemos dizer que o investidor conservador busca receber ganhos reais com o menor risco possível, mesmo que para isso tenha que abrir mão de certa rentabilidade. ",
    "Podemos dizer que o investidor de perfil moderado corre um risco médio em suas aplicações – ele está disposto a assumir riscos um pouco maiores para ter uma rentabilidade também maior; mas, ao mesmo tempo, não abre mão de certa segurança. Por isso, ele investe tanto em renda fixa, mais segura, quanto em outras opções, como fundos multimercados (de médio risco) e até ações. ",
    " Investidores agressivos ou arrojados estão dispostos a correr riscos para ter maior rentabilidade – e até perder parte de seu patrimônio em nome disso. Em uma carteira de investimentos, a maior parte de suas aplicações está em produtos de renda variável – ações, fundos de ações, opções, entre outros. "
  ]

  profileText = "";



  getUser() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    this.userService.getUserByEmail(userData.email).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      if (data.length === 0) {

      } else {

        this.user_key = data[0].key;
        this.user.email = data[0].email;
        this.user.name = data[0].name;
        this.user.profile = data[0].profile;
        this.user.phone = data[0].phone;

        this.userService.update(this.user_key, this.user);
      }
    });
  }



  nextQuest() {
    if (this.questionNumber <= 4 && this.questions[this.questionNumber].answer != undefined) {

      if (this.questionNumber == 4) {
        this.userProfileCalculation()
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
  userType: number;
  userProfileCalculation() {
    this.answersSum = 0;

    this.questions.forEach(question => { this.answersSum = this.answersSum + question.answer })

    this.userType = this.userService.investorProfile(this.answersSum);


    if (this.userType == 1) {
      this.openDialog('Conservador', this.userText[0])
      this.user.profile = 'Conservador';
    }

    if (this.userType == 2) {
      this.openDialog('Moderado', this.userText[1])
      this.user.profile = 'Moderado';
    }
    if (this.userType == 3) {
      this.openDialog('Agressivo', this.userText[2])
      this.user.profile = 'Agressivo';
    }
    this.userService.update(this.user_key, this.user)
  }

  createSnackBar(userType: string) {
    this.user.profile = userType;
    this._snackBar.open("Você tem o perfil de investidor " + userType + "!", "Fechar", {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 7 * 1000,
    });
  }
}
