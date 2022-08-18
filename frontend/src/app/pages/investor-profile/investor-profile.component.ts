import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogMaterialComponent } from 'src/app/components/dialog-investor-profile/dialog-investor-profile.component';
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

export class InvestorProfileComponent {

  public questions: Questions[] = questionsJSON;

  questionNumber: number = 0;
  
  constructor (
    private _snackBar: MatSnackBar,
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  openDialog(title: string, content: string) {
    this.dialog.open(DialogMaterialComponent, { data: { title: title, content: content }, maxWidth: 600 });
  }

  userText = [
    "Como o próprio nome sugere, o investidor de perfil conservador tem maior aversão ao risco – isto é, prefere investir seu dinheiro em produtos que apresentem nenhum ou baixo risco. No geral, podemos dizer que o investidor conservador busca receber ganhos reais com o menor risco possível, mesmo que para isso tenha que abrir mão de certa rentabilidade. ",
    "Podemos dizer que o investidor de perfil moderado corre um risco médio em suas aplicações – ele está disposto a assumir riscos um pouco maiores para ter uma rentabilidade também maior; mas, ao mesmo tempo, não abre mão de certa segurança. Por isso, ele investe tanto em renda fixa, mais segura, quanto em outras opções, como fundos multimercados (de médio risco) e até ações. ",
    "Investidores agressivos ou arrojados estão dispostos a correr riscos para ter maior rentabilidade – e até perder parte de seu patrimônio em nome disso. Em uma carteira de investimentos, a maior parte de suas aplicações está em produtos de renda variável – ações, fundos de ações, opções, entre outros. "
  ]

  nextQuest() {
    if (this.questionNumber <= 4 && this.questions[this.questionNumber].answer != undefined) {
      if (this.questionNumber == 4) {
        this.userProfileCalculation()
      } else {
        this.questionNumber++;
      }
    } else {
      this._snackBar.open("Escolha uma resposta", "Fechar", {
        horizontalPosition: 'left',
        verticalPosition: 'bottom',
        duration: 3 * 1000,
      });
    }
  }

  previousQuestion() {
    if (this.questionNumber > 0) {
      this.questionNumber--
    };
  }

  userProfileCalculation() {
    let answersSum = 0;
    const id = JSON.parse(localStorage.getItem('userData')).id;

    let investorProfile : {
      title: string,
      text: number,
    };

    this.questions.forEach(question => { answersSum = answersSum + question.answer })
    
    const profileType = this.userService.investorProfile(answersSum);

    if (profileType == 1) investorProfile = {title: 'Conservador', text: 0};
    if (profileType == 2) investorProfile = {title: 'Moderado', text: 1};
    if (profileType == 3) investorProfile = {title: 'Agressivo', text: 2};

    this.openDialog(investorProfile.title, this.userText[investorProfile.text])
    this.userService.updateProfile(id, investorProfile.title)
  }

  onSelectAswner1(answerNumber: number) {
    this.questions[answerNumber].answer = 1;
  }

  onSelectAswner2(answerNumber: number) {
    this.questions[answerNumber].answer = 2;
  }

  onSelectAswner3(answerNumber: number) {
    this.questions[answerNumber].answer = 3;
  }
}
