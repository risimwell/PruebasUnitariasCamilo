import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginserviceService } from 'src/app/services/loginservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: LoginserviceService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      console.error('Por favor, complete todos los campos');
      return;
    }

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe(
      {
        next: response => {
          localStorage.setItem('token', response.token);
          console.log('Token recibido:', response.token);

          console.log('Inicio de sesión exitoso:', response);
          localStorage.setItem('userId', response.userId);
          console.log(response.userId)
          this.router.navigate(['/perfil']);
        },

        error: error => {
          console.error('Error en el inicio de sesión:','algo fallo revisa el codigo', error);
          this.router.navigate(['/login']);
        }
      }

    );
  }
}
