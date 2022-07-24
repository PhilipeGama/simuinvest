import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss']
})
export class RecoveryPasswordComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }
  email: string = '';

  onRecoveryPassword(){
    console.log("teste")
    this.auth.forgotPassword('teste1@uorak.com')
  }
}
