

// Este es un archivo de barril que se encarga de exportar toda la lógica de infraestructura de la aplicación,
// en este caso, los repositorios y los datasources relacionados con la autenticación de usuarios. 
// Este archivo permite que otras partes de la aplicación puedan importar fácilmente estas clases sin tener 
// que especificar la ruta completa de cada una.



// exportamos la implementación del repositorio de autenticación para que pueda ser utilizado en el servicio correspondiente,
// y se encargue de manejar la lógica de acceso a datos de autenticación, como una base de datos, un servicio externo, etc.
export * from './repositories/auth.repository.impl.js';

// exportamos la implementación del datasource de autenticación para que pueda ser utilizado 
// en el repositorio correspondiente, y se encargue de manejar la lógica de acceso a 
// datos de autenticación, como una base de datos, un servicio externo, etc.
export * from './datasources/mongodb.auth.datasource.impl.js';


// exportamos el mapeador de usuario para que pueda ser utilizado en el datasource correspondiente,
// y se encargue de mapear los datos de usuario entre la base de datos y la entidad de usuario utilizada en el dominio.
export * from './mappers/user.mappert.js';