import { AfterContentInit, Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { InvestReportService } from 'src/app/services/invert-report.service';
import { TesteService } from 'src/app/services/teste.service';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.scss']
})
export class TesteComponent implements OnInit, AfterContentInit {

  constructor(private auth: AuthService, private teste: TesteService, private investReportService: InvestReportService) {

  }
  ngAfterContentInit(): void {

  }

  ngOnInit(): void {
    this.function_3();

  }

  userLog: any;

  function_1() {
  }

  function_2() {
  }


  function_3() {
  }

}
