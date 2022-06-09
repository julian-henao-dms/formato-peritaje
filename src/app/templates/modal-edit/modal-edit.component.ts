import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Maestro } from '../../components/parametrizacion-form-peritaje/interfaces/maestro.interface';
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
    if(this.data.nombre == 'elementos'){
      this.data.maestro.valor_def = 1;
    }else{
      this.data.maestro.valor_def = 0;
    }

  }

  public async guardarItem(maestro: Maestro): Promise<void>{
    if(!this.data.listaMaestros.find((x:any) => x.descripcion == maestro.descripcion )){
      if (maestro.descripcion !== '') {
        const servicio = (this.data.nombre == 'partes' ? '/Maestros/ModificarPartes' : '/Maestros/ModificarElementos');
        maestro.accion = 0;
      
        (await this.apiService.saveInformacion(servicio, maestro)).subscribe(async (response: any) => {
         
        }, error => {
          this.messageService.error("Oops...", "Error interno en el servidor");
        });
        this.messageService.success("Perfecto", "Los cambios fueron guardados");
      }
    }else{
      this.messageService.warning("Oops...", "Error, el nombre del maestro ya existe");
    }
  
  }
}
