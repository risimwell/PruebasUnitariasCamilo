import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private router: Router) {}

  logout() {
    // Lógica para cerrar sesión
    // ...

    // Redireccionar al inicio de sesión después de cerrar sesión
    this.router.navigate(['/login']);
  }
}
