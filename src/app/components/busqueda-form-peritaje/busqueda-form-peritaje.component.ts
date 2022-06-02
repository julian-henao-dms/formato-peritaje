import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../services/api.service';
import { MessagesService } from '../../services/messages.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-busqueda-form-peritaje',
  templateUrl: './busqueda-form-peritaje.component.html',
  styleUrls: ['./busqueda-form-peritaje.component.scss']
})
export class BusquedaFormPeritajeComponent implements OnInit {
  private readonly title: string = 'FormatoPeritaje';
  private readonly subtitle: string = 'busqueda';

  public assets: string;

  constructor(
    private readonly router: Router,
    private readonly apiService: ApiService,
    private readonly sharedService: SharedService,
    private readonly messageService: MessagesService
  ) {
    this.assets = environment.assets;
  }

  ngOnInit(): void {
  }

}
