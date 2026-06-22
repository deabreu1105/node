import { JwtAdapter } from "../../../config/index.js";
import type { LoginUserDto } from "../../dtos/auth/login-user.dto.js";
import { CustomError } from "../../index.js";
import type { AuthRepository } from "../../repositories/auth.repository.js";
import type { UserToken } from "../../interfaces/user-token.interface.js";


// CAPA: Domain | TIPO: UseCase
//
// Orquesta el inicio de sesión de un usuario.
// Mismo patrón que RegisterUser: inyección de repositorio y función de firma.
type SignToken = ( payload: object, duration?: string ) => Promise<string | null>;


interface LoginUserUseCase {
    execute( loginUserDto: LoginUserDto ): Promise<UserToken>;
}



export class LoginUser implements LoginUserUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken,
    ) { }

    async execute( loginUserDto: LoginUserDto ): Promise<UserToken> {

        // 1. Verificar credenciales a través del repositorio
        const user = await this.authRepository.login( loginUserDto );

        // 2. Generar token JWT con el id del usuario autenticado
        const token = await this.signToken({ id: user.id }, '2h' );

        if ( !token ) throw CustomError.internalServerError( 'Error generating token' );

        return {
            token,
            user: { id: user.id, name: user.name, email: user.email },
        };
    }
}