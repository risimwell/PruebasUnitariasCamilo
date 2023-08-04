// Importamos los módulos y servicios necesarios para las pruebas
import { TestBed } from '@angular/core/testing';
import { AuthService } from './authservices.service';

// Agrupamos las pruebas relacionadas con el servicio de autenticación
describe('AuthService', () => {

// Creamos la instancia del servicio
let service: AuthService;
beforeEach(() => {
TestBed.configureTestingModule({
providers: [AuthService]
});
service = TestBed.inject(AuthService);
});

// Probamos que el servicio se crea correctamente
it('should be created Auth ', () => {
expect(service).toBeTruthy();
});

// Probamos que el servicio obtiene el token desde el localStorage
it('should get token from localStorage', () => {
// Definimos un token de prueba y lo guardamos en el localStorage
const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tYnJlIjoiQWxpY2UiLCJlbWFpbCI6ImFsaWNlQGV4YW1wbGUuY29tIiwidGVsZWZvbm8iOiIxMjM0NTY3ODkiLCJpYXQiOjE2Mzg0NzE3MjEsImV4cCI6MTYzODQ3NTMyMX0.7yqHfLx7m5f8oXk9yOaZqNn1r4LwDQxh8Tl8yWdZKsA';
localStorage.setItem('token', mockToken);

// Llamamos al método getToken del servicio y guardamos el valor que devuelve
const token = service.getToken();

// Usamos la función expect para hacer una afirmación sobre el resultado esperado de la prueba. En este caso, esperamos que el token que devuelve el servicio sea igual al token que guardamos en el localStorage
expect(token).toEqual(mockToken);
});

// Probamos que el servicio verifica si el token existe y es válido
it('should check if token exists and is valid', () => {
// Definimos dos tokens de prueba, uno válido y otro expirado
const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tYnJlIjoiQWxpY2UiLCJlbWFpbCI6ImFsaWNlQGV4YW1wbGUuY29tIiwidGVsZWZvbm8iOiIxMjM0NTY3ODkiLCJpYXQiOjE2Mzg0NzE3MjEsImV4cCI6MTYzODQ3NTMyMX0.7yqHfLx7m5f8oXk9yOaZqNn1r4LwDQxh8Tl8yWdZKsA';
const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tYnJlIjoiQWxpY2UiLCJlbWFpbCI6ImFsaWNlQGV4YW1wbGUuY29tIiwidGVsZWZvbm8iOiIxMjM0NTY3ODkiLCJpYXQiOjE2Mzg0NzE3MjEsImV4cCI6MTYzODQ3MTcyMn0.7HbPbCvBdCkGxKbTfBbPdKoHvFkSgqDwCwSfBxhVrLk';

// Guardamos el token válido en el localStorage y llamamos al método isAuthenticated del servicio
localStorage.setItem('token', validToken);
const isAuthenticatedWithValidToken = service.isAuthenticated();

// Usamos la función expect para hacer una afirmación sobre el resultado esperado de la prueba. En este caso, esperamos que el método devuelva true, indicando que el usuario está autenticado
expect(isAuthenticatedWithValidToken).toBeTrue();

// Guardamos el token expirado en el localStorage y llamamos al método isAuthenticated del servicio
localStorage.setItem('token', expiredToken);
const isAuthenticatedWithExpiredToken = service.isAuthenticated();

// Usamos la función expect para hacer una afirmación sobre el resultado esperado de la prueba. En este caso, esperamos que el método devuelva false, indicando que el usuario no está autenticado
expect(isAuthenticatedWithExpiredToken).toBeFalse();
});
});
