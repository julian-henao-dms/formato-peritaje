import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../services/api.service';
import { MessagesService } from '../../services/messages.service';
import { SharedService } from '../../services/shared.service';
import { AuthService } from 'src/app/services/auth.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

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
  public headlightSpecString: string | null = '';

  constructor(
    private readonly router: Router,
    private readonly apiService: ApiService,
    private readonly sharedService: SharedService,
    private readonly messageService: MessagesService,
    private readonly route: ActivatedRoute,
    private authService: AuthService,
    private _storaged: SessionStorageService,
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
    this.route.queryParamMap.subscribe(queryParams => {
        this.headlightSpecString = queryParams.get('headlightSpecString');

        if (this.headlightSpecString) {
            this.authService.authenticate(this.headlightSpecString).subscribe({
                next: data => {
                    this.authService.setToken(data.token);
                },
                error: error => {
                    console.error('Error:', error);
                    this.router.navigate(['/home-peritaje']);
                }
            });
        }
    });
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
