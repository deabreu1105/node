


export class UserEntity {

  // Aquí se pueden agregar las propiedades y métodos de la entidad de usuario, como id, username, password, etc.
  
  // aquí no se aplica la inyección de dependencias, ya que esta clase es una entidad y no un servicio o controlador
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public role: string[],
    public img?: string,
  ) {
    // Aquí se pueden inicializar las propiedades de la entidad de usuario, como id, username, password, etc.
    
  }

}