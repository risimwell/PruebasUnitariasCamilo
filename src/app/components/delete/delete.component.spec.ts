import { TestBed } from '@angular/core/testing';
import { DeleteService } from 'src/app/services/deleteservice.service';
import { ListserviceService } from 'src/app/services/listservice.service';
import { DeleteComponent } from './delete.component';
import { Observable, of } from 'rxjs';
import { ComponentFixture } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';


describe('DeleteComponent', () => {

let component: DeleteComponent;
let deleteService: DeleteService;
let listService: ListserviceService;
let fixture: ComponentFixture<DeleteComponent>;

beforeEach(() => {
TestBed.configureTestingModule({
declarations: [ DeleteComponent ], // Declaramos el componente que vamos a probar
providers: [ DeleteService, ListserviceService ], // Proveemos los servicios que vamos a usar
imports:[HttpClientModule,]
});
// Obtenemos las instancias del componente y de los servicios
fixture = TestBed.createComponent(DeleteComponent);
component = fixture.componentInstance;
deleteService = TestBed.inject(DeleteService);
listService = TestBed.inject(ListserviceService);
});

it('should create', () => {
// Verificamos que el componente se crea correctamente
expect(component).toBeTruthy();
});

it('should load items on init', () => {
// Definimos un array falso con los elementos disponibles
const mockItems = ['Alice', 'Bob', 'Charlie'];

// Espiamos el método getItems del servicio deleteService y le decimos que devuelva una promesa con el array falso
spyOn(deleteService, 'getItems').and.returnValue(new Promise((resolve, reject) => resolve(mockItems)));

// Llamamos al método ngOnInit del componente
component.ngOnInit();

// Esperamos a que se resuelva la promesa
fixture.whenStable().then(() => {
// Verificamos que se llama al método getItems del servicio deleteService
expect(deleteService.getItems).toHaveBeenCalled();

// Verificamos que el atributo items del componente se asigna con el array falso
expect(component.items).toEqual(mockItems);
});
});

it('should get user id by username', () => {
// Definimos un objeto falso con los datos de un usuario
const mockUser = {
id: 1,
username: 'Alice'
};

// Definimos un array falso con los usuarios disponibles
const mockUsers = [mockUser, {id: 2, username: 'Bob'}, {id: 3, username: 'Charlie'}];

// Espiamos el método getRecords del servicio listService y le decimos que devuelva un observable con el array falso
spyOn(listService, 'getRecords').and.returnValue(of(mockUsers));

// Llamamos al método getUserIdByUsername del componente con el nombre de usuario del usuario falso
component.getUserIdByUsername(mockUser.username).then(userId => {
// Verificamos que se llama al método getRecords del servicio listService
expect(listService.getRecords).toHaveBeenCalled();

// Verificamos que se devuelve el id del usuario falso
expect(userId).toEqual(mockUser.id);
});
});

it('should delete item by user id', () => {
  // Definimos un id falso de un usuario
  const mockUserId = 1;

  // Espiamos el método deleteItem del servicio deleteService y le decimos que devuelva una promesa vacía
  spyOn(deleteService, 'deleteItem').and.returnValue(Promise.resolve());

  // Definimos un nombre de usuario falso
  const mockUsername = 'Alice';

  // Asignamos el nombre de usuario falso al atributo selectedUsername del componente
  component.selectedUsername = mockUsername;

  // Llamamos al método deleteItem del componente
  component.deleteItem().then(() => {
    expect(deleteService.deleteItem).toHaveBeenCalledWith(mockUserId);
    });
  });
});
