import { Component, OnInit } from '@angular/core';
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
 
  public selectedValue: string | undefined;
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
   }
 
   ngOnInit(): void {
   }
 
 }
 