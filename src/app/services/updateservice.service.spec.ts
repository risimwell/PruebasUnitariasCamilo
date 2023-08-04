// Importamos los módulos y servicios necesarios para las pruebas
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UpdateserviceService } from './updateservice.service';
import { datosUsuarios } from '../modelos/datosUsuario';

// Agrupamos las pruebas relacionadas con el servicio de actualizar
describe('UpdateserviceService', () => {

// Creamos las instancias del servicio y del controlador HTTP
let service: UpdateserviceService;
let httpMock: HttpTestingController;
beforeEach(() => {
TestBed.configureTestingModule({
imports: [HttpClientTestingModule],
providers: [UpdateserviceService]
});
service = TestBed.inject(UpdateserviceService);
httpMock = TestBed.inject(HttpTestingController);
});

// Verificamos que no hay peticiones HTTP pendientes
afterEach(() => {
httpMock.verify();
});

// Probamos que el servicio se crea correctamente
it('should be created Update ', () => {
expect(service).toBeTruthy();
});

// Probamos que el servicio obtiene los datos personales por id y los compara con un objeto esperado
it('should get personal data by user id and return an object of personal data', () => {
const mockDatos: datosUsuarios = {

firstname: 'Alice',
lastname: 'Smith',
username: 'alice@example.com',
password: '123456789'
};
const userId = 1;
service.getDatosPersonales(userId).subscribe(datos => {
expect(datos).toEqual(mockDatos);
});
const req = httpMock.expectOne(`http://localhost:8080/users/byId/${userId}`);
expect(req.request.method).toBe('GET');
req.flush(mockDatos);
});

// Probamos que el servicio actualiza los datos personales por id y los compara con un objeto esperado
it('should update personal data by user id and return an updated object of personal data', () => {
const mockDatos: datosUsuarios = {

firstname: 'Alice',
lastname: 'Smith',
username: 'alice@example.com',
password: '987654321'
};
const userId = 1;
service.updateDatosPersonales(userId, mockDatos).subscribe(datos => {
expect(datos).toEqual(mockDatos);
});
const req = httpMock.expectOne(`http://localhost:8080/users/${userId}/update`);
expect(req.request.method).toBe('PUT');
expect(req.request.body).toEqual(mockDatos);
req.flush(mockDatos);
});
});
