import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ComponentFixture } from '@angular/core/testing';
import { of } from 'rxjs';
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { RegisterserviceService } from 'src/app/services/registerservice.service';
import { CreateComponent } from './create.component';

describe('CreateComponent', () => {

let component: CreateComponent;
let service: RegisterserviceService;
let router: Router;
let location: Location;
let fixture: ComponentFixture<CreateComponent>;

beforeEach(() => {
TestBed.configureTestingModule({
imports: [HttpClientModule,RouterTestingModule.withRoutes([
// Aquí definimos las rutas que vamos a usar en la prueba. En este caso, solo necesitamos la ruta de login
{ path: 'login', component: DummyComponent }
])],
declarations: [ CreateComponent, DummyComponent ], // Declaramos los componentes que vamos a usar en la prueba
providers: [ RegisterserviceService ] // Proveemos el servicio que vamos a usar en la prueba
});
// Obtenemos las instancias del componente, del servicio, del router y del location
fixture = TestBed.createComponent(CreateComponent);
component = fixture.componentInstance;
service = TestBed.inject(RegisterserviceService);
router = TestBed.inject(Router);
location = TestBed.inject(Location);
});

it('should create', () => {
// Verificamos que el componente se crea correctamente
expect(component).toBeTruthy();
});

it('should create person and navigate to login', () => {
// Definimos un objeto falso con los datos de la persona
const mockPersonData = {
firstname: 'Alice',
lastname: 'Smith',
username: '<a href="mailto:alice@example.com">alice@example.com</a>',
password: '123456789'
};

// Asignamos el objeto falso al atributo personData del componente
component.personData = mockPersonData;

// Espiamos el método createPerson del servicio y le decimos que devuelva un valor falso
spyOn(service, 'createPerson').and.returnValue(of({}));

// Espiamos el método createUser del componente y le decimos que llame al método original
spyOn(component, 'createPerson').and.callThrough();

// Llamamos al método createPerson del componente sin argumentos
component.createPerson();

// Esperamos a que se resuelva el observable
fixture.whenStable().then(() => {
// Verificamos que se llama al método createPerson del servicio con los datos de la persona
expect(service.createPerson).toHaveBeenCalledWith(mockPersonData);

// Verificamos que se llama al método createUser del componente con los datos de la persona
expect(component.createPerson.name).toHaveBeenCalledWith(mockPersonData);

// Verificamos que se navega a la url de login
expect(location.path()).toBe('/login');
});
});
});

// Creamos un componente falso para simular la ruta de login
@Component({template: ''})
class DummyComponent {}
