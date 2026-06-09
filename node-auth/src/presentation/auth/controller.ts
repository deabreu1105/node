
import type { Request, Response } from "express";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto.js";

export class AuthController {

  // Aquí se pueden agregar los métodos del controlador para manejar las solicitudes 
  // de autenticación, como login, register, etc.
  
  // aqui si se aplica la inyección de dependencias, se pueden inyectar servicios, repositorios, etc. 
  // necesarios para el controlador
  constructor() {
    // Aquí se pueden inyectar las dependencias necesarias para el controlador, como servicios, repositorios, etc.
  }


  registerUser = ( req: Request, res: Response ) => {
    // lógica de registro de usuario

    // validamos los datos de registro utilizando el DTO de registro de usuario, y si hay algún error, 
    // devolvemos una respuesta con el error correspondiente
    const [ errorDto, registerUserDto ] = RegisterUserDto.create(req.body);

    // si hay un error en los datos de registro, devolvemos una respuesta con el error correspondiente
    if ( errorDto ) return res.status(400).json({ error: errorDto });

    // aquí se puede llamar al servicio de registro de usuario para registrar al nuevo usuario en la base de datos, por ejemplo:
    // const user = this.authService.registerUser(registerUserDto);

    // aquí se puede devolver una respuesta con el usuario registrado, por ejemplo:
    res.json( { message: 'User registered successfully', user: registerUserDto } );
  
}

  loginUser = ( req: Request, res: Response ) => {
    // lógica de inicio de sesión de usuario
    res.json({ message: 'Login successful' });
  }

}