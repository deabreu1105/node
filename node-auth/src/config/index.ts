
// el index.ts es un archivo de barril que se encarga de exportar 
// toda la configuración de la aplicación, en este caso, las 
// variables de entorno cargadas desde el archivo .env a través 
// del adaptador envs.ts

// exportamos el adaptador de configuración envs.ts para que pueda 
// ser utilizado en toda la aplicación
export * from './envs.js';

// exportamos validador de datos para que pueda ser utilizado en toda la aplicación
export * from './validators.js';

// Expòrtamos el adaptador de bcrypt para que pueda ser utilizado en toda la aplicación
export * from './bcrypt.adapter.js';


// exportamos el adaptador de JWT para que pueda ser utilizado en toda la aplicación
export * from './jwt.adapter.js';