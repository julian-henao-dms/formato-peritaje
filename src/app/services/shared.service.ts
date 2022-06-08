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
      isEmpty: true,
      formulario: {
        id: 0,
        califica: '',
        fecini: new Date(),
        id_usuario: 0,
        id_usu_inspector: 0,
        id_cot_item_lote: 0,
        prueba_ruta: 0,
        fecfin: new Date(),
        califica2: 0
      },
      encabezados: {
        id_veh_chk_usados: 0,
        califica: '',
        fecini: new Date(),
        id_usuario: 0,
        id_usu_inspector: 0,
        id_cot_item_lote: 0,
        prueba_ruta: 0,
        fecfin: new Date(),
        califica2: 0,
        id_veh_chk_usados_mas: 0,
        llave: 0,
        libro: 0,
        cambio_correa: 0,
        lugar_cambio_correa: '',
        herramienta: 0,
        manual: 0,
        reclamo_aseg: 0,
        valor_reclamo_aseg: 0,
        marca_radio: '',
        marca_llantas: '',
        marca_bateria: '',
        lugar_mante: '',
        cilindraje: 0,
        color: '',
        referencia: '',
        clase: 0, // Que es Clase?
        combustible: 0,
        lugar_matricula: '',
        capacidad_sillas: 0,
        km: 0,
        fec_prox_mantenimiento: new Date(),
        cojineria: 0,
        caja: 0,
        traccion: 0,
        rin: 0,
        estribo: 0,
        vidrios: 0,
        techo_vidrio: 0,
        retrovisores_electricos: 0,
        no_airbags: 0,
        no_rin: 0,
        barra_techo: 0,
        exploradora: 0,
        placa: '',
        linea: '',
        marca: '',
        modelo: '',
        
      },
      listaPartes: [],
      listaElementos: []
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
      isEmpty: true,
      formulario: {
        id: 0,
        califica: '',
        fecini: new Date(),
        id_usuario: 0,
        id_usu_inspector: 0,
        id_cot_item_lote: 0,
        prueba_ruta: 0,
        fecfin: new Date(),
        califica2: 0
      },
      encabezados: {
        id_veh_chk_usados: 0,
        califica: '',
        fecini: new Date(),
        id_usuario: 0,
        id_usu_inspector: 0,
        id_cot_item_lote: 0,
        prueba_ruta: 0,
        fecfin: new Date(),
        califica2: 0,
        id_veh_chk_usados_mas: 0,
        llave: 0,
        libro: 0,
        cambio_correa: 0,
        lugar_cambio_correa: '',
        herramienta: 0,
        manual: 0,
        reclamo_aseg: 0,
        valor_reclamo_aseg: 0,
        marca_radio: '',
        marca_llantas: '',
        marca_bateria: '',
        lugar_mante: '',
        cilindraje: 0,
        color: '',
        referencia: '',
        clase: 0, // Que es Clase?
        combustible: 0,
        lugar_matricula: '',
        capacidad_sillas: 0,
        km: 0,
        fec_prox_mantenimiento: new Date(),
        cojineria: 0,
        caja: 0,
        traccion: 0,
        rin: 0,
        estribo: 0,
        vidrios: 0,
        techo_vidrio: 0,
        retrovisores_electricos: 0,
        no_airbags: 0,
        no_rin: 0,
        barra_techo: 0,
        exploradora: 0,
        placa: '',
        linea: '',
        marca: '',
        modelo: ''
      },
      listaPartes: [],
      listaElementos: []
    };
  }
}
