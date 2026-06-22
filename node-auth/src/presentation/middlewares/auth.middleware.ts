import type { Request, Response, NextFunction } from "express";
import { JwtAdapter } from "../../config/jwt.adapter.js";
import { UserModel } from "../../data/mongodb/index.js";


// CAPA: Presentation | TIPO: Middleware
//
// Protege rutas verificando el token JWT del header Authorization.
// Si el token es válido, adjunta el usuario al req.body.user para
// que el controlador lo tenga disponible sin volver a consultar la BD.
//
// Flujo:
//   Request → [validateJWT] → válido → next() → Controller
//                           → inválido → 401 Unauthorized
export class AuthMiddleware {

    static validateJWT = async( req: Request, res: Response, next: NextFunction ) => {

        const authorization = req.header( 'Authorization' );

        // El header debe existir y tener formato: "Bearer <token>"
        if ( !authorization ) return res.status( 401 ).json( { message: 'No token provided' } );
        if ( !authorization.startsWith('Bearer ') ) return res.status(401).json({ message: 'Invalid Bearer token' });

        const token = authorization.split(' ').at(1) || '';

        try {
            if ( !req.body ) req.body = {};

            // Verificar firma y expiración del token
            const payload = await JwtAdapter.verifyToken<{ id: string }>(token);
            if ( !payload ) return res.status(401).json({ message: 'Invalid token' });

            // Verificar que el usuario del token aún exista en la BD
            const user = await UserModel.findById(payload.id);
            if ( !user ) return res.status(401).json({ message: 'User not found' });

            // Inyectar el usuario en el request para que el controlador lo use
            req.body.user = user;

            next();

        } catch ( error ) {
            console.error( 'Error validating token', error );
            return res.status( 500 ).json( { message: 'Internal server error' } );
        }
    }

}