import { BcryptAdapter } from "../../config/bcrypt.adapter.js";
import { UserModel } from "../../data/mongodb/index.js";
import { CustomError, type AuthDataSource, type RegisterUserDto,  UserEntity } from "../../domain/index.js";
import { UserMapper } from "../index.js";


// type hashPasswordFunction = (password: string) => string; es un tipo de función que toma una contraseña 
// como argumento y devuelve un string, que sería el hash de la contraseña. Este tipo se utiliza para definir 
// la firma de la función hashPassword en la clase MongoDBAuthDataSourceImpl, lo que permite inyectar diferentes 
// implementaciones de hashing de contraseñas si es necesario, por ejemplo, utilizando bcrypt u otro algoritmo de hashing.
type HashPasswordFunction = (password: string) => string;
type ComparePasswordFunction = (password: string, hashedPassword: string) => boolean;


export class MongoDBAuthDataSourceImpl implements AuthDataSource {

    // Aquí se pueden agregar los métodos para manejar la lógica de acceso a datos de autenticación utilizando MongoDB, 
    // como register, login, logout, etc.

    // En el constructor, se pueden inyectar las dependencias necesarias para manejar la lógica de acceso a datos de 
    // autenticación utilizando MongoDB, como el adaptador de bcrypt para manejar el hashing de contraseñas, etc.
    constructor(
        private readonly hashPassword: HashPasswordFunction = BcryptAdapter.hashPassword,
        private readonly comparePassword: ComparePasswordFunction = BcryptAdapter.comparePassword,
    ) {
        // Aquí se pueden inicializar las conexiones a la base de datos, etc.
    }

    async register( registerUserDto: RegisterUserDto ) : Promise<UserEntity> {

        const { name, email, password } = registerUserDto;

        try {
            // lógica de registro de usuario utilizando MongoDB
            // 1 validar si el email ya existe en la base de datos, si existe, devolver un error correspondiente
            const existingUser = await UserModel.findOne({ email: email });

            // si el usuario ya existe, se lanza un error de tipo CustomError con un mensaje específico
            if ( existingUser ) throw CustomError.badRequest('Email already exists');
            
            // Se crea una nueva instancia del modelo de usuario utilizando el esquema definido en user.model.ts,
            const newUser = new UserModel({
                name,
                email,
                password: this.hashPassword(password),  // 2 Hacer un hash de la contraseña antes de guardarla en la base de datos
            });

            // 3 guardar el nuevo usuario en la base de datos utilizando el modelo de usuario y devolver la entidad de usuario creada
            await newUser.save();

            // 4 Mapear nuestra respuesta a la entidad de usuario para devolverla al servicio de autenticación
            return UserMapper.userEntityFromObject(newUser); ;

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