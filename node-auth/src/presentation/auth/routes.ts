import { Router } from "express";
import { AuthController } from "./controller.js";
import { AuthRepositoryImpl, MongoDBAuthDataSourceImpl } from "../../infrastructure/index.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";


export class AuthRoutes {

  static get routes(): Router {

    const router = Router();

    // PUNTO DE COMPOSICIÓN: único lugar donde presentation conoce a infrastructure.
    // Se ensambla la cadena: DataSource → Repository → Controller.
    // El controlador solo recibe el contrato abstracto (AuthRepository),
    // no sabe nada de MongoDB ni de cómo se implementa.
    const datasource    = new MongoDBAuthDataSourceImpl();
    const authRepository = new AuthRepositoryImpl( datasource );
    const controller    = new AuthController( authRepository );

    router.post('/login',    controller.loginUser);
    router.post('/register', controller.registerUser);

    // AuthMiddleware.validateJWT protege la ruta: verifica el JWT antes de llegar al controlador.
    router.get('/users', [AuthMiddleware.validateJWT], controller.getUsers);

    return router;
  }
}