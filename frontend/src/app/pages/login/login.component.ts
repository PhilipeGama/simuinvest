import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { User } from './user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  email = new FormControl('', [Validators.required, Validators.email]);

  private userSub: Subscription;

  private user1: User;

  user : User;
  hide = true;
  isLoginMode = false;
  isLoading = false;
  error?: string;

  constructor(private authService: AuthService, private router: Router) { }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }


  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
    });
  }

  show(){
    console.log(this.user1)
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }


  changeMode(){
    this.isLoginMode = !this.isLoginMode;
  }



  onLogin(form: NgForm){
    console.log(form.value)
    if (!form.valid) {
      return
    }

    let authObs: Observable<AuthResponseData>;

    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
 
    authObs = this.authService.login(email, password);

    authObs.subscribe(resData => {
      this.isLoading = false;
      this.router.navigate(['/'])
    },
    errorMessage => {
      this.error = errorMessage;
      this.isLoading = false;
    });

    form.reset();
  }



  onSubmit(form: NgForm) {
    if (!form.valid) {
      return
    }

    let authObs: Observable<AuthResponseData>;

    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    if(this.isLoginMode){
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }
  
    authObs.subscribe(resData => {
      this.isLoading = false;
      this.router.navigate(['/'])
    },
    errorMessage => {
      this.error = errorMessage;
      this.isLoading = false;
    });

    form.reset();
  }



}
