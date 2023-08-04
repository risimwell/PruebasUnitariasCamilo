import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProfileComponent } from './profile.component';
import { Router } from '@angular/router';

describe('ProfileComponent', () => {
let component: ProfileComponent;
let fixture: ComponentFixture<ProfileComponent>;
let router: Router; // Declara una variable para el router

beforeEach(async () => {
await TestBed.configureTestingModule({
declarations: [ ProfileComponent ],
imports: [ RouterTestingModule ], // Importa el módulo RouterTestingModule
})
.compileComponents();
});

beforeEach(() => {
fixture = TestBed.createComponent(ProfileComponent);
component = fixture.componentInstance;
router = TestBed.inject(Router); // Obtiene una instancia del router
fixture.detectChanges();
});

it('should create', () => {
expect(component).toBeTruthy();
});

it('should call logout and navigate to login', () => {
spyOn(component, 'logout').and.callThrough(); // Espía el método logout del componente
spyOn(router, 'navigate'); // Espía el método navigate del router

const button = fixture.nativeElement.querySelector('button'); // Obtiene el botón del template
button.click(); // Simula un clic en el botón

expect(component.logout).toHaveBeenCalled(); // Verifica que se haya llamado al método logout
expect(router.navigate).toHaveBeenCalledWith(['/login']); // Verifica que se haya navegado al login
});
});
