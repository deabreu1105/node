import { envs } from "./config/envs.js";
import { MongoDatabase } from "./data/mongodb/index.js";
import { AppRoutes } from "./presentation/routes.js";
import { Server } from "./presentation/server.js";


// IIFE: punto de entrada de la aplicación.
// Se usa una función autoejecutable para poder usar async/await en el nivel raíz.
( async () => {
  main();
})();


async function main() {

    // 1. Conectar a la base de datos antes de levantar el servidor.
    //    Si la conexión falla, lanza un error y el proceso termina.
    await MongoDatabase.connect({
      mongoUrl: envs.MONGO_URL,
      dbName: envs.MONGO_DB_NAME,
    });

    // 2. Iniciar el servidor HTTP con el puerto y las rutas configuradas.
    new Server({
      port: envs.PORT,
      routes: AppRoutes.routes,
    }).start();
}

