import { Router } from "express";
import { AuthRoutes } from "./auth/routes.js";


export class AppRoutes {

 static get routes(): Router {

    const router = Router();

   //Se definen todas las rutas principales
    router.use('/api/auth', AuthRoutes.routes);

    return router;
    
  }
}