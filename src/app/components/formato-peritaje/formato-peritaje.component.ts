import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalParametrizacionComponent } from 'src/app/templates/modal-parametrizacion/modal-parametrizacion.component';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../services/api.service';
import { MessagesService } from '../../services/messages.service';
import { ElementosAz } from './interfaces/elementos-az';
import { EstadoPintura } from './interfaces/estado-pintura';
import { ItemsVehiculosUsados } from './interfaces/items-vehiculo';
import { formulario } from './interfaces/formulario.interface';

import { MatDialog } from '@angular/material/dialog';

interface CalificacionesEstado {
  value: string;
  viewValue: string;
}

interface Combustible {
  value: string;
  viewValue: string;
}
export interface Elements {
  value: string;
  viewValue: string;
}

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-formato-peritaje',
  templateUrl: './formato-peritaje.component.html',
  styleUrls: ['./formato-peritaje.component.scss']
})
export class FormatoPeritajeComponent implements OnInit {
  public nombreItem: string;
  public fieldArray: Array<any> = [];
  public newAttribute: any = {};
  public listaElementos: ElementosAz[] = [];
  public listaPartes: EstadoPintura[] = [];
  public formularioVehiculos: ItemsVehiculosUsados;
  public infoVehiculo: formulario;
  public placa: string;
  public vin: string;
  public assets: string;


  public A = 0;
  public B = 1;
  public si = 1;
  public no = 0;

  public automatica = 1;
  public mecanica = 0;
  public t4x2 = 0;
  public t4x4 = 1;
  public tela = 0;
  public cuero = 1;

  public repiTipoA = 0;
  public repiTipoB = 1;
  public reparTipoA = 0;
  public reparTipoB = 1;
  public cambiado = 0;
  public removido = 1;
  public selectedCombustible: string | undefined;

  calificaciones: CalificacionesEstado[] = [
   {value: '5', viewValue: 'Nuevo'}, 
   {value: '4', viewValue: 'Muy Bueno'},
   {value: '3', viewValue: 'Defectos'},
   {value: '2', viewValue: 'Problemas'},
   {value: '1', viewValue: 'Malo'},
 ];
 
 combustibles: Combustible[] = [
   {value: '0', viewValue: 'Gasolina'},
   {value: '1', viewValue: 'Diesel'},
   {value: '2', viewValue: 'Gas'},
   {value: '3', viewValue: 'Hibrido'},
   {value: '4', viewValue: 'Eléctrico'},
  
 ];

 elements: Elements[] = [
  { value: '1', viewValue: 'Airbag' },
  { value: '2', viewValue: 'Capo' },
  { value: '3', viewValue: 'Antena' }
];

  constructor(
    private readonly router: Router,
    private readonly apiService: ApiService,
    private readonly messageService: MessagesService,
    public dialog: MatDialog,
  ) {
    this.nombreItem = '';
    this.placa = '';
    this.vin = '';
    this.assets = environment.assets;
    this.infoVehiculo = {
      Id: 0,
      Califica: '',
      Fecini: new Date,
      Id_usuario: 0,
      Id_usu_inspector: 0,
      Id_cot_item_lote: 0,
      Prueba_ruta: 0,
      Fecfin: new Date,
      Califica2: 0,
    }
    this.formularioVehiculos = {
      id_veh_chk_usados: 0,
      califica: '',
      fecini: new Date,
      id_usuario: 0,
      id_usu_inspector: 0,
      id_cot_item_lote: 0,
      prueba_ruta: 0,
      fecfin: new Date,
      califica2: 0,
      id_veh_chk_usados_mas: 0,
      llave: 0,
      libro: 0,
      cambio_correa: 0,
      lugar_cambio_correa: '',
      herramienta: 0,
      manual: 0,
      reclamo_aseg: 0,
      valor_reclamo_aseg: 0,
      marca_radio: '',
      marca_llantas: '',
      marca_bateria: '',
      lugar_mante: '',
      cilindraje: '',
      color: '',
      referencia: '',
      clase: 0, // Que es Clase?
      combustible: 0,
      lugar_matricula: 0,
      capacidad_sillas: 0,
      km: 0,
      fec_prox_mantenimiento: new Date,
      cojineria: 0,
      caja: 0,
      traccion: 0,
      rin: 0,
      estribo: 0,
      vidrios: 0,
      techo_vidrio: 0,
      retrovisores_electricos: 0,
      no_airbags: 0,
      no_rin: 0,
      barra_techo: 0,
      exploradora: 0,
      placa: '',
      linea: '',
      marca: '',
      modelo: '',
    }
  }

  async ngOnInit(): Promise<void> {
  }

