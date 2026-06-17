

// LAs entidades son para evitar el efecto domino, es decir, que si cambiamos algo en la base de datos, 
// no tengamos que cambiar todo el código, sino solo la entidad. Además, las entidades nos permiten 
// tener una capa de abstracción entre la base de datos y el resto del código, lo que nos permite cambiar 
// la base de datos sin tener que cambiar el resto del código. Por ejemplo, si queremos cambiar de MongoDB 
// a MySQL, solo tendríamos que cambiar la entidad y no el resto del código.
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