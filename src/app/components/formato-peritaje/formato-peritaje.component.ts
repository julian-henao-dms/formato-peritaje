import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { MessagesService } from '../../services/messages.service';
import { SharedService } from '../../services/shared.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OnDestroy } from '@angular/core';
import { ModalFirmaComponent } from '../../templates/modal-firma/modal-firma.component';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { AuthService } from 'src/app/services/auth.service';

interface CalificacionesEstado {
  value: number;
  viewValue: string;
}

interface Combustible {
  value: number;
  viewValue: string;
}
interface RadioOptionForm{
  name: string,
  label: string;
  option1: number;
  optionTitle1: string;
  option2: number;
  optionTitle2: string;
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
  public optionsRadios: RadioOptionForm[];
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
    public dialog: MatDialog,
    private _storaged: SessionStorageService,
    private authService: AuthService,
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
      {value: 0, viewValue: 'Gasolina'},
      {value: 1, viewValue: 'Diesel'},
      {value: 2, viewValue: 'Gas'},
      {value: 3, viewValue: 'Hibrido'},
      {value: 4, viewValue: 'Eléctrico'}
    ];
    this.optionsRadios = [
      {name: 'cojineria', label: 'Cojineria', option1: this.tela, optionTitle1: 'Tela', option2: this.cuero, optionTitle2: 'Cuero'},
      {name: 'caja', label: 'Caja', option1: this.mecanica, optionTitle1: 'Mecánica', option2: this.automatica, optionTitle2: 'Automática'},
      {name: 'traccion', label: 'Tracción', option1: this.t4x2, optionTitle1: '4X2', option2: this.t4x4, optionTitle2: '4X4'},
      {name: 'rin', label: 'Rin de Lujo', option1: 1, optionTitle1: 'Si', option2: 0, optionTitle2: 'No'},
      {name: 'vidrios', label: 'Vidrio Eléctrico', option1: 1, optionTitle1: 'Si', option2: 0, optionTitle2: 'No'},
      {name: 'techo_vidrio', label: 'Techo Vidrio', option1: 1, optionTitle1: 'Si', option2: 0, optionTitle2: 'No'},
      {name: 'retrovisores_electricos', label: 'Retrovisores Eléctricos', option1: 1, optionTitle1: 'Si', option2: 0, optionTitle2: 'No'},
      {name: 'barra_techo', label: 'Barras De Techo', option1: 1, optionTitle1: 'Si', option2: 0, optionTitle2: 'No'},
      {name: 'exploradora', label: 'Exploradoras', option1: 1, optionTitle1: 'Si', option2: 0, optionTitle2: 'No'},
      {name: 'llave', label: 'Repuesto Llaves', option1: 1, optionTitle1: 'Si', option2: 0, optionTitle2: 'No'},
      {name: 'herramienta', label: 'Herramienta Completa', option1: 1, optionTitle1: 'Si', option2: 0, optionTitle2: 'No'},
      {name: 'manual', label: 'Manuales', option1: 1, optionTitle1: 'Si', option2: 0, optionTitle2: 'No'},
      {name: 'reclamo_aseg', label: 'Reclamos Aseguradora', option1: 1, optionTitle1: 'Si', option2: 0, optionTitle2: 'No'},
      {name: 'cambio_correa', label: 'Cambio Correa', option1: 1, optionTitle1: 'Si', option2: 0, optionTitle2: 'No'},
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

  public cambioCorrea(): void {
    if (this.shared.encabezados.cambio_correa == 0) {
      this.shared.encabezados.lugar_cambio_correa = ''
    }
  }




  private validarCampos(): boolean {
    let valid = true;
    //Campos vacios del formulario
    let items_formulario = document.getElementsByClassName('formulario-required');
    for (let i = 0; i < items_formulario.length; i++) {
      const itemValue = this.shared.formulario[items_formulario[i].getAttribute('name')!];
      if (itemValue === '' || itemValue === null) {
        let element = document.getElementsByName(items_formulario[i].getAttribute('name')!)[0];

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
    if (valid) { //Porcentaje LLantas
      let items_encabezados = document.getElementsByClassName('encabezado-llantas');
      for (let i = 0; i < items_encabezados.length; i++) {
        const itemValue = this.shared.encabezados[items_encabezados[i].getAttribute('name')!];
      if (itemValue > 100) {
        let element = document.getElementsByName(items_encabezados[i].getAttribute('name')!)[0];
          if (element.tagName !== 'INPUT') {
            this.focusInputChild(element)!;
          } else {
            element.focus();
          }
        this.messageService.warning('Oops...', 'El porcentaje del campo "' + items_encabezados[i].getAttribute('placeholder') + '" no puede ser mayor a 100%');
        valid = false;
        break;
      }
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
    if (valid) { // fecha proximo mantenimiento
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
}
