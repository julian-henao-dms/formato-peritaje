import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../services/api.service';
import { MessagesService } from '../../services/messages.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-parametrizacion-form-peritaje',
  templateUrl: './parametrizacion-form-peritaje.component.html',
  styleUrls: ['./parametrizacion-form-peritaje.component.scss']
})
export class ParametrizacionFormPeritrajeComponent implements OnInit {
  private readonly title: string = 'FormatoPeritaje';
  private readonly subtitle: string = 'parametrizacion';
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
