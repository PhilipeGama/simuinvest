import { AfterContentInit, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { InvestReportService } from 'src/app/services/invert-report.service';
import { TesteService } from 'src/app/pages/teste/teste.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.scss']
})
export class TesteComponent implements OnInit, AfterContentInit {

  userData: {
    email: string;
    id: string;
  } = JSON.parse(localStorage.getItem('userData'));

  constructor(private teste: TesteService, private userService: UserService) {

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
    this.userService.updateProfile(this.userData.id, 'Perfil 1').then(data => console.log(data))
  }


  function3() {
  }

}
