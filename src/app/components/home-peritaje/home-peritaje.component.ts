import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-home-peritaje',
  templateUrl: './home-peritaje.component.html',
  styleUrls: ['./home-peritaje.component.scss']
})
export class HomePeritajeComponent implements OnInit {

  constructor(private readonly messageService: MessagesService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.messageService.info('Atención...', 'Se debe iniciar desde ADVANCE');
    }, 1000);
  }

}
