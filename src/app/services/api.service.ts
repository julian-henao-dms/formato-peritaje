import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { SessionStorageService } from './session-storage.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private casaBritanicaApi: string;
  private readonly token = '';

  constructor(
    private http: HttpClient,
    private _storaged: SessionStorageService,
    private authService: AuthService
  ) {
    this.casaBritanicaApi = environment.casaBritanicaApi;
  }



  public async getInformacion(servicio: string, param: string): Promise<Observable<any>> {
    const url = this.casaBritanicaApi + servicio + param;
   const token = this.authService.getToken();
    // const Headers = new HttpHeaders().set('Authorization', token);
    const Headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + token);
    return this.http.get(url, { headers: Headers });
  }

  public async updateInformacion(servicio: string, document: any): Promise<Observable<any>> {
    const url = this.casaBritanicaApi + servicio;
    const params = JSON.stringify(document);
    // const Headers = new HttpHeaders().set('Content-Type', 'application/json');
   const token = this.authService.getToken();
    const Headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token);
    return this.http.put(url, params, { headers: Headers });
  }

  public async saveInformacion(servicio: string, document: any): Promise<Observable<any>> {
    const url = this.casaBritanicaApi + servicio;
    const params = JSON.stringify(document);
    // const Headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);
   const token = this.authService.getToken();
    const Headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token);
    return this.http.post(url, params, { headers: Headers });
  }
}
