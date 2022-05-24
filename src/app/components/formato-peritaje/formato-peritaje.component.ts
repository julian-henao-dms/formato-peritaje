import { Component, OnInit } from '@angular/core';
import { ItemsVehiculosUsados } from './interfaces/items-vehiculo';
import { Vehiculo } from './interfaces/vehiculo';

interface CalificacionesEstado {
  value: string;
  viewValue: string;
}

interface Combustible {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-formato-peritaje',
  templateUrl: './formato-peritaje.component.html',
  styleUrls: ['./formato-peritaje.component.scss']
})
export class FormatoPeritajeComponent implements OnInit {
  public A = 0;
  public B = 1;
  public  si = 1;
  public no = 0;
 
  public automatica = 1;
  public mecanica = 0;
  public t4x2 = 0;
  public t4x4 = 1;
  public tela = 0;
  public cuero = 1;
 
  // public selectedValue: string | undefined;
  public selectedCombustible: string | undefined;
 
  calificaciones: CalificacionesEstado[] = [
   {value: '5', viewValue: 'Nuevo'}, //verificar si es string o number y cambiar en la interface según
   {value: '4', viewValue: 'Muy Bueno'},
   {value: '3', viewValue: 'Defectos'},
   {value: '2', viewValue: 'Problemas'},
   {value: '1', viewValue: 'Malo'},
 ];
 
 combustibles: Combustible[] = [
   {value: '0', viewValue: 'Gasolina'},
   {value: '1', viewValue: 'Diesel'},
   {value: '2', viewValue: 'Gas'},
   {value: '3', viewValue: 'Hibrido'},
   {value: '4', viewValue: 'Eléctrico'},
  
 ];
 public formularioVehiculos : ItemsVehiculosUsados;
 public infoVehiculo : Vehiculo;
   constructor() { 
     this.infoVehiculo = {
       Id : 0,
       Califica : '',
       Fecini : new Date,
       Id_usuario : 0,
       Id_usu_inspector : 0,
       Id_cot_item_lote : 0,
       Prueba_ruta : 0,
       Fecfin : new Date,
       Califica2 : 0,
     }
     this.formularioVehiculos = {
      id_veh_chk_usados: 0,
      califica: '',
      fecini: new Date,
      id_usuario: 0,
      id_usu_inspector: 0,
      id_cot_item_lote: 0,
      prueba_ruta: 0,
      fecfin: new Date,
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
      cilindraje: '',
      color: '',
      referencia: '',
      clase: 0, // Que es Clase?
      combustible: 0,
      lugar_matricula: 0,
      capacidad_sillas: 0,
      km: 0,
      fec_prox_mantenimiento: new Date,
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
     }
   }
 
   ngOnInit(): void {
   }
 
 }
 