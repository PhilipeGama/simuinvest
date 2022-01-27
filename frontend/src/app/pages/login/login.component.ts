import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);

  hide = true;
  isLoginMode = false;
  isLoading = false;
  error?: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
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



  onSubmit(form: NgForm) {
    if (!form.valid) {
      return
    }

    let authObs: Observable<AuthResponseData>;

    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    if(this.isLoginMode){
      console.log('login')
      authObs = this.authService.login(email, password);
    } else {
      console.log('singup')
      authObs = this.authService.signUp(email, password);
    }
  
    authObs.subscribe(resData => {
      console.log(resData)
      this.isLoading = false;
    },
    errorMessage => {
      this.error = errorMessage;
      this.isLoading = false;
    });

    form.reset();
  }
}
