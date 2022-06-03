import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../services/api.service';
import { MessagesService } from '../../services/messages.service';
import { SharedService } from '../../services/shared.service';
import { formulario } from './interfaces/formulario.interface';

@Component({
  selector: 'app-busqueda-form-peritaje',
  templateUrl: './busqueda-form-peritaje.component.html',
  styleUrls: ['./busqueda-form-peritaje.component.scss']
})
export class BusquedaFormPeritajeComponent implements OnInit, OnDestroy {
  private readonly title: string = 'FormatoPeritaje';
  private readonly subtitle: string = 'busqueda';
  public disabledBtnCrear: boolean;
  public disabledBtnEditar: boolean;
  public formularios: formulario[] = [];
  public placa: string = '';
  public vin: string = '';
  public shared: any;
  private sesion: any;
  public assets: string;

  constructor(
    private readonly router: Router,
    private readonly apiService: ApiService,
    private readonly sharedService: SharedService,
    private readonly messageService: MessagesService
  ) {
    this.disabledBtnCrear = true;
    this.disabledBtnEditar = true;
    this.assets = environment.assets;
  }

  async ngOnInit(): Promise<void> {
    this.sesion = await this.sharedService.getSesion();
  }

  public async onEnter(): Promise<void> {
    await this.sharedService.deleteValues();
    await this.resetinitData();
    if (this.placa !== '' || this.vin !== '') {
      this.messageService.info("Atencion", "Estamos cargando los formatos asociados");
      const idEmp = this.sesion.empresa;
      const servicio = '/vehiculosusados/formularios';
      const params = '/' + idEmp + '/' + (this.placa === '' ? '%20' : this.placa) + '/' + (this.vin === '' ? '%20' : this.vin) + '';
      (await this.apiService.getInformacion(servicio, params)).subscribe((response: any) => {
        this.disabledBtnCrear = false;
        this.formularios = response;
        if (response.length == 0) {
          setTimeout(
            () => {
              this.messageService.info("Atención...", "La placa o vin ingresados no corresponden a un vehículo en el sistema");
            }, 1000);
        } else {
          this.disabledBtnEditar = false;
        }
      }, error => {
        this.messageService.error("Oops...", "Error interno en el servidor, no se pudieron consultar los formatos de peritaje");
      });
    } else {
      this.messageService.info("Atencion...", "Debe ingresar una placa o vin para continuar");
    }
  }

  private resetinitData(): void {
    this.disabledBtnCrear = true;
    this.disabledBtnEditar = true;
  }

  async ngOnDestroy(): Promise<void> {
    await this.sharedService.setValues(this.shared);
  }
}
