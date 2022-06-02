import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { MessagesService } from './services/messages.service';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = '';
  public subtitle: string = '';
  public showSubtitle: boolean = false;
  public navigateBack: string = '';
  public assets: string;

  constructor(
    private readonly messageService: MessagesService,
    private readonly sharedService: SharedService,
    private readonly router: Router
  ) {
    this.assets = environment.assets;
  }

  onActivate(event: any) {
    if (event.title === 'FormatoPeritaje') {
      this.title = 'Formato Peritaje';
      if (event.subtitle === 'main') {
        this.showSubtitle = false;
        this.subtitle = '';
        this.navigateBack = '';
      } else {
        this.showSubtitle = true;
        if (event.subtitle === 'busqueda') {
          this.subtitle = 'Buscar Vehiculo';
          this.navigateBack = '';
        }
        if (event.subtitle === 'formulario') {
          this.subtitle = 'Encabezados';
          this.navigateBack = '';
        }
        if (event.subtitle === 'listaPartes') {
          this.subtitle = 'Estados Partes-Pintura';
          this.navigateBack = '';
        }
        if (event.subtitle === 'listaElementos') {
          this.subtitle = 'Listado de Elementos A - Z';
          this.navigateBack = '';
        }
      }
    } else {
      this.title = 'Casa Britanica';
    }
  }
}
