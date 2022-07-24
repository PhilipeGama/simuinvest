import { AfterContentInit, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { InvestReportService } from 'src/app/services/invert-report.service';
import { TesteService } from 'src/app/pages/teste/teste.service';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.scss']
})
export class TesteComponent implements OnInit, AfterContentInit {

  constructor(private teste: TesteService) {

  }

  ngAfterContentInit(): void {
  }

  ngOnInit(): void {
  }

  userLog: any;

  function1() {
    this.teste.getCurrentUser().then((data) => {
      data.valueChanges().subscribe(data => {
        console.log(data)
      })
    });
  }

  function2() {
  }


  function3() {
  }

}
