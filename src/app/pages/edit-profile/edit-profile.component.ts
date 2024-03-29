import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { map } from "rxjs/operators";
import { AuthService } from "src/app/auth/auth.service";
import { IUser } from "src/app/interfaces/user.interface";
import { SnackMessageService } from "src/app/services/snack-message.service";
import { UserService } from "src/app/services/user.service";


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  isLoading = true;
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
    private snackMessage: SnackMessageService,
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

    this.userService.getUser().then((user) => {
      user.snapshotChanges()
      .pipe(
        map(c => ({...c.payload.val() }))
      ).subscribe(user => {
        const today = new Date().toISOString();
        this.user.email = user.email;
        this.user.name = user.name;
        if(user.profile)
          this.user.profile = user.profile;

        this.user.phone = user.phone;
        this.user.createdAt = user.createdAt;
        this.user.updatedAt = today;

        this.formEdit.patchValue({
          'name': user.name,
          'phone': user.phone
        })

        this.isLoading = false;
      }
      )}
    ) 
  }


  onSubmit() {
    this.user.name = this.formEdit.value.name;
    this.user.phone = this.formEdit.value.phone;
    this.userService.update(this.user).then(() => {
      this.snackMessage.handle("Dados alterados com sucesso!", "Fechar")
    })
  }
}