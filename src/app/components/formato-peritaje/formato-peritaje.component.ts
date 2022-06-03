import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalParametrizacionComponent } from '../../templates/modal-parametrizacion/modal-parametrizacion.component';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../services/api.service';
import { MessagesService } from '../../services/messages.service';
import { ElementosAz } from './interfaces/elementos-az';
import { EstadoPintura } from './interfaces/estado-pintura';
import { formulario } from './interfaces/formulario.interface';
import { Encabezados } from './interfaces/encabezados.interface';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from '../../services/shared.service';

interface CalificacionesEstado {
  value: number;
  viewValue: string;
}

interface Combustible {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-formato-peritaje',
  templateUrl: './formato-peritaje.component.html',
  styleUrls: ['./formato-peritaje.component.scss']
})
export class FormatoPeritajeComponent implements OnInit {
  private readonly title: string = 'FormatoPeritaje';
  private readonly subtitle: string = 'formulario';
  public nombreItem: string;
  public idElementoIntervencion: number;
  public estados: {id: number, descripcion: string}[] = [];
  public listaElementos: ElementosAz[] = [];
  public listaPartes: EstadoPintura[] = [];
  public encabezados: Encabezados;
  public listaFormularios: formulario[] = [];
  public formulario: formulario;
  public formActivo: boolean;
  public showButton: boolean;
  public placa: string;
  public vin: string;
  public shared: any;
  private sesion: any;
  public assets: string;

  private idChk: number;
  public displayedColumns: string[] = ['id', 'califica', 'fecini', 'fecfin'];
  public calificaciones: CalificacionesEstado[];
  public combustibles: Combustible[];

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

