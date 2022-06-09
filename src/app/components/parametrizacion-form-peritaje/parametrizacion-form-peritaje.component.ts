import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../services/api.service';
import { MessagesService } from '../../services/messages.service';
import { SharedService } from '../../services/shared.service';
import { Maestro } from './interfaces/maestro.interface';
import { ElementosAz } from '../elementos-form-peritaje/interfaces/elementosAZ.interface';
import { EstadoPintura } from '../partes-form-peritaje/interfaces/estadoPintura.interface';
import { ModalEditComponent } from 'src/app/templates/modal-edit/modal-edit.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-parametrizacion-form-peritaje',
  templateUrl: './parametrizacion-form-peritaje.component.html',
  styleUrls: ['./parametrizacion-form-peritaje.component.scss']
})
export class ParametrizacionFormPeritrajeComponent implements OnInit {

  public parametrizacion?:string;

  public listaElementos: ElementosAz[] = [];
  public listaPartes: EstadoPintura[] = [];

  public listaMaestros: Maestro[] = [];
  public nuevoMaestro: Maestro;


  private readonly title: string = 'FormatoPeritaje';
  private readonly subtitle: string = 'parametrizacion';

  private sesion: any;
  public assets: string;
  public editMaestro: boolean = false;




  public showPartes: boolean = false;
  public showElementos: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly apiService: ApiService,
    private readonly sharedService: SharedService,
    private readonly messageService: MessagesService,
    public dialog: MatDialog
  ) {
    this.assets = environment.assets;
    this.nuevoMaestro = {
      id: 0,
      id_emp: 309,
      descripcion: '',
      valor_def: 0,
      accion: 0
    }
  }

  async ngOnInit(): Promise<void> {
    this.sesion = await this.sharedService.getSesion();
  }

  public async toogleTagPartes(): Promise<void>{
      await this.cargarListaMaestros();
  }

  public openModalEdit(maestro: Maestro, value:boolean): void {
    const dialogRef = this.dialog.open(ModalEditComponent, {
      width: '400px',
      data: { 
        nombre: this.parametrizacion, 
        maestro: maestro,
        textModalElement : 'Escriba el nombre del elemento a crear y seleccione uno de los tipos disponibles para crear el elemento con sus opciones de elección.',
        textModalPart : 'Escriba el nombre de la parte a crear.',
        listaMaestros: this.listaMaestros,
        editMaestro: value,
    }
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
        let servicio = (this.parametrizacion == 'partes' ? '/Maestros/ModificarPartes' : '/Maestros/ModificarElementos');
        let body: Maestro = this.listaMaestros[index];
        body.accion = 1;
        (await this.apiService.saveInformacion(servicio, body)).subscribe(async (response: any) => {

          await this.cargarListaMaestros();
        }, error => {
          this.messageService.error("Oops...", "Error interno en el servidor");
        });
        this.messageService.success("Perfecto","El item fue eliminado correctamente");
      }
    })
  }

  private async cargarListaMaestros(): Promise<void> {
    let servicio = (this.parametrizacion == 'partes' ? '/Maestros/ListaPartes' : '/Maestros/ListaElementos');
    const param = '/309';
    (await this.apiService.getInformacion(servicio, param)).subscribe((response: any) => {
      this.listaMaestros = response;
    }, error => {
      this.messageService.error("Oops...", "Error interno en el servidor");
    });
  }

  public atras(){
    this.router.navigate(['/formato-peritaje']);
  }

}
