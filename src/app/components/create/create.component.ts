import { Component } from '@angular/core';
import { RegisterserviceService } from 'src/app/services/registerservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  personData = {
    firstname: '',
    lastname: '',
    username: '',
    password: ''
  };

constructor(private recorsPersona: RegisterserviceService, private router: Router){

}

createPerson() {
  this.recorsPersona.createPerson(this.personData).subscribe(
    (response: any) => {
      // La persona se creó exitosamente, puedes manejar la respuesta como desees
      console.log('Persona creada:', response);
      this.router.navigate(['/login']);

    },
    (error: any) => {
      console.error('Error al crear persona:', error);
    });
  }
}
