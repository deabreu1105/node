
import jwt from 'jsonwebtoken';
import { envs } from './index.js';


const JWT_SEED = envs.JWT_SEED;


export class JwtAdapter {

    // Aquí se pueden agregar los métodos para manejar la generación y verificación de tokens JWT, 
    // como generateToken, verifyToken, etc.

    constructor() {
        // Aquí se puede inicializar cualquier configuración necesaria para el manejo de tokens JWT, por ejemplo:
        // this.secretKey = process.env.JWT_SECRET_KEY || 'default_secret_key';
    }

    static generateToken( payload: object, duration: string = '2h' ): Promise<string | null> {
        return  new Promise( ( resolve ) => {
            jwt.sign(payload, JWT_SEED, { expiresIn: duration as any }, (err, token) => {
                if (err) return resolve(null);
                resolve(token ?? null);
            });
        });
    }


    static verifyToken<T>( token: string ): Promise<T | null> {
        return new Promise( ( resolve ) => {
            jwt.verify( token, JWT_SEED, (err, decoded) => {
                if (err) return resolve(null);
                resolve(decoded as T);
            });
        });
    }



}