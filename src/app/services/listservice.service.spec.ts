// Importamos el módulo TestBed, que nos permite configurar un entorno de pruebas para los servicios de Angular
import { TestBed } from '@angular/core/testing';

// Importamos el módulo HttpClientTestingModule y el servicio HttpTestingController, que nos permiten simular las peticiones HTTP y controlar las respuestas
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Importamos el servicio que queremos probar, que es el que hace el listado de los usuarios
import { ListserviceService } from './listservice.service';

// Importamos el modelo de datos que representa un usuario
import { datosUsuarios } from '../modelos/datosUsuario';

// Usamos la función describe para agrupar las pruebas relacionadas con el servicio de listado y le damos un nombre descriptivo
describe('ListserviceService', () => {

// Declaramos dos variables para guardar las instancias del servicio de listado y del controlador HTTP que vamos a usar en las pruebas
let service: ListserviceService;
let httpMock: HttpTestingController;

// Usamos la función beforeEach para ejecutar código antes de cada prueba. En este caso, vamos a configurar el módulo de pruebas y a crear las instancias del servicio y del controlador
beforeEach(() => {
// Usamos la función configureTestingModule para crear un módulo de pruebas con las dependencias necesarias para el servicio de listado
TestBed.configureTestingModule({
// Importamos el módulo HttpClientTestingModule para poder simular las peticiones HTTP
imports: [HttpClientTestingModule],
// Proveemos el servicio de listado como un proveedor del módulo de pruebas
providers: [ListserviceService]
});

// Usamos la función inject para obtener una instancia del servicio de listado del módulo de pruebas
service = TestBed.inject(ListserviceService);

// Usamos la función inject para obtener una instancia del controlador HTTP del módulo de pruebas
httpMock = TestBed.inject(HttpTestingController);
});

// Usamos la función afterEach para ejecutar código después de cada prueba. En este caso, vamos a verificar que no hay peticiones HTTP pendientes
afterEach(() => {
// Usamos el método verify del controlador HTTP para comprobar que no hay peticiones sin responder o canceladas
httpMock.verify();
});

// Usamos la función it para definir una prueba unitaria y le damos un nombre descriptivo
it('should be created List ', () => {
// Usamos la función expect para hacer una afirmación sobre el resultado esperado de la prueba. En este caso, esperamos que el servicio se haya creado correctamente
expect(service).toBeTruthy();
});

// Usamos la función it para definir otra prueba unitaria y le damos un nombre descriptivo
it('should list all users and return an array of users', () => {
// Definimos un array que representa la lista de usuarios que esperamos recibir del servicio de listado
const mockUsers: datosUsuarios[] = [
{ firstname: 'Alice', lastname: 'hamilrton', username: 'la destructora', password: '12444' },
{ firstname: 'Harnol', lastname: 'Shuarsenegger', username: 'T800', password: '87344' },
{ firstname: 'desconocido', lastname: 'incierto', username: 'depredator', password: '87233' },
];

// Llamamos al método getRecords del servicio y nos suscribimos al observable que devuelve. El observable emitirá un valor cuando recibamos la respuesta del servidor
service.getRecords().subscribe(users => {
// Usamos la función expect para hacer una afirmación sobre el resultado esperado de la prueba. En este caso, esperamos que el array de usuarios que recibimos sea igual al array que definimos antes
expect(users).toEqual(mockUsers);
});

// Usamos el método expectOne del controlador HTTP para obtener la petición HTTP que ha enviado el servicio. Le pasamos como argumento la URL del servidor a la que se ha hecho la petición
const req = httpMock.expectOne('http://localhost:8080/users/all');

// Usamos la función expect para hacer una afirmación sobre el método HTTP usado por la petición. En este caso, esperamos que sea GET
expect(req.request.method).toBe('GET');

// Usamos el método flush del controlador HTTP para enviar una respuesta simulada a la petición. Le pasamos como argumento el array de usuarios que definimos antes
req.flush(mockUsers);
});
});
