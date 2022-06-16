import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../services/api.service';
import { MessagesService } from '../../services/messages.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  private readonly title: string = 'main';
  private readonly subtitle: string = '';

  public opciones: Array<any>;
  public assets: string;

  constructor(
    private readonly router: Router,
    private readonly apiService: ApiService,
    private readonly sharedService: SharedService,
    private readonly messageService: MessagesService
  ) {
    this.assets = environment.assets;
    this.opciones = [
      {
        id: 1,
        titulo: 'Formatos',
        imagen: this.assets + '/images/ICONO-SERVICIO-ROJO.png',
        icono: 'arrow_drop_down',
        isOpen: false,
        items: [
          {
            titulo: 'Formato Peritaje',
            ruta: '/formato-peritaje',
            border: ''
          }
        ]
      }
    ]
  }

  async ngOnInit(): Promise<void> {
    const sesion = this.sharedService.sesion;
    sesion.empresa = '309';
    await this.sharedService.setSesion(sesion);
  }

  public mostrarMenu(id: number, value: boolean): void {
  
    this.opciones.forEach(e => {
      if (e.id === id && !value) {
        e.isOpen = true;
        e.icono = 'arrow_drop_up';
      } else {
        e.isOpen = false;
        e.icono = 'arrow_drop_down';
      }
    });
  }
}
