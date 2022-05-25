import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private casaBritanicaApi: string;
  private readonly token = '';

  constructor(
    private http: HttpClient
  ) {
    this.casaBritanicaApi = environment.casaBritanicaApi;
  }

  public async getInformacion(servicio: string, param: string): Promise<Observable<any>> {
    const url = this.casaBritanicaApi + servicio + param;
    const Headers = new HttpHeaders().set('Authorization', this.token);
    return this.http.get(url, { headers: Headers });
  }

  public async updateInformacion(servicio: string, document: any): Promise<Observable<any>> {
    const url = this.casaBritanicaApi + servicio;
    const params = JSON.stringify(document);
    const Headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(url, params, { headers: Headers });
  }

  public async saveInformacion(servicio: string, document: any): Promise<Observable<any>> {
    const url = this.casaBritanicaApi + servicio;
    const params = JSON.stringify(document);
    const Headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);
    return this.http.post(url, params, { headers: Headers });
  }
}
