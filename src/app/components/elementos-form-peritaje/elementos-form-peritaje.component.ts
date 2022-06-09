import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../services/api.service';
import { MessagesService } from '../../services/messages.service';
import { SharedService } from '../../services/shared.service';
import { ElementosAz } from './interfaces/elementosAZ.interface';
import { EstadoPintura } from './interfaces/estadoPintura.interface';

@Component({
  selector: 'app-elementos-form-peritaje',
  templateUrl: './elementos-form-peritaje.component.html',
  styleUrls: ['./elementos-form-peritaje.component.scss']
})
export class ElementosFormPeritajeComponent implements OnInit {
  private readonly title: string = 'FormatoPeritaje';
  private readonly subtitle: string = 'listaElementos';
  public listaElementos: ElementosAz[] = [];
  public idElementoIntervencion: number;
  public idChk: number;
  private sesion: any;
  public shared: any;
  public assets: string;

  constructor(
    private readonly router: Router,
    private readonly apiService: ApiService,
    private readonly sharedService: SharedService,
    private readonly messageService: MessagesService
  ) {
    this.assets = environment.assets;
    this.idElementoIntervencion = 0;
    this.idChk = 0;
  }

  async ngOnInit(): Promise<void> {
    this.sesion = await this.sharedService.getSesion();
    this.shared = await this.sharedService.getValues();
    this.idChk = this.shared.formulario.id;
    this.cargarlistaElementos();
  }

  private async cargarlistaElementos(): Promise<void> {
    const servicio = '/VehiculosUsados/Elementos';
    const idEmp = this.sesion.empresa;
    const params = '/' + idEmp + '/' + this.idChk.toString();
    (await this.apiService.getInformacion(servicio, params)).subscribe((response: any) => {
      this.listaElementos = response;
    }, error => {
      this.messageService.error("Oops...", "Error interno en el servidor");
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

  public borrarIntervencion(elementoAZ: ElementosAz) {
    elementoAZ.intervencion = 0
    elementoAZ.valor = 0;
  }

  public async guardarFormulario(): Promise<void> {
    this.shared.listaElementos = this.listaElementos;
    console.log(this.shared);
    let servicio = '/vehiculosusados/guardarformulario';
    (await this.apiService.saveInformacion(servicio, this.shared.formulario)).subscribe(async (response: any) => {
      if (response > 0) {
        this.idChk = response;
        this.shared.encabezados.id_veh_chk_usados = this.idChk;
        servicio = '/vehiculosusados/guardarencabezados';
        (await this.apiService.saveInformacion(servicio, this.shared.encabezados)).subscribe(async (response: any) => {
          if (response) {
            servicio = '/vehiculosusados/guardarpartes';
            this.shared.listaPartes.forEach((parte: EstadoPintura) => {
              parte.id_veh_chk_usados = this.idChk;
            });
            (await this.apiService.saveInformacion(servicio, this.shared.listaPartes)).subscribe(async (response: any) => {
              if (response) {
                servicio = '/vehiculosusados/guardarelementos';
                this.shared.listaElementos.forEach((elemento: ElementosAz) => {
                  elemento.id_veh_chk_usados = this.idChk;
                });
                (await this.apiService.saveInformacion(servicio, this.shared.listaElementos)).subscribe(async (response: any) => {
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
    setTimeout(() => {
      this.router.navigate(['formato-peritaje']);
    }, 2000);
  }

  public atras(): void {
    this.router.navigate(['formato-peritaje/listaPartes']);
  }

  async ngOnDestroy(): Promise<void> {
    this.sharedService.setValues(this.shared);
  }
}
