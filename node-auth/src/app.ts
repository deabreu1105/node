import { envs } from "./config/envs.js";
import { AppRoutes } from "./presentation/routes.js";
import { Server } from "./presentation/server.js";


// Esta es una función anonima autoejecutable, es decir, se ejecuta inmediatamente después de ser definida.
( () => {
  // Your code here
  main();
})();


async function main() {

    // TODO : await base de datos


    // TODO : inicio de servidor
    new Server({
      port: envs.PORT, // se pasa el puerto configurado en las variables de entorno al servidor
      routes: AppRoutes.routes, // se pasan las rutas principales de la aplicación al servidor
    }).start();
}

