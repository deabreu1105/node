import { JwtAdapter } from "../../../config/index.js";
import type { RegisterUserDto } from "../../dtos/auth/register-user.dto.js";
import { CustomError } from "../../index.js";
import type { AuthRepository } from "../../repositories/auth.repository.js";
import type { UserToken } from "../../interfaces/user-token.interface.js";


// CAPA: Domain | TIPO: UseCase
//
// Orquesta el registro de un nuevo usuario.
// Solo conoce abstracciones (AuthRepository), nunca implementaciones concretas.
//
// signToken se inyecta como función, no como clase, lo que facilita el testing:
// se puede pasar un mock sin tocar JwtAdapter.
type SignToken = ( payload: object, duration?: string ) => Promise<string | null>;


interface RegisterUserUseCase {
    execute( registerUserDto: RegisterUserDto ): Promise<UserToken>;
}



export class RegisterUser implements RegisterUserUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken,
    ) { }

    async execute( registerUserDto: RegisterUserDto ): Promise<UserToken> {

        // 1. Delegar la creación del usuario al repositorio (que llama al datasource)
        const user = await this.authRepository.register( registerUserDto );

        // 2. Generar el token JWT con el id del usuario recién creado
        const token = await this.signToken({ id: user.id }, '2h' );

        if ( !token ) throw CustomError.internalServerError( 'Error generating token' );

        return {
            token,
            user: { id: user.id, name: user.name, email: user.email },
        };
    }
}