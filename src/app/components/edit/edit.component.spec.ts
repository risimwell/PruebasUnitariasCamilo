import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { EditComponent } from './edit.component';
import { UpdateserviceService } from 'src/app/services/updateservice.service';
import { of } from 'rxjs';
import { Router } from '@angular/router'; // Importar el Router

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let updateServiceSpy: jasmine.SpyObj<UpdateserviceService>;
  let router: Router; // Definir el router para usarlo en la prueba

  beforeEach(waitForAsync(() => {
    // Crear el spy del servicio de actualización
    const spy = jasmine.createSpyObj('UpdateserviceService', ['updateDatosPersonales']);

    TestBed.configureTestingModule({
      declarations: [EditComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: UpdateserviceService, useValue: spy }
      ]
    }).compileComponents();

    // Obtener el servicio de actualización a través del TestBed
    updateServiceSpy = TestBed.inject(UpdateserviceService) as jasmine.SpyObj<UpdateserviceService>;

    // Obtener el enrutador del TestBed
    router = TestBed.inject(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update user data and navigate to profile on submit', () => {
    // Simular datos del formulario
    const formData = {
      firstname: 'John',
      lastname: 'Doe',
      username: 'johndoe',
      password: 'password'
    };

    // Establecer los valores del formulario en el componente
    component.form.setValue(formData);

    // Simular una respuesta exitosa del servicio de actualización
    const updateResponse = { message: 'User data updated successfully' };
    updateServiceSpy.updateDatosPersonales.and.returnValue(of(updateResponse));

    // Espiar el método de navegación del enrutador
    spyOn(router, 'navigate');

    // Llamar al método onSubmit() del componente
    component.onSubmit();

    // Comprobar que el servicio de actualización se haya llamado con los datos correctos
    expect(updateServiceSpy.updateDatosPersonales).toHaveBeenCalledWith(component.userId, formData);

    // Comprobar que el componente haya navegado a la página de perfil después de la actualización
    expect(router.navigate).toHaveBeenCalledWith(['/perfil']);
  });
});
