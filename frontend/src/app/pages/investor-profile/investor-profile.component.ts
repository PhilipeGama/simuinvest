import { Component, OnInit } from '@angular/core';



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



  questions: Questions[] = [
    {
      question01: 'Mussum Ipsum, cacilds vidis litro abertis. Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus.Paisis, filhis, espiritis santis.Suco de cevadiss deixa as pessoas mais interessantis.Copo furadis é disculpa de bebadis, arcu quam euismod magna.',
      question02: 'pergunta 1 2',
      question03: 'pergunta 1 3',
    },
    {
      question01: 'pergunta 2 1',
      question02: 'pergunta 2 2',
      question03: 'pergunta 2 3',
    },
    {
      question01: 'pergunta 3 1',
      question02: 'pergunta 3 2',
      question03: 'pergunta 3 3',
    }
  ]


  questionNumber: number = 0;

  investorProfile: string = '';


  constructor() { }

  ngOnInit(): void {
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
