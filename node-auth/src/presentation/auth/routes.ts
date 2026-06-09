import { Router } from "express";
import { AuthController } from "./controller.js";


export class AuthRoutes {

 static get routes(): Router {

    const router = Router();
    const controller = new AuthController();

    

    // aquí se pueden agregar las rutas de la aplicación utilizando router.get(), router.post(), etc.
    router.post('/login', controller.loginUser);
    router.post('/register', controller.registerUser);

    return router;
    
  }
}