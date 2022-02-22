import { Component, OnInit } from '@angular/core';
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


  constructor() { }

  ngOnInit(): void {
    // this.questions = ;
    console.log(this.questions)
  }


  nextQuest(){
    if(this.questionNumber < 1 && this.questions[this.questionNumber].answer != undefined){
      this.questionNumber++;
    }

  }

  previousQuestion(){
    if(this.questionNumber > 0){ 
      this.questionNumber--
    };
  }
}
