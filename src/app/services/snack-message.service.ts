import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({ providedIn: 'root'})
export class SnackMessageService {
  constructor(private _snackBar: MatSnackBar){}

  handle(message: string, action?: string){
    this._snackBar.open(message, action,{
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      duration: 3 * 1000,
      });
  }
}