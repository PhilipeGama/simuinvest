import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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


  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // this.questions = ;
    console.log(this.questions)
  }

  

  nextQuest(){
    if(this.questionNumber < 4 && this.questions[this.questionNumber].answer != undefined){
      this.questionNumber++;
    } else {
      this._snackBar.open("Escolha uma resposta", "Fechar",{
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3 * 1000,
      });
    }

  }

  previousQuestion(){
    if(this.questionNumber > 0){ 
      this.questionNumber--
    };
  }
}
