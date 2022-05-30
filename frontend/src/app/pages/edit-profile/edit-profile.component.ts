import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { map } from "rxjs/operators";
import { IUser } from "src/app/interfaces/user.interface";
import { UserService } from "src/app/services/user.service";


@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit{

    user: IUser = {
        name: '',
        email: '',
        phone: '',
        profile: 'Sem perfil de investidor',
        createdAt: new Date()
    };

    investor_key: any;

    formEdit: FormGroup;

    constructor(private _snackBar: MatSnackBar, private userService: UserService){
        this.formEdit = new FormGroup({
            'name': new FormControl(null),
            'phone': new FormControl(null),
            'password': new FormControl(null),
            'confirmpassword': new FormControl(null)
        })
        this.getInvestor()
    }

    ngOnInit(): void {
 

    }


    getInvestor(){
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return;
        }

        this.userService.getUserByEmail(userData.email).snapshotChanges().pipe(
            map(changes =>
              changes.map(c =>
                ({ key: c.payload.key, ...c.payload.val() })
              )
            )
          ).subscribe(data => {
            if (data.length === 0) {

            } else {
              console.log(data)
              this.user._id = data[0].key;
              this.user.email = data[0].email;
              this.user.name = data[0].name;
              this.user.profile = data[0].profile;
              this.user.phone = data[0].phone;

              this.formEdit.patchValue({
                'name': data[0].name,
                'phone': data[0].phone
              })
            }
      
          });
    }

    showData(){
        console.log(this.user)
    }

  
    onSubmit(){
        this.user.name = this.formEdit.value.name;
        this.user.phone = this.formEdit.value.phone;

        this.userService.update(this.investor_key, this.user)

        this._snackBar.open("Dados alterados com sucesso!", "Fechar",{
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3 * 1000,
          });
    }
}