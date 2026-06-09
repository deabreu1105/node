

// exportamos el error personalizado para que pueda ser utilizado en el controlador y el servicio correspondiente
export class CustomError extends Error {

    constructor( 
        public readonly statusCode: number,
        public readonly message: string,

    ) { 
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