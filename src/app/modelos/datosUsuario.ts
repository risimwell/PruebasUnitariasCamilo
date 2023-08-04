export class datosUsuarios {
  // asignar valores a las propiedades de la interfaz
    firstname: string;
    lastname: string;
    username: string;
    password: string;

  constructor(datos: any) {
    this.firstname = datos.firstname;
    this.lastname = datos.lastname;
    this.username = datos.username;
    this.password = datos.password;
    }


}