  constructor(
    private readonly router: Router,
    private readonly apiService: ApiService,
    private readonly sharedService: SharedService,
    private readonly messageService: MessagesService,
    public dialog: MatDialog,
  ) {
    this.nombreItem = '';
    this.placa = '';
    this.vin = '';
    this.formActivo = false;
    this.showButton = false;
    this.idElementoIntervencion = 0;
    this.idChk = 0;
    this.assets = environment.assets;
    this.formulario = {
      id: 0,
      califica: '',
      fecini: new Date(),
      id_usuario: 1, // usuario quemado
      id_usu_inspector: 1, // usuario inspector quemado
      id_cot_item_lote: 0,
      prueba_ruta: 0,
      fecfin: new Date(),
      califica2: 0
    }
    this.encabezados = {
      id_veh_chk_usados: 0,
      califica: '',
      fecini: new Date(),
      id_usuario: 1,
      id_usu_inspector: 1,
      id_cot_item_lote: 0,
      prueba_ruta: 0,
      fecfin: new Date(),
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
      cilindraje: 0,
      color: '',
      referencia: '',
      clase: 0, // Que es Clase?
      combustible: 0,
      lugar_matricula: '',
      capacidad_sillas: 0,
      km: 0,
      fec_prox_mantenimiento: new Date(),
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
    this.calificaciones = [
      {value: 5, viewValue: 'Nuevo'}, 
      {value: 4, viewValue: 'Muy Bueno'},
      {value: 3, viewValue: 'Defectos'},
      {value: 2, viewValue: 'Problemas'},
      {value: 1, viewValue: 'Malo'}
    ];
    this.combustibles = [
      {value: '0', viewValue: 'Gasolina'},
      {value: '1', viewValue: 'Diesel'},
      {value: '2', viewValue: 'Gas'},
      {value: '3', viewValue: 'Hibrido'},
      {value: '4', viewValue: 'Eléctrico'}
    ];
  }

  async ngOnInit(): Promise<void> {
    this.sesion = await this.sharedService.getSesion();
    this.shared = await this.sharedService.getValues();

    const servicio = '/vehiculosusados/estadospintura';
    (await this.apiService.getInformacion(servicio, '')).subscribe(async (response: any) => {
      this.estados = response;
    }, error => {
      this.messageService.error("Oops...", "Error interno en el servidor");
    });
  }

  public async onEnter(): Promise<void> {
    if (this.placa !== '' || this.vin !== '') {
      this.messageService.info("Atención", "Estamos Cargando la información solicitada");
      let servicio = '/vehiculosusados/formularios';
      const params = '/309/' + (this.placa !== '' ? this.placa : ' ') + '/' + (this.vin !== '' ? this.vin : ' ');
      (await this.apiService.getInformacion(servicio, params)).subscribe(async (response: any) => {
        this.listaFormularios = response;
        this.showButton = true;
        this.nuevoFormulario();
        if (response.length == 0) {
          setTimeout(
            () => {
              this.messageService.info("Atención...", "La placa o vin ingresados no corresponden a un vehículo en el sistema");
            }, 1000);
        }
      }, error => {
        this.messageService.error("Oops...", "Error interno en el servidor");
        this.showButton = false;
      });
    } else {
      this.messageService.info("Atención...", "Debe ingresar una placa o vin para continuar");
      this.showButton = false;
    }
  }

  public async nuevoFormulario(): Promise<void> {
    const servicio = '/vehiculosusados/encabezados';
    const params = '/309/' + (this.placa !== '' ? this.placa : ' ') + '/' + (this.vin !== '' ? this.vin : ' ');
    (await this.apiService.getInformacion(servicio, params)).subscribe(async (response: any) => {
      this.encabezados = response;
      this.formulario.id_cot_item_lote = this.encabezados.id_cot_item_lote;
      this.shared.formulario = this.formulario;
      this.encabezados.id_usuario = 1; // usuario quemado
      this.encabezados.id_usu_inspector = 1; // usuario inspector quemado
      this.shared.encabezados = this.encabezados;
      this.formActivo = true;
      this.cargarlistaPartes();
      setTimeout(
        () => {
          this.cargarlistaElementos();
        }, 1000);
    }, error => {
      this.messageService.error("Oops...", "Error interno en el servidor");
    });
  }

  public prueba() {
    console.log(this.shared);
  }

  public async guardarFormulario(): Promise<void> {
    this.procesarInformacion();
    let servicio = '/vehiculosusados/guardarformulario';
    (await this.apiService.saveInformacion(servicio, this.formulario)).subscribe(async (response: any) => {
      if (response > 0) {
        this.idChk = response;
        this.encabezados.id_veh_chk_usados = this.idChk;
        servicio = '/vehiculosusados/guardarencabezados';
        (await this.apiService.saveInformacion(servicio, this.encabezados)).subscribe(async (response: any) => {
          if (response) {
            servicio = '/vehiculosusados/guardarpartes';
            this.listaPartes.forEach( (parte) => {
              parte.id_veh_chk_usados = this.idChk;
              parte.accion = 0;
            });
            (await this.apiService.saveInformacion(servicio, this.listaPartes)).subscribe(async (response: any) => {
              if (response) {
                servicio = '/vehiculosusados/guardarelementos';
                this.listaElementos.forEach((elemento) => {
                  elemento.id_veh_chk_usados = this.idChk;
                  elemento.accion = 0;
                });
                (await this.apiService.saveInformacion(servicio, this.listaElementos)).subscribe(async (response: any) => {
                  if (response) {
                    this.messageService.success("Perfecto", "El formato de peritaje fue guardado correctamente");
                  } else {
                    this.messageService.error("Oops...", "No se pudieron guardar los elementos AZ del formulario");
                  }
                }, error => {
                  this.messageService.error("Oops...", "Error interno en el servidor");
                });
              } else {
                this.messageService.error("Oops...", "No se pudieron guardar los estados Pintura del formulario");
              }
            }, error => {
              this.messageService.error("Oops...", "Error interno en el servidor");
            });
          } else {
            this.messageService.error("Oops...", "No se pudieron guardar los encabezados del formulario");
          }
        }, error => {
          this.messageService.error("Oops...", "Error interno en el servidor");
        });
      } else {
        this.messageService.error("Oops...", "No se pudo guardar el formulario");
      }
    }, error => {
      this.messageService.error("Oops...", "Error interno en el servidor");
    });
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

  public openModalCrudMaestros(maestro: string): void {
    const dialogRef = this.dialog.open(ModalParametrizacionComponent, {
      width: '90%',
      data: { nombre: maestro }
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result == 'partes') {
        await this.cargarlistaPartes();
      } else if (result == 'elementos') {
        await this.cargarlistaElementos();
      }
    });
  }

  public agregarIntervencion(): void {
    if (this.idElementoIntervencion !== 0) {
      for (let i = 0; i < this.listaElementos.length; i++) {
        if (this.listaElementos[i].id_chk_maestro_elementos == this.idElementoIntervencion) {
          this.listaElementos[i].intervencion = 1;
          break;
        }
      }
      this.idElementoIntervencion = 0;
    }
  }

  private async cargarlistaElementos(idChk: number = 0): Promise<void> {
    const servicio = '/VehiculosUsados/Elementos';
    const params = '/309/' + idChk.toString();
    (await this.apiService.getInformacion(servicio, params)).subscribe((response: any) => {
      this.listaElementos = response;
    }, error => {
      this.messageService.error("Oops...", "Error interno en el servidor");
    });
  }

  private async cargarlistaPartes(idChk: number = 0): Promise<void> {
    const servicio = '/VehiculosUsados/PartesPintura';
    const params = '/309/' + idChk.toString();
    (await this.apiService.getInformacion(servicio, params)).subscribe((response: any) => {
      this.listaPartes = response;
    }, error => {
      this.messageService.error("Oops...", "Error interno en el servidor");
    });
  }



  private resetinitData(): void {
    this.placa = '';
    this.vin = '';
    this.formulario = {
      id: 0,
      califica: '',
      fecini: new Date,
      id_usuario: 0,
      id_usu_inspector: 0,
      id_cot_item_lote: 0,
      prueba_ruta: 0,
      fecfin: new Date,
      califica2: 0,
    }
    this.encabezados = {
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
      cilindraje: 0,
      color: '',
      referencia: '',
      clase: 0, // Que es Clase?
      combustible: 0,
      lugar_matricula: '',
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
}
