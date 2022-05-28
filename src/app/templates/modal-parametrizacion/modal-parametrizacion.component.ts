import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-parametrizacion',
  templateUrl: './modal-parametrizacion.component.html',
  styleUrls: ['./modal-parametrizacion.component.scss']
})
export class ModalParametrizacionComponent implements OnInit {
  public opcion: number = 0;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 

  }

  ngOnInit(): void {
  }

  prueba() {
    console.log(this.data.opcion);
  }
}
