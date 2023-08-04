import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterserviceService {

  private apiUrl = 'http://localhost:8080'; // URL de tu backend

  constructor(private http: HttpClient) { }

  createPerson(personData: any): Observable<any> {
    const url = `${this.apiUrl}/users/save`; // Ruta de la petición de creación de persona
    return this.http.post(url, personData);

  }
}
