import { Component, OnInit, Inject, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MessagesService } from '../../services/messages.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Maestro } from '../../components/formato-peritaje/interfaces/maestro.interface';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ModalEditComponent } from '../modal-edit/modal-edit.component';

@Component({
  selector: 'app-modal-parametrizacion',
  templateUrl: './modal-parametrizacion.component.html',
  styleUrls: ['./modal-parametrizacion.component.scss']
})
export class ModalParametrizacionComponent implements OnInit {
  public opcion: number = 0;
  public listaMaestros: Maestro[] = [];
  public nuevoMaestro: Maestro;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly apiService: ApiService,
    private readonly messageService: MessagesService,
    public dialog: MatDialog
  ) {
    this.nuevoMaestro = {
      id: 0,
      id_emp: 309,
      descripcion: '',
      valor_def: 0,
      accion: 0
    }
  }

  async ngOnInit(): Promise<void> {
    await this.cargarListaMaestros();
  }

  public openModalEdit(nombre: string, maestro: Maestro): void {
    const dialogRef = this.dialog.open(ModalEditComponent, {
      width: '400px',
      data: { nombre: nombre, maestro: maestro}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.cargarListaMaestros();
    });
  }

  public eliminarMaestro(index: number): void {
    Swal.fire({
      title: 'Esta seguro?',
      text: "Esta accion eliminará el item de la base de datos!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, Borrar!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        let servicio = (this.data.nombre == 'partes' ? '/Maestros/ModificarPartes' : '/Maestros/ModificarElementos');
        let body: Maestro = this.listaMaestros[index];
        body.accion = 1;
        (await this.apiService.saveInformacion(servicio, body)).subscribe(async (response: any) => {
          console.log(response);
          await this.cargarListaMaestros();
        }, error => {
          this.messageService.error("Oops...", "Error interno en el servidor");
        });
        this.messageService.success("Perfecto","El item fue eliminado correctamente");
      }
    })
  }

  private async cargarListaMaestros(): Promise<void> {
    let servicio = (this.data.nombre == 'partes' ? '/Maestros/ListaPartes' : '/Maestros/ListaElementos');
    const param = '/309';
    (await this.apiService.getInformacion(servicio, param)).subscribe((response: any) => {
      this.listaMaestros = response;
      console.log(this.listaMaestros);
    }, error => {
      this.messageService.error("Oops...", "Error interno en el servidor");
    });
  }
}
