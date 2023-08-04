import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginserviceService } from './loginservice.service';
import { tokenModel } from '../modelos/tokenModelo'; // Importamos el modelo de datos que representa el token que devuelve el servicio de login

// Usamos la función describe para agrupar las pruebas relacionadas con el servicio de login y le damos un nombre descriptivo
describe('LoginserviceService', () => {

// Declaramos dos variables para guardar las instancias del servicio de login y del controlador HTTP que vamos a usar en las pruebas
let service: LoginserviceService;
let httpMock: HttpTestingController;

// Usamos la función beforeEach para ejecutar código antes de cada prueba. En este caso, vamos a configurar el módulo de pruebas y a crear las instancias del servicio y del controlador
beforeEach(() => {
// Usamos la función configureTestingModule para crear un módulo de pruebas con las dependencias necesarias para el servicio de login
TestBed.configureTestingModule({// Importamos el módulo HttpClientTestingModule para poder simular las peticiones HTTP

imports: [HttpClientTestingModule],
providers: [LoginserviceService]// Proveemos el servicio de login como un proveedor del módulo de pruebas
});

service = TestBed.inject(LoginserviceService); // Usamos la función inject para obtener una instancia del servicio de login del módulo de pruebas
httpMock = TestBed.inject(HttpTestingController);// Usamos la función inject para obtener una instancia del controlador HTTP del módulo de pruebas

});

it('should be created Login ', () => { // Usamos la función it para definir una prueba unitaria y le damos un nombre descriptivo

  expect(service).toBeTruthy();  // Usamos la función expect para hacer una afirmación sobre el resultado esperado de la prueba. En este caso, esperamos que el servicio se haya creado correctamente
  });


afterEach(() => {// Usamos la función afterEach para ejecutar código después de cada prueba. En este caso, vamos a verificar que no hay peticiones HTTP pendientes
httpMock.verify(); // Usamos el método verify del controlador HTTP para comprobar que no hay peticiones sin responder o canceladas
});



// Usamos la función it para definir otra prueba unitaria y le damos un nombre descriptivo
it('should login with valid credentials and return a token', () => {
// Definimos un objeto que representa el token que esperamos recibir del servicio de login
const mockToken: tokenModel = { token: 'abc123' };

// Definimos dos variables que representan las credenciales válidas que vamos a usar para hacer el login
const username = 'user';
const password = 'pass';

// Llamamos al método login del servicio y nos suscribimos al observable que devuelve. El observable emitirá un valor cuando recibamos la respuesta del servidor
service.login(username, password).subscribe(token => {
// Usamos la función expect para hacer una afirmación sobre el resultado esperado de la prueba. En este caso, esperamos que el token que recibimos sea igual al token que definimos antes
expect(token).toEqual(mockToken);
});

// Usamos el método expectOne del controlador HTTP para obtener la petición HTTP que ha enviado el servicio. Le pasamos como argumento la URL del servidor a la que se ha hecho la petición
const req = httpMock.expectOne('http://localhost:8080/users/login');

// Usamos la función expect para hacer una afirmación sobre el método HTTP usado por la petición. En este caso, esperamos que sea POST
expect(req.request.method).toBe('POST');

// Usamos la función expect para hacer una afirmación sobre el cuerpo de la petición. En este caso, esperamos que sea un objeto con las credenciales que definimos antes. Como el cuerpo de la petición es un string JSON, tenemos que parsearlo a un objeto antes de compararlo
expect(JSON.parse(req.request.body)).toEqual({ username, password });

// Usamos el método flush del controlador HTTP para enviar una respuesta simulada a la petición. Le pasamos como argumento el token que definimos antes
req.flush(mockToken);
});
});
