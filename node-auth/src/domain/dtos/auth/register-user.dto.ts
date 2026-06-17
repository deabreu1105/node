
// El DTO (Data Transfer Object) de registro de usuario es una clase que se encarga de definir la estructura 
// de los datos que se recibirán en la solicitud de registro de usuario. Este DTO se utiliza para validar y 
// transformar los datos antes de que sean procesados por el controlador y el servicio correspondiente.

// En este caso, el DTO de registro de usuario tiene las propiedades name, email y password, que son los 
// datos necesarios para registrar un nuevo usuario en la aplicación. Además, el DTO tiene un método estático 
// create que se encarga de validar los datos recibidos y devolver un error si alguno de los datos es inválido o falta.

// El método create recibe un objeto con los datos de registro y devuelve un array con un mensaje de error si 
// alguno de los datos es inválido o falta, o un array vacío si todos los datos son válidos. Este método se puede 
// utilizar en el controlador para validar los datos antes de procesarlos y registrar al nuevo usuario en la base de datos.

// valida los datos de registro de usuario utilizando la clase Validators, que es un adaptador de validación que se encarga 
// de validar los datos utilizando la librería validator.js o cualquier otra librería de validación que se desee utilizar.

// se usan solamente en los endpoints post y put, ya que son los únicos que reciben datos en el cuerpo de la solicitud. 
// En los endpoints get y delete no se necesitan DTOs, ya que no se reciben datos en el cuerpo de la solicitud, 
// sino que se reciben datos en la URL o en los parámetros de consulta.
import { Validators } from "../../../config/validators.js";



export class RegisterUserDto {

  // Aquí se pueden agregar las propiedades y métodos del DTO de registro de usuario, como name, email, password, etc.
  //  el constructor es privado para evitar que se puedan crear instancias de la clase sin pasar por el método 
  // estático create,
  private constructor(
    public name: string,
    public email: string,
    public password: string,
  ) {}


  static create( object: { [key: string]: any; } ) : [ string?, RegisterUserDto? ] {

    const { name, email, password } = object;

    if ( !name ) return ['Name is required'];
    if ( !email ) return ['Email is required'];
    if ( !Validators.email.test(email) ) return ['Email is invalid'];
    if ( !password ) return ['Password is required'];
    if ( password.length < 6 ) return ['Password must be at least 6 characters long'];

    return [
        '',  // Si todos los datos son válidos, se devuelve un array vacío para indicar que no hay errores, y se devuelve una instancia del DTO con los datos validados y transformados.
        new RegisterUserDto(name, email.toLowerCase(), password)  //Se regresa la instancia del DTO con los datos validados y transformados, en este caso se transforma el email a minúsculas para evitar problemas de mayúsculas y minúsculas en el registro de usuarios.
    ];
  }

}