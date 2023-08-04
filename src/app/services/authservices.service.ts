import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getToken(): string | null {
    // Obtener el token desde el almacenamiento local (localStorage) o las cookies
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    // Verificar si el token existe y es válido (puedes usar la librería jwt-decode para verificar la validez)
    const token = this.getToken();
    return !!token && token !== 'null' && !this.isTokenExpired(token);
  }


  private isTokenExpired(token: string): boolean {
    const decodedToken: any = jwt_decode(token); // Realizar un casteo explícito a 'any'

    if (typeof decodedToken.exp === 'undefined') {
      return false;
    }

    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(decodedToken.exp);

    return expirationDate.valueOf() < new Date().valueOf();
  }


}
