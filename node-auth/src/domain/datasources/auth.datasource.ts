

// El datasource de autenticación es una clase abstracta que define los métodos que deben ser implementados por 
// cualquier fuente de datos de autenticación, como una base de datos, un servicio externo, etc. Esta clase se 
// utiliza para definir la interfaz que debe seguir cualquier implementación de la fuente de datos de autenticación, 
// lo que permite una mayor flexibilidad y escalabilidad en la aplicación.

import type { UserEntity } from "../entities/user.entity.js";

import type { RegisterUserDto, LoginUserDto } from "../index.js";


//  es abstracto porque no se puede instanciar directamente, sino que debe ser extendido por una clase concreta que 
// implemente los métodos definidos en esta clase abstracta. De esta manera, se puede garantizar que cualquier 
// implementación de la fuente de datos de autenticación siga la misma interfaz y tenga los mismos métodos disponibles 
// para ser utilizados por el controlador y el servicio correspondiente.


//! Datasources son las reglas de negocio la cual vamos a regir la obtención de datos, es decir, 
//! la lógica para obtener los datos de la base de datos, de un servicio externo, etc.
//! En este caso, el datasource de autenticación define los métodos para registrar un nuevo usuario, 
//! iniciar sesión, cerrar sesión, etc. Estos métodos son abstractos porque no se implementan en esta clase, 
//! sino que deben ser implementados por una clase concreta que extienda esta clase abstracta. De esta manera, 
//! se puede garantizar que cualquier implementación de la fuente de datos de autenticación siga la misma interfaz 
//! y tenga los mismos métodos disponibles para ser utilizados por el controlador y el servicio correspondiente.


//! Ojo Las clases abstractas no se pueden instanciar solo se pueden extender o implementar por otras clases, 
//! y las clases concretas son las que implementan los métodos definidos en la clase abstracta, y son las que 
//! se pueden instanciar para ser utilizadas por el controlador y el servicio correspondiente.
//! Para lo unico que servirian en este caso es para definir reglas de negocio, es decir, la lógica para 
//! obtener los datos de la base de datos, de un servicio externo, etc.
export abstract class AuthDataSource {
    // Aquí se pueden agregar los métodos abstractos para la fuente de datos de autenticación, como register, login, logout, etc.

    // TODO:
    abstract login( loginUserDto: LoginUserDto ) : Promise<UserEntity>;


    abstract register( registerUserDto: RegisterUserDto ) : Promise<UserEntity>;
    
   

}