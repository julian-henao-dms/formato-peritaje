import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionStorageService } from './session-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private tokenUrl = environment.casaBritanicaApi + '/Token';
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private _storaged: SessionStorageService
    ) {
    this.apiUrl = environment.casaBritanicaApi;
  }

  public authenticate(encryptedCredentials: any): Observable<any> {
    const url = `${this.apiUrl}/token`;
    const body = {   encryptedCredentials: encryptedCredentials };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(url, body, { headers });
  }

  public setToken(token: string): void {
    this._storaged.set('headlightSpecString', token); // Utilizando SessionStorageService para setear el token
  }

  public getToken(): string | null {
    return this._storaged.get('headlightSpecString'); // Utilizando SessionStorageService para obtener el token
  }
}
