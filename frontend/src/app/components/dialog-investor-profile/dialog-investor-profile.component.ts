import { Component, Input, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-material',
  templateUrl: './dialog-investor-profile.component.html',
  styleUrls: ['./dialog-investor-profile.component.scss']
})
export class DialogMaterialComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
