import { ListserviceService } from './../../services/listservice.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
let component: ListComponent;
let fixture: ComponentFixture<ListComponent>;
let listService: ListserviceService; // Servicio a inyectar

beforeEach(async () => {
await TestBed.configureTestingModule({
imports: [HttpClientTestingModule], // Importar el módulo para simular las peticiones HTTP
declarations: [ ListComponent ],
providers: [ListserviceService] // Proveer el servicio
})
.compileComponents();
});

beforeEach(() => {
fixture = TestBed.createComponent(ListComponent);
component = fixture.componentInstance;
listService = TestBed.inject(ListserviceService); // Obtener la instancia del servicio
fixture.detectChanges();
});

it('should create', () => {
expect(component).toBeTruthy(); // Verificar que el componente se cree correctamente
});

it('should call getRecords and assign data to Records array', () => {
const mockResponse = [{id: 1, name: 'test'}]; // Crear una respuesta falsa para simular el servicio
spyOn(listService, 'getRecords').and.returnValue(of(mockResponse)); // Espiar el método getRecords del servicio y hacer que devuelva la respuesta falsa
component.getRecords(); // Llamar al método del componente
expect(listService.getRecords).toHaveBeenCalled(); // Verificar que el método del servicio se haya llamado
expect(component.Records).toEqual(mockResponse); // Verificar que el array Records tenga los datos de la respuesta
});

it('should change showData to true when getRecords is successful', () => {
const mockResponse = [{id: 1, name: 'test'}]; // Crear una respuesta falsa para simular el servicio
spyOn(listService, 'getRecords').and.returnValue(of(mockResponse)); // Espiar el método getRecords del servicio y hacer que devuelva la respuesta falsa
component.getRecords(); // Llamar al método del componente
expect(component.showData).toBeTrue(); // Verificar que la variable showData sea verdadera
});
});
