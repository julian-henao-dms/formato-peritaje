import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor() { }

  public success(titulo: string, mensaje: string): void {
    Swal.fire({
      icon: 'success',
      title: titulo,
      text: mensaje,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true
    });
  }

  public info(titulo: string, mensaje: string): void {
    Swal.fire({
      icon: 'info',
      title: titulo,
      text: mensaje,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
  }

  public async confirm(message: string): Promise<boolean> {
    return new Promise((resolve) => {
      Swal.fire({
        icon: 'warning',
        title: 'Atención',
        text: message,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          resolve(true);
        } else if (result.isDenied) {
          resolve(false);
        }
      });
    });
  }

  public warning(titulo: string, mensaje: string): void {
    Swal.fire({
      icon: 'warning',
      title: titulo,
      text: mensaje,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
  }

  public error(titulo: string, mensaje: string): void {
    Swal.fire({
      icon: 'error',
      title: titulo,
      text: mensaje,
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true
    });
  }

  public async waitInfo(message: string): Promise<typeof Swal> {
    Swal.fire({
      icon: 'info',
      title: 'Atención',
      text: message,
      showConfirmButton: false,
      allowOutsideClick: false,
      timerProgressBar: true
    });
    return Swal;
  }
}
