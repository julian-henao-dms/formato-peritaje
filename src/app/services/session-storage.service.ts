import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() {}

  public set(key: string, data: any){
    try {
      sessionStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error al guardar los datos', e);
    }
  }

  public get(key: string){
    try {
      return JSON.parse(sessionStorage.getItem(key)!);
    } catch (e) {
      console.error('Error al cargar los datos', e);
      return null;
    }
  }

  public remove(key: string){
    try {
      sessionStorage.removeItem(key);
    } catch (e) {
      console.error('Error al eliminar datos', e);
    }
  }

  public clear(): void{
    try {
      sessionStorage.clear();
    } catch (e) {
      console.error('Error al limpiar el LocalStorage', e);
    }
  }



}
