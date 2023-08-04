import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { LoginserviceService } from 'src/app/services/loginservice.service';
import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: LoginserviceService;
  let router: Router; // Declara una variable para el router

  beforeEach(async () => {
  await TestBed.configureTestingModule({
  declarations: [ LoginComponent ],
  imports: [ ReactiveFormsModule, RouterTestingModule, HttpClientModule ],
  })
  .compileComponents();
  });

  beforeEach(() => {
  fixture = TestBed.createComponent(LoginComponent);
  component = fixture.componentInstance;
  authService = TestBed.inject(LoginserviceService);
  router = TestBed.inject(Router); // Obtiene una instancia del router
  fixture.detectChanges();
  });

it('should create', () => {
expect(component).toBeTruthy();
});

it('should initialize login form', () => {
expect(component.loginForm).toBeDefined();
expect(component.loginForm.controls['username']).toBeDefined(); // Usa la notación de corchetes aquí
expect(component.loginForm.controls['password']).toBeDefined(); // Y aquí también
});

it('should validate login form', () => {
component.loginForm.controls['username'].setValue(''); // Usa la notación de corchetes aquí
component.loginForm.controls['password'].setValue(''); // Y aquí también
expect(component.loginForm.invalid).toBeTrue();

component.loginForm.controls['username'].setValue('user'); // Usa la notación de corchetes aquí
component.loginForm.controls['password'].setValue(''); // Y aquí también
expect(component.loginForm.invalid).toBeTrue();

component.loginForm.controls['username'].setValue(''); // Usa la notación de corchetes aquí
component.loginForm.controls['password'].setValue('pass'); // Y aquí también
expect(component.loginForm.invalid).toBeTrue();

component.loginForm.controls['username'].setValue('user'); // Usa la notación de corchetes aquí
component.loginForm.controls['password'].setValue('pass'); // Y aquí también
expect(component.loginForm.invalid).toBeFalse();
});

it('should call login service and navigate to perfil on success', () => {
  spyOn(authService, 'login').and.returnValue(of({token: 'abc', userId: '123'}));
  spyOn(localStorage, 'setItem');
  spyOn(router, 'navigate'); // Espía el método navigate del router

  component.loginForm.controls['username'].setValue('user');
  component.loginForm.controls['password'].setValue('pass');
  component.login();

  expect(authService.login).toHaveBeenCalledWith('user', 'pass');
  expect(localStorage.setItem).toHaveBeenCalledWith('token', 'abc');
  expect(localStorage.setItem).toHaveBeenCalledWith('userId', '123');
  expect(router.navigate).toHaveBeenCalledWith(['/perfil']); // Usa el router que has obtenido antes
  });

  it('should call login service and navigate to login on error', () => {
  spyOn(authService, 'login').and.returnValue(throwError(new Error('error')));
  spyOn(console, 'error');
  spyOn(router, 'navigate'); // Espía el método navigate del router

  component.loginForm.controls['username'].setValue('user');
  component.loginForm.controls['password'].setValue('pass');
  component.login();

  expect(authService.login).toHaveBeenCalledWith('user', 'pass');
  expect(console.error).toHaveBeenCalledWith('Error en el inicio de sesión:', 'algo fallo revisa el codigo', jasmine.any(Error));
  expect(router.navigate).toHaveBeenCalledWith(['/login']); // Usa el router que has obtenido antes
  });
  });
