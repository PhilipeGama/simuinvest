import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SimulatorService } from 'src/app/services/simulator.service';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)public data: any,private simulatorService: SimulatorService) { }

  ngOnInit(): void {
  }

  onDeleteInvestReport(){
    this.simulatorService.deleteInvestReport(this.data.uid)
  }
}
