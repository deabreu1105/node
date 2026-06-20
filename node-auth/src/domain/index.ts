
// El index.ts es un archivo de barril que se encarga de exportar toda la lógica de dominio de la aplicación, 
// en este caso, los DTOs (Data Transfer Objects) y las entidades relacionadas con la autenticación de usuarios. 
// Este archivo permite que otras partes de la aplicación puedan importar fácilmente estas clases sin tener 
// que especificar la ruta completa de cada una.


// exportamos el datasource de autenticación para que pueda ser utilizado en la infrastructura y implementado 
// por la clase concreta que se encargue de manejar la lógica de acceso a datos de autenticación, 
// como una base de datos, un servicio externo, etc.
export * from './datasources/auth.datasource.js';

// exportamos el repositorio de autenticación para que pueda ser utilizado en el servicio correspondiente,
// y se encargue de manejar la lógica de acceso a datos de autenticación, como una base de datos, un servicio externo, etc.
export * from './repositories/auth.repository.js';

// exportamos el DTO de registro de usuario para que pueda ser utilizado en el controlador y el servicio correspondiente
export * from './dtos/auth/register-user.dto.js';

// exportamos el DTO de inicio de sesión de usuario para que pueda ser utilizado en el controlador y el servicio correspondiente
export * from './dtos/auth/login-user.dto.js';

// exportamos la entidad de usuario para que pueda ser utilizada en el servicio y el repositorio correspondiente
export * from './entities/user.entity.js';

// exportamos los errores personalizados para que puedan ser utilizados en el controlador y el servicio correspondiente
export * from './errors/custom.error.js';


// exportamos los casos de uso relacionados con la autenticación de usuarios para que puedan ser utilizados en el controlador y el servicio correspondiente
export * from './use-cases/auth/register-user.use-case.js';

// exportamos el caso de uso de inicio de sesión de usuario para que pueda ser utilizado en el controlador y el servicio correspondiente
export * from './use-cases/auth/login-user.use-case.js';
