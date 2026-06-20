import type { AuthDataSource, AuthRepository, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain/index.js";



// LOs repositorios reciben datasources para que nosotros interactuemos con el repositorio, 
// es decir, el repositorio es una capa de abstracción que se encarga de manejar la 
// lógica de acceso a datos de autenticación, como una base de datos, un servicio externo, etc. 
// El repositorio se encarga de mapear los datos que recibe del datasource a la entidad de usuario, 
// y viceversa, y también se encarga de manejar los errores que puedan surgir en el proceso de acceso 
// a datos de autenticación. De esta manera, el repositorio permite una mayor flexibilidad y escalabilidad 
// en la aplicación, ya que podemos cambiar la implementación del datasource sin afectar el resto de la aplicación.


export class AuthRepositoryImpl implements AuthRepository {

    // Aqui es donde se definen las reglas de como luce el datasource, es decir, como se va a 
    // comunicar con la base de datos, como se van a mapear los datos, etc.

    constructor(
        private readonly authDataSource: AuthDataSource
    ) {
        // Aquí se pueden inicializar las conexiones a la base de datos, etc.
    }


    login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        return this.authDataSource.login(loginUserDto);
    }

    register( registerUserDto: RegisterUserDto ) : Promise<UserEntity> {

        // Aquí se puede agregar la lógica de registro de usuario utilizando el datasource de autenticación, por ejemplo:
        return this.authDataSource.register(registerUserDto);
    }

}