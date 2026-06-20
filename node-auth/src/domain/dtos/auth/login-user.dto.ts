
import { Validators } from "../../../config/index.js";




export class LoginUserDto {

    // Aquí se pueden agregar las propiedades y métodos del DTO de inicio de sesión de usuario, como email, password, etc.
    // el constructor es privado para evitar que se puedan crear instancias de la clase sin pasar por el método 
    // estático login,
    private constructor(
        public email: string,
        public password: string,
    ) {}

    // Método estático para crear una instancia de LoginUserDto
    static login( object: { [key: string]: any; } ) : [ string?, LoginUserDto? ] {
        const { email, password } = object;

        if ( !email ) return ['Email is required'];
        if ( !Validators.email.test(email) ) return ['Email is invalid'];
        if ( !password ) return ['Password is required'];
        if ( password.length < 6 ) return ['Password must be at least 6 characters long'];

        return [
            '',  // Si todos los datos son válidos, se devuelve un array vacío para indicar que no hay errores, y se devuelve una instancia del DTO con los datos validados y transformados.
            new LoginUserDto(email, password)  //Se regresa la instancia del DTO con los datos validados y transformados, en este caso se transforma el email a minúsculas para evitar problemas de mayúsculas y minúsculas en el registro de usuarios.
        ];
    }

}