import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { map } from "rxjs/operators";
import { AuthService } from "src/app/auth/auth.service";
import { IUser } from "src/app/interfaces/user.interface";
import { UserService } from "src/app/services/user.service";


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  // TODO improving 
  user: IUser = {
    name: '',
    email: '',
    phone: '',
    profile: 'Sem perfil de investidor',
    createdAt: '6/8/2022'
  };

  formEdit: FormGroup;

  constructor(
    private auth: AuthService,
    private _snackBar: MatSnackBar,
    private userService: UserService) { }

  ngOnInit(): void {
    this.formEdit = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'phone': new FormControl(null, [Validators.required]),
      'password': new FormControl(null),
      'confirmpassword': new FormControl(null)
    })
    this.getInvestor()
  }

  getInvestor() {
    const userId = this.auth.user.value.id;

    if (!userId) {
      return;
    }

    this.userService.getUserById(userId).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      if (data.length === 0) {

      } else {
        this.user._id = data[0].key;
        this.user.email = data[0].email;
        this.user.name = data[0].name;
        this.user.profile = data[0].profile;
        this.user.phone = data[0].phone;
        this.user.createdAt = data[0].createdAt;
        // this.user.updatedAt = data[0].updatedAt;

        this.formEdit.patchValue({
          'name': data[0].name,
          'phone': data[0].phone
        })
      }
    });
  }


  onSubmit() {
    this.user.name = this.formEdit.value.name;
    this.user.phone = this.formEdit.value.phone;
    
    this.userService.update(this.user._id, this.user)


    this._snackBar.open("Dados alterados com sucesso!", "Fechar", {
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
      duration: 3 * 1000,
    });
  }
}