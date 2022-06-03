import { MessagesService } from 'src/app/services/messages.service';
import { Injectable } from '@angular/core';
import { Global } from './interfaces/global.interface';
import { Subject } from 'rxjs';
import { Sesion } from './interfaces/sesion.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public global: Global;
  public sesion: Sesion;
  private execute: boolean;
  private sendInstructionSubject = new Subject<boolean>();
  public sendInstructionObservable = this.sendInstructionSubject.asObservable();

  constructor(private readonly messageService: MessagesService) {
    this.global = {
      isEmpty: true
    };
    this.sesion = {
      empresa: '',
      isEmpty: true
    };
    this.execute = false;
  }

  sendInstruction(execute: boolean): void {
    this.execute = execute;
    this.sendInstructionSubject.next(execute);
  }

  public async setValues(value: Global): Promise<void> {
    this.global = value;
    this.global.isEmpty = false;
    sessionStorage.setItem('datos', JSON.stringify(value));
  }

  public async getValues(): Promise<Global> {
    if (this.global.isEmpty) {
      const guardado = sessionStorage.getItem('datos');
      if (guardado) this.global = JSON.parse(guardado);
    }
    return this.global;
  }

  public async deleteValues(): Promise<void> {
    sessionStorage.removeItem('datos');
    sessionStorage.removeItem('images');
    this.resetValues();
  }

  public async setSesion(value: Sesion): Promise<void> {
    this.sesion = value;
    this.sesion.isEmpty = false;
    sessionStorage.setItem('sesion', JSON.stringify(value));
  }

  public async getSesion(): Promise<Sesion> {
    if (this.sesion.isEmpty) {
      const guardado = sessionStorage.getItem('sesion');
      if (guardado) this.sesion = JSON.parse(guardado);
    }
    return this.sesion;
  }

  public async deleteSesion(): Promise<void> {
    sessionStorage.removeItem('sesion');
  }

  private resetValues(): void {
    this.global = {
      isEmpty: true
    };
  }
}
