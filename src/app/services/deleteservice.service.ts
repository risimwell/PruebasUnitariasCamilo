import { Injectable } from '@angular/core';
import { ListserviceService } from './listservice.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {
  private items: any[] = []; // Aquí almacenaremos la lista de elementos disponibles

  constructor(private listService: ListserviceService, private http: HttpClient) {
    // Código adicional del constructor...
  }

  getItems(): Promise<any[]> {
    return this.listService.getRecords().toPromise()
      .then(response => {
        this.items = response; // Asignamos la lista de elementos del servicio BuscarService
        return this.items;
      })
      .catch(error => {
        console.error('Error al obtener los elementos:', error);
        return [];
      });
  }

  deleteItem(itemId: number): Promise<void> {
    const url = `http://localhost:8080/users/${itemId}/delete`; // Reemplaza "http://localhost:8080/users" con la ruta correcta de tu API
    console.log('Enviando solicitud de eliminación para el elemento con ID:', itemId);



    return this.http.delete(url).toPromise()
      .then(() => {
        console.log('Elemento borrado con éxito');
      })
      .catch(error => {
        console.error('Error al borrar el elemento:', error);
      });
  }

}