  public async onEnter(): Promise<void> {
    if (this.placa !== '' || this.vin !== '') {
      this.messageService.info("Atención", "Estamos Cargando la información solicitada");
      let servicio = '/vehiculosusados/datos';
      const params = '/309/' + (this.placa !== '' ? this.placa : ' ') + '/' + (this.vin !== '' ? this.vin : ' ');
      (await this.apiService.getInformacion(servicio, params)).subscribe(async (response: any) => {
        if (response) {
          this.infoVehiculo = response;
          servicio = '/vehiculosusados/formulario';
          (await this.apiService.getInformacion(servicio, params)).subscribe(async (resp: any) => {
            this.formularioVehiculos = resp;
            servicio = '/VehiculosUsados/PartesPintura';
            const parametros = '/309/0';
            (await this.apiService.getInformacion(servicio, parametros)).subscribe(async (resp: any) => {
              this.listaPartes = resp;
              servicio = '/VehiculosUsados/Elementos';
              (await this.apiService.getInformacion(servicio, parametros)).subscribe((resp: any) => {
                this.listaElementos = resp;
              }, error => {
                this.messageService.error("Oops...", "Error interno en el servidor");
              });
            }, error => {
              this.messageService.error("Oops...", "Error interno en el servidor");
            });
          }, error => {
            this.messageService.error("Oops...", "Error interno en el servidor");
          });
        } else {
          setTimeout(
            () => {
              this.messageService.info("Atención...", "La placa o vin ingresados no corresponden a un vehículo en el sistema");
            }, 1000);
        }
      }, error => {
        this.messageService.error("Oops...", "Error interno en el servidor");
      });
    } else {
      this.messageService.info("Atención...", "Debe ingresar una placa o vin para continuar");
    }
  }

  public prueba() {
    console.log(this.listaPartes);
  }

  public guardarFormulario(): void {
    this.procesarInformacion();
  }

  private procesarInformacion(): void {
    this.listaPartes.forEach(function (parte) {
      parte.repi_tipo_a = (parte.repi_tipo == 0 ? 1 : 0);
      parte.repi_tipo_b = (parte.repi_tipo == 1 ? 1 : 0);
      parte.repar_tipo_a = (parte.repar_tipo == 0 ? 1 : 0);
      parte.repar_tipo_b = (parte.repar_tipo == 1 ? 1 : 0);
      parte.cambiada = (parte.estadoParte == 0 ? 1 : 0);
      parte.removida = (parte.estadoParte == 1 ? 1 : 0);
    });
  }

  private resetinitData(): void {
    this.placa = '';
    this.vin = '';
    this.infoVehiculo = {
      Id: 0,
      Califica: '',
      Fecini: new Date,
      Id_usuario: 0,
      Id_usu_inspector: 0,
      Id_cot_item_lote: 0,
      Prueba_ruta: 0,
      Fecfin: new Date,
      Califica2: 0,
    }
    this.formularioVehiculos = {
      id_veh_chk_usados: 0,
      califica: '',
      fecini: new Date,
      id_usuario: 0,
      id_usu_inspector: 0,
      id_cot_item_lote: 0,
      prueba_ruta: 0,
      fecfin: new Date,
      califica2: 0,
      id_veh_chk_usados_mas: 0,
      llave: 0,
      libro: 0,
      cambio_correa: 0,
      lugar_cambio_correa: '',
      herramienta: 0,
      manual: 0,
      reclamo_aseg: 0,
      valor_reclamo_aseg: 0,
      marca_radio: '',
      marca_llantas: '',
      marca_bateria: '',
      lugar_mante: '',
      cilindraje: '',
      color: '',
      referencia: '',
      clase: 0, // Que es Clase?
      combustible: 0,
      lugar_matricula: 0,
      capacidad_sillas: 0,
      km: 0,
      fec_prox_mantenimiento: new Date,
      cojineria: 0,
      caja: 0,
      traccion: 0,
      rin: 0,
      estribo: 0,
      vidrios: 0,
      techo_vidrio: 0,
      retrovisores_electricos: 0,
      no_airbags: 0,
      no_rin: 0,
      barra_techo: 0,
      exploradora: 0,
      placa: '',
      linea: '',
      marca: '',
      modelo: '',
    }
  }

  public openModalCrudMaestros(maestro: string): void {
    const dialogRef = this.dialog.open(ModalParametrizacionComponent, {
      width: '90%',
      data: { nombre: maestro }
    });
    dialogRef.afterClosed().subscribe(async result => {
      const servicio = (result == 'partes' ? '/VehiculosUsados/PartesPintura' : '/VehiculosUsados/Elementos');
      const params = '/309/0';
      (await this.apiService.getInformacion(servicio, params)).subscribe(async (response: any) => {
        if (result == 'partes') {
          this.listaPartes = response;
        } else {
          this.listaElementos = response;
        }
      }, error => {
        this.messageService.error("Oops...", "Error interno en el servidor");
      });
    });
  }

  public addFieldValue() {
    this.fieldArray.push(this.newAttribute)
    this.newAttribute = {};
  }

  public deleteFieldValue(index: number) {
      this.fieldArray.splice(index, 1);
  }
}
