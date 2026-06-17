 import { compareSync, genSaltSync, hashSync } from 'bcryptjs';


 export class BcryptAdapter {


    // Aquí se pueden agregar los métodos para manejar el hashing de contraseñas utilizando bcrypt, 
    // como hashPassword, comparePassword, etc.

    constructor() {
        // Aquí se puede inicializar cualquier configuración necesaria para bcrypt, por ejemplo:
        // this.saltRounds = 10;
    }


    static hashPassword(password: string): string {
        // El saltSync es una función síncrona que genera un salt aleatorio con el número de rondas especificado, en este caso, 10.
        const salt = genSaltSync(10);
        // El hashSync es una función síncrona que toma la contraseña y el salt generado, y devuelve el hash de la contraseña.
        return hashSync(password, salt);
    }


    static comparePassword( password: string, hashedPassword: string ): boolean {
        // lógica para comparar la contraseña con su hash utilizando bcrypt
        return compareSync(password, hashedPassword); // aquí se puede implementar la lógica para comparar la contraseña con su hash utilizando bcrypt, por ejemplo:
        // return await bcrypt.compare(password, hashedPassword);
    }

 }