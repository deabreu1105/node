

// LA idea del repositorio es que conozca cuales son los metodos que vamos llamar del datasource, 
// en este caso, el repositorio de autenticación conoce que vamos a llamar al método register del 
// datasource de autenticación, pero no sabe como se implementa ese método, eso lo sabe el datasource de 
// autenticación, que es el encargado de implementar la lógica para registrar un nuevo usuario en la base 
// de datos. De esta manera, el repositorio de autenticación se encarga de definir la interfaz para la fuente 
// de datos de autenticación, mientras que el datasource de autenticación se encarga de implementar esa interfaz 
// y proporcionar la lógica para interactuar con la base de datos o cualquier otra fuente de datos que se utilice 
// para la autenticación.

// el repositorio de autenticación es una clase abstracta que define la interfaz para la fuente de datos de autenticación, es decir, los métodos que se deben implementar para interactuar con la base de datos o cualquier otra fuente de datos que se utilice para la autenticación. Esta clase abstracta se puede extender por una clase concreta que implemente los métodos definidos en esta clase abstracta, y así garantizar que cualquier implementación de la fuente de datos de autenticación siga la misma interfaz y tenga los mismos métodos disponibles para ser utilizados por el controlador y el servicio correspondiente.
import type { UserEntity } from "../entities/user.entity.js";
import type { RegisterUserDto } from "../dtos/auth/register-user.dto.js";


//  es abstracto porque no se puede instanciar directamente, sino que debe ser extendido por una clase concreta que 
// implemente los métodos definidos en esta clase abstracta. De esta manera, se puede garantizar que cualquier 
// implementación de la fuente de datos de autenticación siga la misma interfaz y tenga los mismos métodos disponibles 
// para ser utilizados por el controlador y el servicio correspondiente.
export abstract class AuthRepository {
    // Aquí se pueden agregar los métodos abstractos para la fuente de datos de autenticación, como register, login, logout, etc.

    // TODO:
    // abstarct login( loginUserDto: LoginUserDto ) : Promise<UserEntity>;


    abstract register( registerUserDto: RegisterUserDto ) : Promise<UserEntity>;
    
   

}