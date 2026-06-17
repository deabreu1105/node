import { Router } from "express";
import { AuthController } from "./controller.js";
import { AuthRepositoryImpl, MongoDBAuthDataSourceImpl } from "../../infrastructure/index.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";


export class AuthRoutes {

 static get routes(): Router {

    const router = Router();

    // aquí se pueden crear las instancias de las clases concretas que implementen los repositorios y datasources de autenticación, por ejemplo, AuthRepositoryImpl y MongoDBAuthDataSourceImpl, que son clases concretas que implementan los métodos definidos en las clases abstractas AuthRepository y AuthDataSource, respectivamente. Estas instancias se pueden inyectar en el controlador para que pueda utilizar los métodos definidos en el repositorio y el datasource para manejar las solicitudes de autenticación.
    const datasource = new MongoDBAuthDataSourceImpl();

    //! Ojo, el repositorio se encarga de definir la interfaz para la fuente de datos de autenticación, mientras que el datasource se encarga de implementar esa interfaz y proporcionar la lógica para interactuar con la base de datos o cualquier otra fuente de datos que se utilice para la autenticación. De esta manera, el controlador puede utilizar el repositorio para manejar las solicitudes de autenticación sin tener que preocuparse por la implementación específica del datasource, lo que permite una mayor flexibilidad y escalabilidad en la aplicación.
    const authRepository = new AuthRepositoryImpl( datasource ); // Aquí se puede crear una instancia de la clase concreta que implemente el repositorio de autenticación, por ejemplo, AuthRepositoryImpl, que es una clase concreta que implementa los métodos definidos en la clase abstracta AuthRepository.

    // aquí se puede crear una instancia del controlador de autenticación, inyectando el repositorio de autenticación para que pueda utilizar los métodos definidos en el repositorio para manejar las solicitudes de autenticación.
    const controller = new AuthController( authRepository );

    

    // aquí se pueden agregar las rutas de la aplicación utilizando router.get(), router.post(), etc.
    router.post('/login', controller.loginUser);
    router.post('/register', controller.registerUser);

    router.get('/users', [AuthMiddleware.validateJWT], controller.getUsers);


    return router;
    
  }
}