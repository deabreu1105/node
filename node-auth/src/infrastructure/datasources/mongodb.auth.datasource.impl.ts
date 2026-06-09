 import { CustomError, type AuthDataSource, type RegisterUserDto,  UserEntity } from "../../domain/index.js";



export class MongoDBAuthDataSource implements AuthDataSource {

    // Aquí se pueden agregar los métodos para manejar la lógica de acceso a datos de autenticación utilizando MongoDB, 
    // como register, login, logout, etc.

    constructor() {
        // Aquí se pueden inicializar las conexiones a la base de datos, etc.
    }

    async register( registerUserDto: RegisterUserDto ) : Promise<UserEntity> {

        const { name, email, password } = registerUserDto;

        try {
            // lógica de registro de usuario utilizando MongoDB
            // 1 validar si el email ya existe en la base de datos, si existe, devolver un error correspondiente
            if ( email === 'daniel@example.com' ) {
                throw CustomError.badRequest('Email already exists');
            }

            // 2 Hacer un hash de la contraseña antes de guardarla en la base de datos

            // 3 Mapear nuestra respuesta a la entidad de usuario

            // aquí se puede simular la lógica de registro de usuario utilizando MongoDB, por ejemplo:
            return new UserEntity(
                '1',
                name,
                email,
                password,
                ['ADMIN_ROLE'],
            );
        } catch (error) {
            // aquí se puede manejar el error de registro de usuario, por ejemplo, si el email ya existe en la base de datos, etc.
            if ( error instanceof CustomError ) {
                throw error;
            }

            // si el error no es una instancia de CustomError, se puede devolver un error genérico de servidor, por ejemplo:
            // aquí se puede devolver un error genérico de servidor, por ejemplo:
            throw CustomError.internalServerError();
        } 

    }

}