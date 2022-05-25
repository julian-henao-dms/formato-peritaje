import { Component, OnInit } from '@angular/core';
import { ElementosAz } from './interfaces/elementos-az';
import { EstadoPintura } from './interfaces/estado-pintura';
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

  public repiTipoA = 0;
  public repiTipoB = 1;
  public reparTipoA = 0;
  public reparTipoB = 1;
  public cambiado = 0;
  public removido = 1;

  public malo = 0;
  public noTiene = 1
 
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

 public elementosAz: ElementosAz[] = [
  { id: 0, id_veh_chk_usados: 0, id_chk_maestro_elementos: 0, elemento: 'Air Bag', est: 0, intervencion: 0,   valor: 0},
  { id: 0, id_veh_chk_usados: 0, id_chk_maestro_elementos: 0, elemento: 'Adhesivos Instalados', est: 0, intervencion: 0 , valor: 0},
  { id: 0, id_veh_chk_usados: 0, id_chk_maestro_elementos: 0, elemento: 'Aire Acondicionado', est: 0, intervencion: 0 , valor: 0}
]
public estadosPintura: EstadoPintura[] = [
  { id: 0, id_veh_chk_usados: 0, id_chk_maestro_partes: 0, parte: 'Puerta Derecha', id_chk_estado: 0, estado: '', repi_tipo_a: 0, repi_tipo_b: 0, repar_tipo_a: 0, repar_tipo_b: 0, cambiada: 0, removida: 0},
  { id: 0, id_veh_chk_usados: 0, id_chk_maestro_partes: 0, parte: 'Puerta Izquierda', id_chk_estado: 0, estado: '', repi_tipo_a: 0, repi_tipo_b: 0, repar_tipo_a: 0, repar_tipo_b: 0, cambiada: 0, removida: 0},
  { id: 0, id_veh_chk_usados: 0, id_chk_maestro_partes: 0, parte: 'Capo', id_chk_estado: 0, estado: '', repi_tipo_a: 0, repi_tipo_b: 0, repar_tipo_a: 0, repar_tipo_b: 0, cambiada: 0, removida: 0},
]

 public formularioVehiculos : ItemsVehiculosUsados;
 public infoVehiculo : Vehiculo;
//  public elementosAz: ElementosAz;
//  public estadosPintura: EstadoPintura;

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
    //  this.elementosAz = {
    //   id: 0,
    //   id_veh_chk_usados: 0,
    //   id_chk_maestro_elementos: 0,
    //   elemento: '',
    //   est: 0,
    //   intervencion: 0,
    //   valor: 0
    //  }
    //  this.estadosPintura = {
    //   id: 0,
    //   id_veh_chk_usados: 0,
    //   id_chk_maestro_partes: 0,
    //   parte: '',
    //   id_chk_estado: 0,
    //   estado: '',
    //   repi_tipo_a: 0,
    //   repi_tipo_b: 0,
    //   repar_tipo_a: 0,
    //   repar_tipo_b: 0,
    //   cambiada: 0,
    //   removida: 0
    //  }
   }
 
   ngOnInit(): void {
   }
 
 }
 