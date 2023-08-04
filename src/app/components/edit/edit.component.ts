import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UpdateserviceService } from 'src/app/services/updateservice.service';
import { datosUsuarios } from 'src/app/modelos/datosUsuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  // Definir el formulario reactivo
  form!: FormGroup;

  // Definir el id del usuario
  userId!: number;

  // Definir los datos del usuario
  datos!: datosUsuarios;

  // Inyectar el servicio de actualización y el form builder en el constructor
  constructor(private updateService: UpdateserviceService, private fb: FormBuilder, public router: Router) {}

  // Definir el método ngOnInit()
  ngOnInit(): void {
    // Recuperar el ID del usuario desde el almacenamiento local y convertirlo a un número
    this.userId = Number(localStorage.getItem('userId'));

    // Crear el formulario con los campos y validadores necesarios
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['',Validators.required],
      password: ['', Validators.required]
    });

   // Llamar al servicio de actualización para obtener los datos del usuario por su id
this.updateService.getDatosPersonales(this.userId).subscribe(
  response => {
  this.datos = response; // Guardar los datos en la variable
  // Usar el método setValue() para asignar los datos al formulario
  this.form.setValue(this.datos);
  },
  error => {
  console.log(error); // Manejar el error
  }
  );
  }

  // Definir un método para enviar el formulario
  onSubmit() {
    // Si el formulario es válido
    if (this.form.valid) {
      // Obtener los valores del formulario y asignarlos a la variable de datos
      this.datos = this.form.value;
      // Llamar al servicio de actualización para actualizar los datos del usuario por su id
      this.updateService.updateDatosPersonales(this.userId, this.datos).subscribe(
        response => {
          console.log(response); // Mostrar la respuesta
          this.router.navigate(['/perfil']);
        },
        error => {
          console.log(error); // Manejar el error
        }
      );
    }
  }
}
