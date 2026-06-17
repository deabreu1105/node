import { CustomError, UserEntity } from "../../domain/index.js";



export class UserMapper {

    // Aquí se pueden agregar los métodos para mapear los datos entre la entidad de usuario y el modelo de usuario de MongoDB, 
    // como mapToEntity, mapToModel, etc.

    constructor() {
        // Aquí se puede inicializar cualquier configuración necesaria para el mapeo de datos, por ejemplo:
        // this.someConfig = someValue;
    }


    static userEntityFromObject( object: { [key: string]: any } ): any {

        const { id, _id, name, email, password, roles } = object;

        if( !_id || !id ){
            throw CustomError.badRequest('Missingv id');
        }


        if( !name ) throw CustomError.badRequest('Missing name');
        if( !email ) throw CustomError.badRequest('Missing email');
        if( !password ) throw CustomError.badRequest('Missing password');
        if( !roles ) throw CustomError.badRequest('Missing roles');


        return new UserEntity(
            _id || id,
            name,
            email,
            password,
            roles,
        );
    }


}