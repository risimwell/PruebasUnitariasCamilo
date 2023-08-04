import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tokenModel } from '../modelos/tokenModelo';


@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
  private apiUrl = 'http://localhost:8080'; // URL del backend para el inicio de sesión

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/users/login`;
    const data = { username, password }; // Crear un objeto con los datos

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.http.post<tokenModel>(url, JSON.stringify(data), { headers });
  }
}
