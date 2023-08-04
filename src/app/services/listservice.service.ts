import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListserviceService {
  private apiUrl = 'http://localhost:8080'; //  URL a la de tu backend

  constructor(private http: HttpClient) { }

  getRecords(): Observable<any> {
    const url = `${this.apiUrl}/users/all`; // ruta del la peticion a ejecutar
    return this.http.get(url);

  }

}

