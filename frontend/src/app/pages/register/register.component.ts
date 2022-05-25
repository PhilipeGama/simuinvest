import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { MustMatch } from 'src/app/custom-validators/must-match.validator';
import { IInvestor } from 'src/app/models/IInvestor';
import { InvestorService } from 'src/app/services/investor.service';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup;
  investor: IInvestor;

  constructor(private investorService: InvestorService, private router: Router, private authService: AuthService) {
    this.investor = new IInvestor();
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


    this.investorService.getInvestorByEmail(this.formRegister.value.email).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      if (data.length === 0) {
        this.authService.signUp(this.formRegister.value.email, this.formRegister.value.password).subscribe(data => console.log(data))
        this.investor.name = this.formRegister.value.name;
        this.investor.email = this.formRegister.value.email;
        this.investor.password = this.formRegister.value.password;
        this.investor.type = 'Sem perfil de investor';
        this.investor.phone = this.formRegister.value.phone;
        this.investorService.create(this.investor)
     
        this.investor = null;
        this.formRegister.reset();
        this.router.navigate(['/login'])
      } else {
        console.log(data)
      }
    });
  }

  onGetInvestorByEmail() {
    this.investorService.getInvestorByEmail(this.formRegister.value.email).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      if (data.length === 0) {
        console.log('email não encontrado!')
        console.log(data)
      } else {
        console.log('email encontrado!')
        console.log(data)
      }
    });
  }

  onShowForm(){
    console.log(this.formRegister.errors?.mustMatch)
  }

}
