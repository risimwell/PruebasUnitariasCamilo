import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegisterserviceService } from './registerservice.service';

describe('Register on Person', () => {
let service: RegisterserviceService; // Declaramos una variable para el servicio
let httpMock: HttpTestingController; // Declaramos una variable para el HttpTestingController

beforeEach(() => {
TestBed.configureTestingModule({
imports: [HttpClientTestingModule], // Importamos el HttpClientTestingModule para simular las peticiones HTTP
providers: [RegisterserviceService] // Proveemos el servicio que vamos a probar
});
service = TestBed.inject(RegisterserviceService); // Obtenemos una instancia del servicio usando TestBed.inject()
httpMock = TestBed.inject(HttpTestingController); // Obtenemos una instancia del HttpTestingController usando TestBed.inject()
});

it('should be created', () => {
expect(service).toBeTruthy(); // Comprobamos que el servicio se ha creado correctamente
});

it('should create a person with the given data', () => {
// Arrange
const personData = { name: 'John', age: 25 }; // Definimos el objeto que vamos a enviar en la petición
const expectedResponse = { message: 'Person created successfully' }; // Definimos la respuesta que esperamos recibir

// Act
service.createPerson(personData).subscribe(response => {
// Nos suscribimos al observable que devuelve el método createPerson()
// Assert
expect(response).toEqual(expectedResponse); // Comprobamos que la respuesta es igual a la esperada
});

// Assert
const req = httpMock.expectOne('http://localhost:8080/users/save'); // Obtenemos la petición simulada usando httpMock.expectOne() y pasando la URL que usamos en el servicio
expect(req.request.method).toBe('POST'); // Comprobamos que el método de la petición es POST
expect(req.request.body).toEqual(personData); // Comprobamos que el cuerpo de la petición es igual al objeto que enviamos
req.flush(expectedResponse); // Enviamos una respuesta simulada usando req.flush() y pasando el objeto que definimos como respuesta esperada
});

it('should handle errors if the request fails', () => {
// Arrange
const personData = { name: 'John', age: 25 }; // Definimos el objeto que vamos a enviar en la petición
const errorResponse = { status: 500, statusText: 'Internal Server Error' }; // Definimos el error que vamos a simular

// Act
service.createPerson(personData).subscribe(
response => fail('Should have failed with an error'), // Si la petición tiene éxito, hacemos que la prueba falle, porque esperamos un error
error => {
// Si la petición falla, ejecutamos esta función
// Assert
expect(error.status).toEqual(500); // Comprobamos que el código de estado del error es 500
expect(error.statusText).toEqual('Internal Server Error'); // Comprobamos que el texto del estado del error es 'Internal Server Error'
}
);

// Assert
const req = httpMock.expectOne('http://localhost:8080/users/save'); // Obtenemos la petición simulada usando httpMock.expectOne() y pasando la URL que usamos en el servicio
expect(req.request.method).toBe('POST'); // Comprobamos que el método de la petición es POST
expect(req.request.body).toEqual(personData); // Comprobamos que el cuerpo de la petición es igual al objeto que enviamos
req.flush('', errorResponse); // Enviamos un error simulado usando req.flush() y pasando una cadena vacía como respuesta y el objeto que definimos como error
});

afterEach(() => {
httpMock.verify(); // Verificamos que no hay peticiones pendientes o sin verificar usando httpMock.verify()
});
});
