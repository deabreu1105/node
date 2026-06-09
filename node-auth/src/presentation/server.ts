
// importamos express para crear el servidor
import express, { Router } from 'express';
// importamos el tipo Express para tipar nuestra clase Server
import type { Express } from 'express';

// interface Options define la estructura del objeto de opciones que se le pasará al constructor 
// de la clase Server. En este caso, el objeto de opciones puede tener una propiedad port de 
// tipo number y una propiedad routes de tipo Router.
interface Options {
  port?: number;
  routes: Router;
}


export class Server {

  // declaramos una propiedad pública app de tipo Express, que es la instancia de nuestro servidor
  public readonly app: Express = express();  
  private readonly port: number;
  private readonly routes: Router;

  constructor( options: Options ) {

    const { port = 3100, routes } = options;

    this.port = port;
    this.routes = routes;

    // console.log('Server initialized');

  }

  async start() {

    // Middleware para parsear el cuerpo de las solicitudes como JSON
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

    // aquí se pueden agregar los middlewares necesarios para el servidor, como cors, helmet, etc.
    // aquí se pueden agregar las rutas de la aplicación utilizando this.app.use(), por ejemplo:
    this.app.use(this.routes);

    // iniciamos el servidor en el puerto especificado en las opciones, y mostramos un mensaje en la consola 
    // cuando el servidor esté listo para recibir solicitudes
    this.app.listen(this.port, () => {

      console.log(`Server is running on port ${this.port}`);

    });

  }

}