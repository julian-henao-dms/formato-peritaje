import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../services/api.service';
import { MessagesService } from '../../services/messages.service';
import { SharedService } from '../../services/shared.service';
import { EstadoPintura } from '../formato-peritaje/interfaces/estadoPintura.interface';

@Component({
  selector: 'app-partes-form-peritaje',
  templateUrl: './partes-form-peritaje.component.html',
  styleUrls: ['./partes-form-peritaje.component.scss']
})
export class PartesFormPeritajeComponent implements OnInit {
  private readonly title: string = 'FormatoPeritaje';
  private readonly subtitle: string = 'listaPartes';
  public estados: { id: number, descripcion: string }[] = [];
  public listaPartes: EstadoPintura[] = [];
  private idChk: number;

  public repiTipoA = 0;
  public repiTipoB = 1;
  public reparTipoA = 0;
  public reparTipoB = 1;
  public cambiado = 0;
  public removido = 1;

  public assets: string;
  private sesion: any;
  public shared: any;

  constructor(
    private readonly router: Router,
    private readonly apiService: ApiService,
    private readonly sharedService: SharedService,
    private readonly messageService: MessagesService
  ) {
    this.idChk = 0;
    this.assets = environment.assets;
  }

  async ngOnInit(): Promise<void> {
    this.sesion = await this.sharedService.getSesion();
    this.shared = await this.sharedService.getValues();
    this.idChk = this.shared.formulario.id;
    console.log(this.shared);

    const servicio = '/vehiculosusados/estadospintura';
    (await this.apiService.getInformacion(servicio, '')).subscribe(async (response: any) => {
      this.estados = response;
      this.cargarlistaPartes();
    }, error => {
      this.messageService.error("Oops...", "Error interno en el servidor");
    });
  }

  private procesarInformacion(next: boolean): void {
    if (next) {
      this.listaPartes.forEach(function (parte) {
        parte.repi_tipo_a = (parte.repi_tipo == 0 ? 1 : 0);
        parte.repi_tipo_b = (parte.repi_tipo == 1 ? 1 : 0);
        parte.repar_tipo_a = (parte.repar_tipo == 0 ? 1 : 0);
        parte.repar_tipo_b = (parte.repar_tipo == 1 ? 1 : 0);
        parte.cambiada = (parte.estadoParte == 0 ? 1 : 0);
        parte.removida = (parte.estadoParte == 1 ? 1 : 0);
      });
      this.shared.listaPartes = this.listaPartes;
    } else {
      this.listaPartes.forEach(function (parte) {
        parte.repi_tipo = (parte.repi_tipo_a == 1 ? 0 : (parte.repi_tipo_b == 1 ? 1 : -1));
        parte.repar_tipo = (parte.repar_tipo_a == 1 ? 0 : (parte.repar_tipo_b == 1 ? 1 : -1));
        parte.estadoParte = (parte.cambiada == 1 ? 0 : (parte.removida == 1 ? 1 : - 1));
      })
    }
  }

  private async cargarlistaPartes(): Promise<void> {
    const servicio = '/VehiculosUsados/PartesPintura';
    const idEmp = this.sesion.empresa;
    const params = '/'+ idEmp + '/' + this.idChk.toString();
    (await this.apiService.getInformacion(servicio, params)).subscribe((response: any) => {
      this.listaPartes = response;
      if (this.idChk !== 0) {
        this.procesarInformacion(false);
      }
      console.log(this.listaPartes);
    }, error => {
      this.messageService.error("Oops...", "Error interno en el servidor");
    });
  }

  public siguiente(): void {
    this.procesarInformacion(true);
    this.router.navigate(['formato-peritaje/listaElementos']);
  }

  public atras(): void {
    this.router.navigate(['formato-peritaje/encabezados']);
  }

  async ngOnDestroy(): Promise<void> {
    this.sharedService.setValues(this.shared);
  }
}
