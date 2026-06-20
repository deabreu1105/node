import { JwtAdapter } from "../../../config/index.js";
import type { LoginUserDto as LoginUserDto } from "../../dtos/auth/login-user.dto.js";
import { CustomError } from "../../index.js";
import type { AuthRepository } from "../../repositories/auth.repository.js";



interface UserToken {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}

// el caso de uso de inicio de sesión de usuario es una clase que se encarga de manejar la lógica de negocio relacionada con el inicio de sesión de un usuario, como validar los datos de entrada, interactuar con el repositorio para autenticar al usuario en la base de datos, generar un token JWT para el usuario autenticado, etc. Este caso de uso se puede utilizar en el controlador correspondiente para manejar las solicitudes de inicio de sesión de usuario, y se puede inyectar cualquier dependencia necesaria para su funcionamiento, como el repositorio de autenticación, el adaptador de JWT, etc.
type SingToken = ( payload: Object, duration?: string ) => Promise<string | null>;


interface LoginUserUseCase {
    execute( loginUserDto: LoginUserDto ): Promise<UserToken>;
}



export class LoginUser implements LoginUserUseCase {

    constructor(
        // Aquí se pueden inyectar las dependencias necesarias para el caso de uso, como servicios, repositorios, etc.
        private readonly authRepository: AuthRepository,
        private readonly signToken: SingToken = JwtAdapter.generateToken,
    ) { }

    async execute( loginUserDto: LoginUserDto ): Promise<UserToken> {
        
        // Crear usuario
        const user = await this.authRepository.login( loginUserDto );

        // Aquí se puede manejar la lógica de generación de token JWT para el usuario registrado, etc.
        const token = await this.signToken({ id: user.id }, '2h' );

        if ( !token ) throw CustomError.internalServerError( 'Error generating token' );
        
        return { 
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        };
    }
}