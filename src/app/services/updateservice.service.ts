import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { datosUsuarios } from '../modelos/datosUsuario';


@Injectable({
  providedIn: 'root'
})
export class UpdateserviceService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080/users';

// obtener los datos personales de la base de datos
getDatosPersonales(userId: number): Observable<datosUsuarios> {
  return this.http.get<datosUsuarios>(`${this.baseUrl}/byId/${userId}`);
  }

 // actualizar los datos personales en la base de datos
updateDatosPersonales(userId: number, datos: datosUsuarios): Observable<any> {
return this.http.put(`${this.baseUrl}/${userId}/update`, datos);
}

}



