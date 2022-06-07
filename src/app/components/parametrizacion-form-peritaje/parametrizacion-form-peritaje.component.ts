import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../services/api.service';
import { MessagesService } from '../../services/messages.service';
import { SharedService } from '../../services/shared.service';
import { Maestro } from '../../components/formato-peritaje/interfaces/maestro.interface';
import { ElementosAz } from '../formato-peritaje/interfaces/elementos-az';
import { EstadoPintura } from '../formato-peritaje/interfaces/estado-pintura';
import { ModalEditComponent } from 'src/app/templates/modal-edit/modal-edit.component';
import { MatDialog } from '@angular/material/dialog';


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

  public openModalEdit(nombre: string, maestro: Maestro): void {
    const dialogRef = this.dialog.open(ModalEditComponent, {
      width: '400px',
      data: { 
        nombre: nombre, 
        maestro: maestro,
        textModalElement : 'Escriba el nombre del elemento a crear y seleccione uno de los tipos disponibles para crear el elemento con sus opciones de elección.',
        textModalPart : 'Escriba el nombre de la parte a crear.',
    }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.cargarListaMaestros();
    });
  }

  private async cargarListaMaestros(): Promise<void> {
    let servicio = (this.parametrizacion == 'partes' ? '/Maestros/ListaPartes' : '/Maestros/ListaElementos');
    const param = '/309';
    (await this.apiService.getInformacion(servicio, param)).subscribe((response: any) => {
      this.listaMaestros = response;
      console.log(this.listaMaestros);
    }, error => {
      this.messageService.error("Oops...", "Error interno en el servidor");
    });
  }

}
