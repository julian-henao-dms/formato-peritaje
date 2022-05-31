import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Maestro } from '../../components/formato-peritaje/interfaces/maestro.interface';
import { ApiService } from '../../services/api.service';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss']
})
export class ModalEditComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly apiService: ApiService,
    private readonly messageService: MessagesService,
  ) {
  }

  ngOnInit(): void {
  }

  public async guardarItem(maestro: Maestro): Promise<void>{
    if (maestro.descripcion !== '') {
      const servicio = (this.data.nombre == 'partes' ? '/Maestros/ModificarPartes' : '/Maestros/ModificarElementos');
      maestro.accion = 0;
      console.log(maestro);
      (await this.apiService.saveInformacion(servicio, maestro)).subscribe(async (response: any) => {
        console.log(response);
      }, error => {
        this.messageService.error("Oops...", "Error interno en el servidor");
      });
      this.messageService.success("Perfecto", "Los cambios fueron guardados");
    }
  }
}
