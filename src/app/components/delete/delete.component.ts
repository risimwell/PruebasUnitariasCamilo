import { Component } from '@angular/core';
import { DeleteService } from 'src/app/services/deleteservice.service';
import { ListserviceService } from 'src/app/services/listservice.service';

interface User {
  id: number;
  username: string;

}
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {
  items: any[] = []; // Aquí almacenaremos la lista de elementos disponibles
  selectedUsername: any; // Aquí almacenaremos el nombre de usuario seleccionado para eliminar

  constructor(private deleteService: DeleteService, private listService: ListserviceService) {}

  ngOnInit(): void {
    // Cargamos la lista de elementos disponibles al iniciar el componente
    this.loadItems();
  }

  loadItems(): void {
    // Obtener la lista de elementos disponibles del servicio DeleteService
    this.deleteService.getItems().then(items => {
      this.items = items;
    });
  }

  getUserIdByUsername(username: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.listService.getRecords().subscribe((users: User[]) => {
        const user = users.find((u: User) => u.username === username);
        if (user) {
          resolve(user.id);
        } else {
          reject('No se encontró el usuario con el nombre de usuario proporcionado');
        }
      });
    });
  }



// Devolver null si no se encuentra el usuario


deleteItem(): Promise<void> {
  // Creamos una nueva promesa
  return new Promise<void>((resolve, reject) => {
  if (this.selectedUsername) {
  this.getUserIdByUsername(this.selectedUsername).then(userId => {
  this.deleteService.deleteItem(userId).then(() => {
  this.selectedUsername = null;
  console.log('Elemento borrado con éxito');
  // Resolvemos la promesa
  resolve();
  }).catch(error => {
  console.error('Error al borrar el elemento:', error);
  // Rechazamos la promesa
  reject(error);
  });
  }).catch(error => {
  console.error('Error al obtener el ID del usuario:', error);
  // Rechazamos la promesa
  reject(error);
  });
  }
  });
  }
}
