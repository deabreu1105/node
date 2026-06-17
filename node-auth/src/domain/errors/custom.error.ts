

// exportamos el error personalizado para que pueda ser utilizado en el controlador y el servicio correspondiente
//! extends Error quiere decir que extiende de la clase Error de Javascript: throw new Error(), lo que nos permite
//! crear un error personalizado con un mensaje y un código de estado HTTP, que se puede utilizar para manejar 
//! los errores de manera más efectiva en el controlador y el servicio correspondiente. Además, al extender de la 
//! clase Error, también podemos aprovechar las funcionalidades de manejo de errores que ofrece JavaScript, como la
//! pila de llamadas (stack trace) y la capacidad de lanzar y capturar errores utilizando try-catch.
export class CustomError extends Error {

    // Aquí se pueden agregar las propiedades y métodos del error personalizado, como statusCode,
    //  message, etc.
    constructor( 
        public readonly statusCode: number,
        public readonly message: string,

    ) { 
        // el super(message) es para llamar al constructor de la clase Error y pasarle el mensaje del error personalizado, 
        // lo que nos permite tener el mensaje del error personalizado en la pila de llamadas (stack trace) y en la 
        // propiedad message del error personalizado.
        super(message);
    }


    static badRequest( message: string ) {
        return new CustomError(400, message);
    }

    static unauthorized( message: string ) {
        return new CustomError(401, message);
    }

    static notFound( message: string ) {
        return new CustomError(404, message);
    }

    static internalServerError( message: string = 'Internal Server Error' ) {
        console.error(message);
        return new CustomError(500, message);
    }

    static forbidden( message: string ) {
        return new CustomError(403, message);
    }

}