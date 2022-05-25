import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { map } from "rxjs/operators";
import { IInvestor } from "src/app/models/IInvestor";
import { InvestorService } from "src/app/services/investor.service";


@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit{

    investor: IInvestor = {
        name: '',
        email: '',
        phone: '',
        type: 'Sem perfil de investidor',
    };

    investor_key: any;

    formEdit: FormGroup;

    constructor(private _snackBar: MatSnackBar, private investorService: InvestorService){
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

        this.investorService.getInvestorByEmail(userData.email).snapshotChanges().pipe(
            map(changes =>
              changes.map(c =>
                ({ key: c.payload.key, ...c.payload.val() })
              )
            )
          ).subscribe(data => {
            if (data.length === 0) {

            } else {
              console.log(data)
              this.investor_key = data[0].key;
              this.investor.email = data[0].email;
              this.investor.password = data[0].password;
              this.investor.name = data[0].name;
              this.investor.type = data[0].type;
              this.investor.phone = data[0].phone;

              this.formEdit.patchValue({
                'name': data[0].name,
                'phone': data[0].phone
              })
            }
      
          });
    }

    showData(){
        console.log(this.investor)
    }

  
    onSubmit(){
        this.investor.name = this.formEdit.value.name;
        this.investor.phone = this.formEdit.value.phone;

        this.investorService.update(this.investor_key, this.investor)

        this._snackBar.open("Dados alterados com sucesso!", "Fechar",{
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3 * 1000,
          });
    }
}