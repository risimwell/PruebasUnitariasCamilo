// Importamos los módulos y servicios necesarios para las pruebas
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DeleteService } from './deleteservice.service';
import { ListserviceService } from './listservice.service';
import { from } from 'rxjs';

// Agrupamos las pruebas relacionadas con el servicio de borrar
describe('DeleteService', () => {

// Creamos las instancias del servicio, del servicio de listar y del controlador HTTP
let service: DeleteService;
let listService: ListserviceService;
let httpMock: HttpTestingController;
beforeEach(() => {
TestBed.configureTestingModule({
imports: [HttpClientTestingModule],
providers: [DeleteService, ListserviceService]
});
service = TestBed.inject(DeleteService);
listService = TestBed.inject(ListserviceService);
httpMock = TestBed.inject(HttpTestingController);
});

// Verificamos que no hay peticiones HTTP pendientes
afterEach(() => {
httpMock.verify();
});

// Probamos que el servicio se crea correctamente
it('should be created Delete ', () => {
expect(service).toBeTruthy();
});

// Probamos que el servicio obtiene los elementos desde el servicio de listar
it('should get items from list service', () => {
// Definimos un array de elementos de prueba y lo devolvemos desde el servicio de listar
const mockItems = [
{ nombre: 'Alice', apellido: 'Smith', username: 'alice@example.com', password: '123456789'},
{ nombre: 'Bob', apellido: 'Jones', username: 'bob@example.com', password: '987654321'}
];

const mockPromise = Promise.resolve(mockItems)
const mockObservable = from(mockPromise);

spyOn(listService, 'getRecords').and.returnValue(mockObservable);

// Llamamos al método getItems del servicio y guardamos el valor que devuelve
service.getItems().then(items => {
// Usamos la función expect para hacer una afirmación sobre el resultado esperado de la prueba. En este caso, esperamos que los elementos que devuelve el servicio sean iguales a los elementos que devolvimos desde el servicio de listar
expect(items).toEqual(mockItems);
});
});

// Probamos que el servicio borra un elemento por id y devuelve una promesa vacía
it('should delete item by id and return an empty promise', () => {
// Definimos un id de prueba y la url correspondiente al endpoint de borrar
const mockId = 1;
const url = `http://localhost:8080/users/${mockId}/delete`;

// Llamamos al método deleteItem del servicio y guardamos la promesa que devuelve
const promise = service.deleteItem(mockId);

// Usamos la función expect para hacer una afirmación sobre el resultado esperado de la prueba. En este caso, esperamos que la promesa sea una instancia de Promise
expect(promise).toBeInstanceOf(Promise);

// Esperamos que se haga una petición HTTP con el método DELETE y la url correspondiente al id de prueba
const req = httpMock.expectOne(url);
expect(req.request.method).toBe('DELETE');

// Respondemos a la petición HTTP con un cuerpo vacío
req.flush({});

// Esperamos que la promesa se resuelva sin ningún valor
promise.then(value => {
expect(value).toBeUndefined();
});
});
});
