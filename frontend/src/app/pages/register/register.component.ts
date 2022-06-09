import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { MustMatch } from 'src/app/custom-validators/must-match.validator';
import { IUser } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup;
  user: IUser;

  constructor(private userService: UserService, private router: Router, private authService: AuthService) {
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
    this.userService.getUserByEmail(this.formRegister.value.email).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      if (data.length === 0) {
        const today = new Date().toLocaleDateString();
        this.authService.signUp(this.formRegister.value.email, this.formRegister.value.password).subscribe(data => {
          this.user.name = this.formRegister.value.name;
          this.user.email = this.formRegister.value.email;
          this.user.createdAt = today;
          this.user.profile = 'Sem perfil de investor';
          this.user.phone = this.formRegister.value.phone;
          this.userService.create(data.localId, this.user)
          this.user = null;
          this.formRegister.reset();
          this.router.navigate(['/login'])
        })
      } else {
        console.log(data)
      }
    });
  }

}
