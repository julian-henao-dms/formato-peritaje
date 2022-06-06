import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../services/api.service';
import { MessagesService } from '../../services/messages.service';
import { SharedService } from '../../services/shared.service';
import { ElementosAz } from '../formato-peritaje/interfaces/elementos-az';
import { EstadoPintura } from '../formato-peritaje/interfaces/estado-pintura';

@Component({
  selector: 'app-parametrizacion-form-peritaje',
  templateUrl: './parametrizacion-form-peritaje.component.html',
  styleUrls: ['./parametrizacion-form-peritaje.component.scss']
})
export class ParametrizacionFormPeritrajeComponent implements OnInit {
  public listaPartes: EstadoPintura[] = [];
  public listaElementos: ElementosAz[] = [];
  public estados: {id: number, descripcion: string}[] = [];
  private readonly title: string = 'FormatoPeritaje';
  private readonly subtitle: string = 'parametrizacion';
  public shared: any;
  private sesion: any;
  public assets: string;

  public repiTipoA = 0;
  public repiTipoB = 1;
  public reparTipoA = 0;
  public reparTipoB = 1;
  public cambiado = 0;
  public removido = 1;

  public showPartes: boolean = false;
  public showElementos: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly apiService: ApiService,
    private readonly sharedService: SharedService,
    private readonly messageService: MessagesService
  ) {
    this.assets = environment.assets;
  }

  async ngOnInit(): Promise<void> {
    this.sesion = await this.sharedService.getSesion();
    this.shared = await this.sharedService.getValues();
  }

  public toogleTagPartes(parametro:any){
    if(parametro == 1){
      this.showPartes = !this.showPartes;
      this.showElementos = false;
    }else if(parametro == 2){
      this.showElementos = !this.showElementos;
      this.showPartes = false;
    
    }

  }

}
