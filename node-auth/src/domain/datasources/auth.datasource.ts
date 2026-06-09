

// El datasource de autenticación es una clase abstracta que define los métodos que deben ser implementados por 
// cualquier fuente de datos de autenticación, como una base de datos, un servicio externo, etc. Esta clase se 
// utiliza para definir la interfaz que debe seguir cualquier implementación de la fuente de datos de autenticación, 
// lo que permite una mayor flexibilidad y escalabilidad en la aplicación.

import type { UserEntity } from "../entities/user.entity.js";
import type { RegisterUserDto } from "../dtos/auth/register-user.dto.js";


//  es abstracto porque no se puede instanciar directamente, sino que debe ser extendido por una clase concreta que 
// implemente los métodos definidos en esta clase abstracta. De esta manera, se puede garantizar que cualquier 
// implementación de la fuente de datos de autenticación siga la misma interfaz y tenga los mismos métodos disponibles 
// para ser utilizados por el controlador y el servicio correspondiente.
export abstract class AuthDataSource {
    // Aquí se pueden agregar los métodos abstractos para la fuente de datos de autenticación, como register, login, logout, etc.

    // TODO:
    // abstarct login( loginUserDto: LoginUserDto ) : Promise<UserEntity>;


    abstract register( registerUserDto: RegisterUserDto ) : Promise<UserEntity>;
    
   

}