import type { Request, Response, NextFunction } from "express";
import { JwtAdapter } from "../../config/jwt.adapter.js";
import { UserModel } from "../../data/mongodb/index.js";


export class AuthMiddleware {

    constructor() {
        // Aquí se puede inicializar cualquier configuración necesaria para el middleware de autenticación, por ejemplo:
        // this.someConfig = someValue;
    }

    static  validateJWT = async( req: Request, res: Response, next: NextFunction ) => {
        // lógica para validar el token JWT en las solicitudes entrantes
        // aquí se puede implementar la lógica para validar el token JWT en las solicitudes entrantes, por ejemplo:

        const authorization = req.header( 'Authorization' );

        if ( !authorization ) return res.status( 401 ).json( { message: 'No token provided' } );

        if ( !authorization.startsWith('Bearer ')) return res.status(401).json({ message: 'Invalid Bearer token' });

        const token = authorization.split(' ').at(1) || '';

        console.log('Token:', token);


        try {
            if ( !req.body ) req.body = {};

            const payload = await JwtAdapter.verifyToken<{ id: string }>(token);

            if ( !payload ) return res.status(401).json({ message: 'Invalid token' });

            const user = await UserModel.findById(payload.id);

            if ( !user ) return res.status(401).json({ message: 'User not found' });

            req.body.user = user;

            next();
        } catch ( error ) {
            console.error( 'Error validating token', error );
            return res.status( 500 ).json( { message: 'Internal server error' } );
        }


        /*JwtAdapter.verifyToken(token)
            .then( payload => {
                if ( !payload ) return res.status(401).json({ message: 'Invalid token' });

                req.body.payload = payload;
                next();
            })
            .catch( () => res.status(500).json({ message: 'Internal server error' }) );*/

        
    }

}