import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { MustMatch } from 'src/app/custom-validators/must-match.validator';
import { IUser } from 'src/app/interfaces/user.interface';
import { SnackMessageService } from 'src/app/services/snack-message.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup;
  user: IUser;

  constructor(
    private userService: UserService, 
    private router: Router,
    private authService: AuthService,
    private snackMessage: SnackMessageService,
    private _snackBar: MatSnackBar) {
    this.user = new IUser();
  }

  ngOnInit(): void {
    this.formRegister = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(7)]),
      'confirmPassword': new FormControl(null, [Validators.required]),
      'phone': new FormControl(null, [Validators.required]),
    }, {
      validators: MustMatch
    });
  }

  onSubmit() {
    if(this.formRegister.invalid){
      this.snackMessage.handle('Formulário inválido', 'Fechar');
      return
    }
    const today = new Date().toISOString();
    this.authService.signUp(this.formRegister.value.email, this.formRegister.value.password).then((result) => {
      this.user.name = this.formRegister.value.name;
      this.user.email = this.formRegister.value.email;
      this.user.createdAt = today;
      this.user.phone = this.formRegister.value.phone;
      this.userService.create(result.user.uid, this.user);
      this.user = null;
      this.formRegister.reset();
      this.router.navigate(['/login'])
    })
    .catch((error) => {
      this.snackMessage.handle('Este email ja existe', 'Fechar');
    });
  }
}


 
