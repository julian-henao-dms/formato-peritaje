import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../services/api.service';
import { MessagesService } from '../../services/messages.service';
import { SharedService } from '../../services/shared.service';
import { formulario } from './interfaces/formulario.interface';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-busqueda-form-peritaje',
  templateUrl: './busqueda-form-peritaje.component.html',
  styleUrls: ['./busqueda-form-peritaje.component.scss']
})
export class BusquedaFormPeritajeComponent implements OnInit, OnDestroy {
  private readonly title: string = 'FormatoPeritaje';
  private readonly subtitle: string = 'busqueda';
  public displayedColumns: string[] = ['Id', 'Fecini', 'Fecfin', 'Califica', 'Editar'];
  public selectedRowIndex = -1;
  public disabledBtnCrear: boolean;
  public formularios: formulario[] = [];
  public placa: string = '';
  public vin: string | null = null;
  public shared: any;
  private sesion: any;
  public assets: string;


  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly apiService: ApiService,
    private readonly sharedService: SharedService,
    private readonly messageService: MessagesService,
    private _storaged: SessionStorageService,
    private authService: AuthService,

  ) {
    this.disabledBtnCrear = true;
    this.assets = environment.assets;
  }

  async ngOnInit(): Promise<void> {

    this.sesion = await this.sharedService.getSesion();

    this.route.queryParamMap.subscribe(params => {
        this.vin = params.get('vin');
        const headlightSpecString = params.get('headlightSpecString');

        if (headlightSpecString) {
            this.authService.authenticate(headlightSpecString).subscribe({
                next: data => {
                    this.authService.setToken(data.token);
                    if (this.vin) {
                        this.onEnter();
                    }
                },
                error: error => {
                    console.error('Error:', error);
                    this.router.navigate(['/home-peritaje']);
                }
            });
        } else {
            if (this.vin) {
                this.onEnter();
            }
        }
    });
  }

  public async onEnter(): Promise<void> {
    await this.sharedService.deleteValues();
    await this.resetinitData();
    this.shared = await this.sharedService.getValues();
    if (this.placa !== '' || this.vin !== '') {
      this.messageService.info("Atencion", "Estamos cargando los formatos asociados");
      const idEmp = this.sesion.empresa;
      const servicio = '/vehiculosusados/formularios';
      const params = '/' + idEmp + '/' + (this.placa === '' ? '%20' : this.placa) + '/' + (this.vin === '' ? '%20' : this.vin) + '';
      (await this.apiService.getInformacion(servicio, params)).subscribe((response: any) => {
        this.formularios = response.data;

        if (response.message == 'FVH' ) {
          setTimeout(
            () => {
              this.messageService.info("Atención...", "La Placa o VIN ingresados no corresponden a ningún vehículo asociado");
            }, 1000);
            // this.disabledBtnCrear = false;
        } else{
          this.disabledBtnCrear = false;
          if (response.data.length === 0 ) {
            setTimeout(
              () => {
                this.messageService.info("Atención...", "La Placa o VIN ingresado no tiene ningún formulario previamente diligenciado");
              }, 1000);
          }
        }

      }, error => {
        this.messageService.error("Oops...", "Error interno en el servidor, no se pudieron consultar los formularios de peritaje");
      });
    } else {
      this.messageService.info("Atencion...", "Debe ingresar una Placa o VIN para continuar");
    }
  }

  public async nuevoFormulario(): Promise<void> {
    const servicio = '/vehiculosusados/encabezados';
    const idEmp = this.sesion.empresa;
    const params = '/'+ idEmp +'/' + (this.placa !== '' ? this.placa : ' ') + '/' + (this.vin !== '' ? this.vin : ' ');
    (await this.apiService.getInformacion(servicio, params)).subscribe(async (response: any) => {
      this.shared.encabezados = response;
      this.shared.formulario = this.estructuraFormulario(response.id_cot_item_lote);
      this.shared.encabezados.id_usuario = 1; // usuario quemado
      this.shared.encabezados.id_usu_inspector = 1; // usuario inspector quemado
      this.shared.encabezados.fec_prox_mantenimiento = (this.shared.encabezados.fec_prox_mantenimiento == '0001-01-01T00:00:00' ? new Date() : this.shared.encabezados.fec_prox_mantenimiento);

      this.router.navigate(['formato-peritaje/encabezados']);
    }, error => {
      this.messageService.error("Oops...", "Error interno en el servidor");
    });
  }

  public async editarFormulario(element: any): Promise<void> {
    const servicio = '/vehiculosusados/formulariocompleto';
    const idEmp = this.sesion.empresa;
    const params = '/' + idEmp + '/' + element.id;
    (await this.apiService.getInformacion(servicio, params)).subscribe(async (response: any) => {
      if (response.length > 0) {
        this.shared.encabezados = response[0];
        this.shared.formulario.id = this.shared.encabezados.id_veh_chk_usados;
        this.shared.formulario.califica = this.shared.encabezados.califica;
        this.shared.formulario.fecini = this.shared.encabezados.fecini;
        this.shared.formulario.id_usuario = this.shared.encabezados.id_usuario;
        this.shared.formulario.id_usu_inspector = this.shared.encabezados.id_usu_inspector;
        this.shared.formulario.id_cot_item_lote = this.shared.encabezados.id_cot_item_lote;
        this.shared.formulario.prueba_ruta = this.shared.encabezados.prueba_ruta;
        this.shared.formulario.fecfin = this.shared.encabezados.fecfin;
        this.shared.formulario.califica2 = this.shared.encabezados.califica2;

        this.router.navigate(['formato-peritaje/encabezados']);
      } else {
        this.messageService.error("Oops...", "No se encontraron registros guardados en el servidor");
      }
    }, error => {
      this.messageService.error("Oops...", "Error interno en el servidor");
    });
  }

  public abrirParametrizacion() {
    this.router.navigate(['/formato-peritaje/parametrizacion']);
  }



  private estructuraFormulario(id_cot_item_lote: number): formulario {
    return {
      id: 0,
      califica: '',
      fecini: new Date(),
      id_usuario: 1,
      id_usu_inspector: 1,
      id_cot_item_lote: id_cot_item_lote,
      prueba_ruta: 0,
      fecfin: new Date(),
      califica2: 0
    }
  }


  private resetinitData(): void {
    this.disabledBtnCrear = true;
    this.formularios = []
  }

  async ngOnDestroy(): Promise<void> {
    await this.sharedService.setValues(this.shared);
  }
}
