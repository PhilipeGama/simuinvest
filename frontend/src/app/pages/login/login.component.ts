import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from '../../auth/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  formLogin : FormGroup = new FormGroup({
    'email' : new FormControl(null, [Validators.required, Validators.email]),
    'password' : new FormControl(null, [Validators.required]),
  })

  private userSub: Subscription;

  user : User;
  hide = true;
  isLoginMode = false;
  isLoading = false;
  error?: string;

  constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) { }
  
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
    });
  }

  changeMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onLogin(){

    if (!this.formLogin.valid) {
      return
    }

    let authObs: Observable<AuthResponseData>;

    const email = this.formLogin.value.email;
    const password = this.formLogin.value.password;
    this.isLoading = true;
 
    this.authService.login(email, password);

    authObs.subscribe(resData => {
      this.isLoading = false;
      this.router.navigate(['/'])
    },
    errorMessage => {
      this._snackBar.open("Email ou senha inválida", "Fechar",{
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3 * 1000,
      });

      this.error = errorMessage;
      this.isLoading = false;
    });

  }

}
