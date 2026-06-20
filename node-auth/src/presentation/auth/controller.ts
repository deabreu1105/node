
import type { Request, Response } from "express";
import { AuthRepository, CustomError, LoginUser, LoginUserDto, RegisterUser, RegisterUserDto } from "../../domain/index.js";
import { JwtAdapter } from "../../config/index.js";
import { UserModel } from "../../data/mongodb/index.js";

export class AuthController {

  // Aquí se pueden agregar los métodos del controlador para manejar las solicitudes 
  // de autenticación, como login, register, etc.
  
  // aqui si se aplica la inyección de dependencias, se pueden inyectar servicios, repositorios, etc. 
  // necesarios para el controlador
  constructor(
    private readonly authRepository: AuthRepository,
  ) {
    // Aquí se pueden inyectar las dependencias necesarias para el controlador, como servicios, repositorios, etc.
  }


  // Este handleError es un método privado que se encarga de manejar los errores que puedan ocurrir en los métodos del controlador, 
  // y devuelve una respuesta con el error correspondiente. Este método se puede utilizar en los métodos del controlador 
  // para manejar los errores de manera consistente y centralizada.
  private handleError( error: unknown, res: Response ) {
    if ( error instanceof CustomError ) {
      return res.status( error.statusCode ).json({ error: error.message });
    }
    console.error( error );
    res.status( 500 ).json( { error: 'Internal server error' } );
  }


  registerUser = async( req: Request, res: Response ) => {
    // lógica de registro de usuario


    // validamos los datos de registro utilizando el DTO de registro de usuario, y si hay algún error, 
    // devolvemos una respuesta con el error correspondiente
    const [ errorDto, registerUserDto ] = RegisterUserDto.create(req.body);

    // si hay un error en los datos de registro, devolvemos una respuesta con el error correspondiente
    if ( errorDto ) return res.status( 400 ).json({ error: errorDto });

    // aquí se puede manejar la lógica de registro de usuario utilizando el caso de uso correspondiente,
    // y si hay algún error, devolvemos una respuesta con el error correspondiente
    new RegisterUser( this.authRepository )
      .execute( registerUserDto! )
      .then( data => res.json( data ) )
      .catch( error => this.handleError( error, res ) );
  }


  getUsers = ( req: Request, res: Response ) => {
    // lógica para obtener los datos del usuario autenticado
    UserModel.find()
      .then( users => res.json( { users, user: req.body.user } ) )
      .catch( error => this.handleError( error, res ) );
  }



  loginUser = ( req: Request, res: Response ) => {
    // validamos los datos de inicio de sesión utilizando el DTO de inicio de sesión de usuario, y si hay algún error, 
    // devolvemos una respuesta con el error correspondiente
    const [ errorDto, loginUserDto ] = LoginUserDto.login(req.body);

    // si hay un error en los datos de inicio de sesión, devolvemos una respuesta con el error correspondiente
    if ( errorDto ) return res.status( 400 ).json({ error: errorDto });

    // aquí se puede manejar la lógica de inicio de sesión de usuario utilizando el caso de uso correspondiente,
    // y si hay algún error, devolvemos una respuesta con el error correspondiente
    new LoginUser( this.authRepository )
      .execute( loginUserDto! )
      .then( data => res.json( data ) )
      .catch( error => this.handleError( error, res ) );
  }



}