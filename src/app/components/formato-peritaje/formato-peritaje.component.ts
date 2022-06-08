import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { MessagesService } from '../../services/messages.service';
import { SharedService } from '../../services/shared.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OnDestroy } from '@angular/core';
import { ModalFirmaComponent } from '../../templates/modal-firma/modal-firma.component';

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
export class FormatoPeritajeComponent implements OnInit, OnDestroy {
  private readonly title: string = 'FormatoPeritaje';
  private readonly subtitle: string = 'formulario';
  public kmActual: number;
  public firma: any;
  public shared: any;
  private sesion: any;
  public assets: string;

  public calificaciones: CalificacionesEstado[];
  public combustibles: Combustible[];
  public automatica = 1;
  public mecanica = 0;
  public t4x2 = 0;
  public t4x4 = 1;
  public tela = 0;
  public cuero = 1;

  public selectedCombustible: string | undefined;

  constructor(
    private readonly router: Router,
    private readonly sharedService: SharedService,
    private readonly messageService: MessagesService,
    public dialog: MatDialog
  ) {
    this.kmActual = 0;
    this.assets = environment.assets;
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
    this.kmActual = this.shared.encabezados.km;
  }

  public openModalFirma(nombre: string): void {
    const dialogRef = this.dialog.open(ModalFirmaComponent, {
      width: '90%',
      data: { nombre: nombre , firma: undefined }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.firma = result;
    });
  }

  private validarCampos(): boolean {
    let valid = true;
    //Campos vacios del formulario
    let items_formulario = document.getElementsByClassName('formulario-required');
    for (let i = 0; i < items_formulario.length; i++) {
      const itemValue = this.shared.formulario[items_formulario[i].getAttribute('name')!];
      if (itemValue === '' || itemValue === null) {
        let element = document.getElementsByName(items_formulario[i].getAttribute('name')!)[0];
        console.log(element.tagName);
        if (element.tagName !== 'INPUT') {
          this.focusInputChild(element)!;
        } else {
          element.focus();
        }
        this.messageService.warning('Oops...', 'Debe llenar el campo "' + items_formulario[i].getAttribute('name') + '" para continuar');
        valid = false;
        break;
      }
    }

    //Campos vacios en los encabezados
    if (valid) {
      let items_encabezados = document.getElementsByClassName('encabezado-required');
      for (let i = 0; i < items_encabezados.length; i++) {
        const itemValue = this.shared.encabezados[items_encabezados[i].getAttribute('name')!];
        if (itemValue === '' || itemValue === null) {
          let element = document.getElementsByName(items_encabezados[i].getAttribute('name')!)[0];
          if (element.tagName !== 'INPUT') {
            this.focusInputChild(element)!;
          } else {
            element.focus();
          }
          this.messageService.warning('Oops...', 'Debe llenar el campo "' + items_encabezados[i].getAttribute('name') + '" para continuar');
          valid = false;
          break;
        }
      }
    }

    if (valid) { //Kilometraje menor al actual
      if (this.shared.encabezados.km < this.kmActual) {
        document.getElementById('kmInput')?.focus();
        this.messageService.warning('Oops...', 'El kilometraje actual no puede ser menor al kilometraje anterior');
        this.shared.encabezados.km = this.kmActual;
        valid = false;
      }
    }
    if (valid) { //Cilindraje valor numerico decimal
      this.shared.encabezados.cilindraje = this.shared.encabezados.cilindraje.replace(',','.');
      if (isNaN(this.shared.encabezados.cilindraje)) {
        document.getElementById('cilindrajeInput')?.focus();
        this.messageService.warning('Oops...', 'El cilindraje del vehiculo debe ser un valor numerico');
        this.shared.encabezados.cilindraje = 0;
        valid = false;
      }
    }
    if (valid) {
      const fechaProxMant: Date = new Date(this.shared.encabezados.fec_prox_mantenimiento);
      if (fechaProxMant.getTime() < new Date(new Date().getTime() - 86400000).getTime()) {
        document.getElementById('fechaProxMantInput')?.focus();
        this.messageService.warning('Oops...', 'La fecha del proximo mantenimiento debe ser mayor o igual a la fecha actual');
        this.shared.encabezados.fec_prox_mantenimiento = new Date();
        valid = false;
      }
    }
    return valid;
  }

  private focusInputChild(element: HTMLElement): void {
    if (element.tagName !== 'INPUT') {
      const children = Array.from(element.children);
      for (let i = 0; i < children.length; i++) {
        const elem = document.getElementById(children[i].getAttribute('for')!)!;
        this.focusInputChild(elem);
      }
    } else {
      element.focus();
    }
  }

  public siguiente(): void {
    if(this.validarCampos())
      this.router.navigate(['formato-peritaje/listaPartes']);
  }

  public atras(): void {
    this.router.navigate(['formato-peritaje']);
  }

  async ngOnDestroy(): Promise<void> {
    this.sharedService.setValues(this.shared);
  }
  /*
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
  }*/

  /*private procesarInformacion(): void {
    this.listaPartes.forEach(function (parte) {
      parte.repi_tipo_a = (parte.repi_tipo == 0 ? 1 : 0);
      parte.repi_tipo_b = (parte.repi_tipo == 1 ? 1 : 0);
      parte.repar_tipo_a = (parte.repar_tipo == 0 ? 1 : 0);
      parte.repar_tipo_b = (parte.repar_tipo == 1 ? 1 : 0);
      parte.cambiada = (parte.estadoParte == 0 ? 1 : 0);
      parte.removida = (parte.estadoParte == 1 ? 1 : 0);
    });
  }*/

  /*public agregarIntervencion(): void {
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
  }*/
}
